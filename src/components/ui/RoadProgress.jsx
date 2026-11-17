import { useEffect, useState } from 'react'

/** Thin page-progress line under the header. */
export default function RoadProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
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
  }, [])

  return (
    <div className="h-[3px] bg-white/5" aria-hidden="true">
      <div className="h-full origin-left bg-gradient-to-r from-brand to-accent" style={{ transform: `scaleX(${p})` }} />
    </div>
  )
}
