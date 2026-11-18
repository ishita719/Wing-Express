import { useEffect, useState } from 'react'

const clamp = (v) => Math.min(1, Math.max(0, v))

/**
 * Scroll-linked progress (0 → 1) for an element.
 * `from` / `to` are where the element's TOP sits, as a fraction of the
 * viewport height: progress is 0 when top = from·vh and 1 when top = to·vh.
 * e.g. { from: 1, to: 0 } = from entering at the bottom until it hits the top.
 * Returns 1 immediately when the user prefers reduced motion.
 */
export default function useScrollProgress(ref, { from = 1, to = 0 } = {}) {
  const [p, setP] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1)
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      setP(clamp((from * vh - top) / ((from - to) * vh)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref, from, to])

  return p
}
