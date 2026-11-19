/**
 * Quote request handler — POST /api/quote (called from worker/index.js)
 *
 * Emails quote requests to dispatch using Resend (https://resend.com).
 * Set these in Cloudflare → Workers & Pages → wing-express → Settings → Variables and Secrets:
 *   RESEND_API_KEY   (secret)  your Resend API key
 *   QUOTE_TO_EMAIL             where requests are delivered, e.g. dispatch@wingexpress.ca
 *   QUOTE_FROM_EMAIL           a sender on a domain verified in Resend, e.g. website@wingexpress.ca
 *
 * Until they are set, this returns 503 and the site shows the visitor an
 * email / phone fallback instead of pretending the request was sent.
 */
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

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !env.QUOTE_FROM_EMAIL) {
    return json({ ok: false, error: 'Email delivery is not configured' }, 503)
  }

  const rows = Object.keys(LABELS)
    .filter((k) => data[k] !== undefined && data[k] !== '' && data[k] !== false)
    .map((k) => `<tr><td style="padding:6px 12px;color:#666">${LABELS[k]}</td><td style="padding:6px 12px"><b>${escape(data[k] === true ? 'Yes' : String(data[k]))}</b></td></tr>`)
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `EagleWing Express Website <${env.QUOTE_FROM_EMAIL}>`,
      to: [env.QUOTE_TO_EMAIL],
      reply_to: data.email,
      subject: `New quote request — ${String(data.name).slice(0, 80)} (${data.from} → ${data.to})`,
      html: `<h2>New quote request</h2><table>${rows}</table>`,
    }),
  })

  if (!res.ok) return json({ ok: false, error: 'Email provider error' }, 502)
  return json({ ok: true })
}

