/**
 * Quote request handler — POST /api/quote (called from worker/index.js)
 *
 * Emails each quote request to the company inbox. Two ways to deliver, tried in order:
 *
 * 1. Cloudflare Email Routing (free, no extra account) — the default.
 *    wrangler.jsonc has a "send_email" binding named QUOTE_EMAIL whose destination is the
 *    company inbox. One-time setup in the Cloudflare dashboard:
 *      eaglewingexpress.ca → Email → Email Routing → enable (adds the DNS records),
 *      then Destination addresses → add the company inbox and click the link in the
 *      verification email Cloudflare sends to it.
 *    Messages are sent from QUOTE_FROM_EMAIL (an address on eaglewingexpress.ca).
 *
 * 2. Resend (https://resend.com) — used instead if RESEND_API_KEY is set.
 *
 * If neither is set up, this returns 503 and the site shows the visitor an
 * email / phone fallback instead of pretending the request was sent.
 */
import { EmailMessage } from 'cloudflare:email'

const REQUIRED = ['name', 'phone', 'email', 'from', 'to', 'cargo']
const LABELS = {
  name: 'Name', company: 'Company', phone: 'Phone', email: 'Email',
  from: 'Pickup from', to: 'Deliver to', service: 'Service', timing: 'Timing',
  address: 'City / address (not listed)', cargo: 'Freight', weight: 'Weight / pieces', tailgate: 'Tailgate needed', notes: 'Notes',
}

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

// Max length per field — anything longer is rejected (matches the form's maxLength).
const LIMITS = {
  name: 100, company: 120, phone: 30, email: 160, from: 80, to: 80, address: 200,
  service: 80, timing: 80, cargo: 200, weight: 100, notes: 2000,
}

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function handleQuote(request, env) {
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ ok: false, error: 'Invalid body' }, 400)

  // Honeypot: silently accept bot submissions without sending.
  if (data.website) return json({ ok: true })

  // Rate limit by visitor IP (needs the QUOTE_LIMITER binding in wrangler.jsonc; skipped if missing).
  if (env.QUOTE_LIMITER) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    try {
      const { success } = await env.QUOTE_LIMITER.limit({ key: ip })
      if (!success) return json({ ok: false, error: 'Too many requests — please call dispatch' }, 429)
    } catch {
      /* limiter unavailable — continue */
    }
  }

  // Keep only known fields, as trimmed strings, and enforce length caps.
  const clean = {}
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = data[k]
    if (v === undefined || v === null) continue
    if (typeof v !== 'string') return json({ ok: false, error: `Invalid ${k}` }, 422)
    const t = v.trim()
    if (t.length > max) return json({ ok: false, error: `${k} is too long` }, 422)
    if (t) clean[k] = t
  }
  if (data.tailgate === true) clean.tailgate = true
  data = clean

  const missing = REQUIRED.filter((k) => !String(data[k] ?? '').trim())
  if (missing.length) return json({ ok: false, error: `Missing: ${missing.join(', ')}` }, 422)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return json({ ok: false, error: 'Invalid email' }, 422)
  const digits = data.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15 || !/^[\d\s()+.\-x]+$/i.test(data.phone)) {
    return json({ ok: false, error: 'Invalid phone' }, 422)
  }

  const rows = Object.keys(LABELS)
    .filter((k) => data[k] !== undefined && data[k] !== '' && data[k] !== false)
    .map((k) => `<tr><td style="padding:6px 12px;color:#666">${LABELS[k]}</td><td style="padding:6px 12px"><b>${escape(data[k] === true ? 'Yes' : String(data[k]))}</b></td></tr>`)
    .join('')

  const subject = `New quote request — ${String(data.name).slice(0, 80)} (${data.from} → ${data.to})`
  const html = emailHtml(rows, data)
  const from = env.QUOTE_FROM_EMAIL || 'website@eaglewingexpress.ca'

  // 1. Cloudflare Email Routing
  if (env.QUOTE_EMAIL && env.QUOTE_TO_EMAIL) {
    try {
      const raw = mime({ from, to: env.QUOTE_TO_EMAIL, replyTo: data.email, replyName: data.name, subject, html })
      await env.QUOTE_EMAIL.send(new EmailMessage(from, env.QUOTE_TO_EMAIL, raw))
      return json({ ok: true })
    } catch (err) {
      console.error('Email Routing send failed:', err?.message || err)
      if (!env.RESEND_API_KEY) return json({ ok: false, error: 'Email delivery failed' }, 502)
    }
  }

  // 2. Resend
  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL) {
    return json({ ok: false, error: 'Email delivery is not configured' }, 503)
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `EagleWing Express Website <${from}>`,
      to: [env.QUOTE_TO_EMAIL],
      reply_to: data.email,
      subject,
      html,
    }),
  })

  if (!res.ok) return json({ ok: false, error: 'Email provider error' }, 502)
  return json({ ok: true })
}


/** The email body: a tidy table of the request, with one-tap reply / call links. */
function emailHtml(rows, data) {
  const tel = String(data.phone).replace(/[^\d+]/g, '')
  return `<div style="font-family:Arial,sans-serif;color:#1b1f27;max-width:620px">
<h2 style="margin:0 0 4px">New quote request</h2>
<p style="margin:0 0 16px;color:#666">Sent from the quote form on eaglewingexpress.ca</p>
<table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
<p style="margin:20px 0 0">
<a href="mailto:${escape(data.email)}" style="background:#d7263d;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:bold">Reply to ${escape(data.name)}</a>
&nbsp; <a href="tel:${escape(tel)}" style="color:#d7263d;font-weight:bold">Call ${escape(data.phone)}</a>
</p></div>`
}

/** Minimal MIME message for Email Routing (UTF-8 subject and HTML body, base64-encoded). */
function mime({ from, to, replyTo, replyName, subject, html }) {
  const b64 = (str) => {
    const bytes = new TextEncoder().encode(str)
    let bin = ''
    for (const b of bytes) bin += String.fromCharCode(b)
    return btoa(bin)
  }
  const noBreaks = (v) => String(v).replace(/[\r\n]+/g, ' ')
  const body = b64(html).replace(/.{1,76}/g, '$&\r\n')
  return [
    `From: "EagleWing Express Website" <${from}>`,
    `To: <${to}>`,
    `Reply-To: =?UTF-8?B?${b64(noBreaks(replyName))}?= <${noBreaks(replyTo)}>`,
    `Subject: =?UTF-8?B?${b64(noBreaks(subject))}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@eaglewingexpress.ca>`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n')
}
