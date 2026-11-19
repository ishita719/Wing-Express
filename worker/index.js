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

    // Optional: once the custom domain is live, set REDIRECT_WORKERS_DEV=true to send workers.dev visitors to it.
    if (isWorkersDev && env.REDIRECT_WORKERS_DEV === 'true') {
      url.hostname = PRIMARY_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname === '/api/quote') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)
      return handleQuote(request, env)
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, 404)

    let res = await env.ASSETS.fetch(request)

    // Paths without a file extension that are not real pages get the SPA's 404 page, but with status 404.
    const path = url.pathname.replace(/\/+$/, '') || '/'
    const looksLikePage = !/\.[a-z0-9]+$/i.test(path)
    if (looksLikePage && !ROUTES.has(path) && path !== '/index.html') {
      res = new Response(res.body, { status: 404, headers: res.headers })
    }

    if (isWorkersDev) res = withHeaders(res, { 'X-Robots-Tag': 'noindex, nofollow' })
    return res
  },
}
