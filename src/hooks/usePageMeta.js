import { useEffect } from 'react'
import { pageFor, notFoundMeta } from '../data/seo'

const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Keeps <title>, description, canonical, Open Graph / Twitter tags and the
 * robots directive in sync with the current route during in-app navigation.
 */
export default function usePageMeta(pathname) {
  useEffect(() => {
    const page = pageFor(pathname)
    const meta = page ?? notFoundMeta
    const url = `${SITE_URL}${page ? page.path : pathname}`

    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'robots', page ? 'index, follow' : 'noindex, follow')
    if (page) setCanonical(url)
  }, [pathname])
}
