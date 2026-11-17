import { useEffect, useState } from 'react'
import { Truck } from 'lucide-react'

/** A thin "road" under the header; a truck drives along it as you scroll the page. */
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
    <div className="relative h-2 bg-asphalt-3" aria-hidden="true">
      {/* dashed centre line */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#e0a83a55_0_14px,transparent_14px_28px)]" />
      {/* travelled road */}
      <div className="absolute inset-y-0 left-0 bg-signal" style={{ width: `${p * 100}%` }} />
      {/* truck */}
      <div
        className="absolute -top-2.5 grid size-6 -translate-x-1/2 place-items-center rounded-sm border-2 border-ink bg-signal text-ink"
        style={{ left: `clamp(12px, ${p * 100}%, calc(100% - 12px))` }}
      >
        <Truck className="size-3.5" strokeWidth={2.5} />
      </div>
    </div>
  )
}
