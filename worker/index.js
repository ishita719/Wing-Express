/**
 * Wing Express — Cloudflare Worker entry.
 * Static files (the React build in /dist) are served by Workers Static Assets.
 * Only /api/* requests reach this code (see "run_worker_first" in wrangler.jsonc).
 */
import { handleQuote, json } from './quote.js'

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/quote') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)
      return handleQuote(request, env)
    }

    if (pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, 404)

    return env.ASSETS.fetch(request)
  },
}
