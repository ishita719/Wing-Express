import { useEffect, useRef, useState } from 'react'

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let scriptPromise

function loadScript() {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT
    s.async = true
    s.onload = () => resolve(window.turnstile)
    s.onerror = reject
    document.head.appendChild(s)
  })
  return scriptPromise
}

/**
 * Cloudflare Turnstile bot check for the quote form.
 * The site key comes from the Worker (/api/config). While no key is set there,
 * nothing is shown and onEnabled(false) is reported, so the form still works.
 * `resetKey` — change it to get a fresh token (after a send).
 */
export default function Turnstile({ onToken, onEnabled, resetKey }) {
  const box = useRef(null)
  const widget = useRef(null)
  const [siteKey, setSiteKey] = useState('')

  useEffect(() => {
    let live = true
    fetch('/api/config')
      .then((r) => (r.ok ? r.json() : {}))
      .then((c) => {
        if (!live) return
        const key = typeof c.turnstileSiteKey === 'string' ? c.turnstileSiteKey : ''
        setSiteKey(key)
        onEnabled?.(Boolean(key))
      })
      .catch(() => onEnabled?.(false))
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!siteKey || !box.current) return
    let cancelled = false
    loadScript()
      .then((ts) => {
        if (cancelled || !ts || widget.current !== null) return
        widget.current = ts.render(box.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (t) => onToken(t),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      })
      .catch(() => onEnabled?.(false))
    return () => {
      cancelled = true
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  useEffect(() => {
    if (resetKey && widget.current !== null && window.turnstile) {
      window.turnstile.reset(widget.current)
      onToken('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  if (!siteKey) return null
  return <div ref={box} className="mt-6 min-h-[65px]" />
}
