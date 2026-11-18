import { useEffect, useRef } from 'react'

/**
 * Keeps the hero pinned in place while the rest of the page slides up over
 * it like a curtain. As it gets covered, the hero recedes (scales down,
 * dims and blurs slightly). If the hero is taller than the screen (phones),
 * it pins once its bottom edge reaches the bottom of the viewport.
 */
export default function PinnedHero({ children }) {
  const wrap = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    const layout = () => {
      const el = wrap.current
      if (!el) return
      // Negative top lets a tall hero scroll to its end before pinning.
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`
    }
    const update = () => {
      raf = 0
      const el = wrap.current
      const c = inner.current
      if (!el || !c || reduce) return
      const h = el.offsetHeight
      const pinnedAt = Math.max(0, h - window.innerHeight)
      const p = Math.min(1, Math.max(0, (window.scrollY - pinnedAt) / window.innerHeight))
      c.style.transform = `scale(${1 - p * 0.08}) translateY(${p * -30}px)`
      c.style.opacity = String(1 - p * 0.75)
      c.style.filter = p > 0.01 ? `blur(${p * 3}px)` : ''
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      layout()
      onScroll()
    }

    layout()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrap} className="sticky z-0 bg-charcoal-950">
      <div ref={inner} className="origin-top will-change-transform">
        {children}
      </div>
    </div>
  )
}
