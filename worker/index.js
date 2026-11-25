/**
 * EagleWing Express — Cloudflare Worker entry.
 *
 * - www.eaglewingexpress.ca → 301 redirect to https://eaglewingexpress.ca
 * - /api/quote → quote form handler (validated + rate limited)
 * - known pages → the static site in /dist (Workers Static Assets)
 * - unknown pages → the site's 404 page with a real 404 status
 * - *.workers.dev → X-Robots-Tag: noindex so only the real domain is indexed
 */
import { handleQuote, json } from './quote.js'

const PRIMARY_HOST = 'eaglewingexpress.ca'
const ROUTES = new Set(['/', '/about', '/services', '/how-it-works', '/coverage', '/faq', '/contact', '/terms', '/privacy'])

function withHeaders(res, extra) {
  const out = new Response(res.body, res)
  for (const [k, v] of Object.entries(extra)) out.headers.set(k, v)
  return out
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const isWorkersDev = url.hostname.endsWith('.workers.dev')

    if (url.hostname === `www.${PRIMARY_HOST}`) {
      url.hostname = PRIMARY_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    // The custom domain is live: send visitors of the production workers.dev address there
    // (one address for search engines). Preview URLs (<id>-wing-express.…) are left alone.
    if (isWorkersDev && url.hostname.startsWith('wing-express.') && env.REDIRECT_WORKERS_DEV === 'true') {
      url.hostname = PRIMARY_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname === '/api/quote') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)
      return handleQuote(request, env)
    }

    // Public settings for the quote form: the Turnstile site key (empty until the
    // TURNSTILE_SITE_KEY secret is set; then the form shows the bot check).
    if (url.pathname === '/api/config') {
      // Only offer the widget when the server can also verify it (both keys set).
      const key = env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET ? env.TURNSTILE_SITE_KEY : ''
      return new Response(JSON.stringify({ turnstileSiteKey: key }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      })
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, 404)

    // Paths without a file extension that are not real pages get the 404 page (noindex) with status 404.
    const path = url.pathname.replace(/\/+$/, '') || '/'
    const looksLikePage = !/\.[a-z0-9]+$/i.test(path)
    let res
    if (looksLikePage && !ROUTES.has(path) && path !== '/index.html') {
      const notFound = await env.ASSETS.fetch(new Request(new URL('/404', url), request))
      res = new Response(notFound.body, { status: 404, headers: notFound.headers })
    } else {
      res = await env.ASSETS.fetch(request)
    }

    if (isWorkersDev) res = withHeaders(res, { 'X-Robots-Tag': 'noindex, nofollow' })
    return res
  },
}
