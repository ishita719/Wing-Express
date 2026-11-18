import { useRef } from 'react'
import TruckIllustration from '../ui/TruckIllustration'
import useScrollProgress from '../../hooks/useScrollProgress'
import { coverage } from '../../data/site'

/**
 * A short stretch of highway at the top of the page "curtain".
 * The truck drives left → right in step with the scroll, the lane
 * markings stream past, and town signs slide by in the background.
 */
export default function RoadDivider() {
  const ref = useRef(null)
  const p = useScrollProgress(ref, { from: 1.05, to: -0.35 })

  return (
    <div ref={ref} className="relative overflow-hidden rounded-t-[2rem] bg-white pt-10" aria-hidden="true">
      {/* town signposts drifting the opposite way (parallax) */}
      <div
        className="pointer-events-none absolute top-6 left-0 flex gap-24 whitespace-nowrap will-change-transform"
        style={{ transform: `translateX(${-p * 40}%)` }}
      >
        {[...coverage.all, ...coverage.all].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-ink/25 uppercase">
            <span className="h-4 w-0.5 bg-ink/15" />
            {t}
          </span>
        ))}
      </div>

      <div className="relative h-36 sm:h-44">
        {/* truck */}
        <div
          className="absolute -bottom-1 w-48 will-change-transform sm:w-72"
          style={{ left: `calc(${-15 + p * 115}% - 60px)` }}
        >
          <TruckIllustration className="w-full drop-shadow-xl" />
        </div>
      </div>

      {/* the road */}
      <div className="relative h-10 bg-charcoal">
        <div
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffffff_0_36px,transparent_36px_72px)] opacity-70"
          style={{ backgroundPositionX: `${-p * 900}px` }}
        />
        <div className="absolute inset-x-0 top-0 h-1 bg-crimson" />
      </div>
    </div>
  )
}
