/**
 * Post-build SEO step (runs after `vite build`).
 *
 * The site is a single-page app, so every URL would otherwise share the same
 * <head>. Link previews (WhatsApp, Facebook, LinkedIn, iMessage) and some
 * crawlers don't run JavaScript, so this writes one HTML file per page with
 * its own title, description, canonical URL, Open Graph/Twitter tags and
 * structured data — e.g. dist/about.html is served for /about.
 *
 * Each page's body is pre-rendered from the React app (dist-ssr/entry-server.js,
 * built by `vite build --ssr`), so crawlers that don't run JavaScript still see
 * the full page text. The browser app then takes over as normal.
 *
 * It also writes dist/404.html (noindex), dist/sitemap.xml with today's date
 * as <lastmod>, and dist/robots.txt.
 */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pages, SITE_NAME, notFoundMeta } from '../src/data/seo.js'
import { faqs, services } from '../src/data/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

function siteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL
  const env = join(root, '.env.production')
  if (existsSync(env)) {
    const m = readFileSync(env, 'utf8').match(/^VITE_SITE_URL=(.+)$/m)
    if (m) return m[1].trim()
  }
  throw new Error('VITE_SITE_URL is not set')
}
const SITE = siteUrl().replace(/\/$/, '')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace the content="" of a <meta> identified by name/property. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found in index.html`)
  return html.replace(re, `$1${esc(value)}$2`)
}

const jsonLd = (obj) => `    <script type="application/ld+json">${JSON.stringify(obj)}</script>\n`

const base = readFileSync(join(dist, 'index.html'), 'utf8')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')
const { render } = await import(pathToFileURL(ssrEntry).href)

/** Put the pre-rendered page markup inside <div id="root">. */
const withBody = (html, path) => {
  const markup = render(path)
  if (!html.includes('<div id="root"></div>')) throw new Error('<div id="root"></div> not found in index.html')
  return html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
}

for (const page of pages) {
  const url = `${SITE}${page.path === '/' ? '/' : page.path}`
  let html = base
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`)
  html = setMeta(html, 'name', 'description', page.description)
  html = setMeta(html, 'property', 'og:title', page.title)
  html = setMeta(html, 'property', 'og:description', page.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', page.title)
  html = setMeta(html, 'name', 'twitter:description', page.description)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)

  let extra = ''
  if (page.path !== '/') {
    extra += jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    })
  }
  if (page.path === '/faq') {
    extra += jsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  if (page.path === '/services') {
    extra += jsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'EagleWing Express freight services',
      itemListElement: services.map((sv, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: sv.title,
          description: sv.text,
          serviceType: 'Freight delivery',
          provider: { '@id': `${SITE}/#business` },
          areaServed: ['Vancouver Island, BC', 'Lower Mainland, BC'],
        },
      })),
    })
  }
  if (extra) html = html.replace('</head>', () => `${extra}  </head>`)

  writeFileSync(join(dist, page.file), withBody(html, page.path))
}

// 404 page: real "not found" title, kept out of search results.
{
  let html = base
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(notFoundMeta.title)}</title>`)
  html = setMeta(html, 'name', 'description', notFoundMeta.description)
  html = html.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />')
  html = html.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
  writeFileSync(join(dist, '404.html'), withBody(html, '/404-not-found'))
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
  .join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

console.log(`SEO: wrote ${pages.length} page files, sitemap.xml and robots.txt for ${SITE_NAME} (${SITE})`)
