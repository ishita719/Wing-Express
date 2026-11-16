/**
 * Cloudflare Pages Function — POST /api/quote
 *
 * Emails quote requests to dispatch using Resend (https://resend.com).
 * Set these in Cloudflare → Pages project → Settings → Variables and Secrets:
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
  cargo: 'Freight', weight: 'Weight / pieces', tailgate: 'Tailgate needed', notes: 'Notes',
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function onRequestPost({ request, env }) {
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400)
  }

  // Honeypot: silently accept bot submissions without sending.
  if (data.website) return json({ ok: true })

  const missing = REQUIRED.filter((k) => !String(data[k] ?? '').trim())
  if (missing.length) return json({ ok: false, error: `Missing: ${missing.join(', ')}` }, 422)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ ok: false, error: 'Invalid email' }, 422)

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !env.QUOTE_FROM_EMAIL) {
    return json({ ok: false, error: 'Email delivery is not configured' }, 503)
  }

  const rows = Object.keys(LABELS)
    .filter((k) => data[k] !== undefined && data[k] !== '' && data[k] !== false)
    .map((k) => `<tr><td style="padding:6px 12px;color:#666">${LABELS[k]}</td><td style="padding:6px 12px"><b>${escape(data[k] === true ? 'Yes' : String(data[k]).slice(0, 2000))}</b></td></tr>`)
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Wing Express Website <${env.QUOTE_FROM_EMAIL}>`,
      to: [env.QUOTE_TO_EMAIL],
      reply_to: data.email,
      subject: `New quote request — ${String(data.name).slice(0, 80)} (${data.from} → ${data.to})`,
      html: `<h2>New quote request</h2><table>${rows}</table>`,
    }),
  })

  if (!res.ok) return json({ ok: false, error: 'Email provider error' }, 502)
  return json({ ok: true })
}

export const onRequest = () => json({ ok: false, error: 'Method not allowed' }, 405)
