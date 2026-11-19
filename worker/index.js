/**
 * EagleWing Express — Cloudflare Worker entry.
 *
 * - www.eaglewingexpress.ca → 301 redirect to https://eaglewingexpress.ca
 *   (one canonical address is better for search engines)
 * - /api/quote → quote form handler
 * - everything else → the static site in /dist (Workers Static Assets)
 */
import { handleQuote, json } from './quote.js'

const PRIMARY_HOST = 'eaglewingexpress.ca'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === `www.${PRIMARY_HOST}`) {
      url.hostname = PRIMARY_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname === '/api/quote') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)
      return handleQuote(request, env)
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, 404)

    return env.ASSETS.fetch(request)
  },
}
