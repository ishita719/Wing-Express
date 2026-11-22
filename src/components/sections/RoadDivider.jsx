import { useRef } from 'react'
import TruckIllustration from '../ui/TruckIllustration'
import { Mountains, CityToForest } from '../ui/IslandScenery'
import useScrollProgress from '../../hooks/useScrollProgress'

/**
 * A stretch of Vancouver Island highway at the top of the page "curtain".
 * As you scroll, the EagleWing truck drives right while the scenery rolls
 * past in layers — Victoria's skyline and legislature dome give way to
 * evergreen forest, with the Island mountains moving slowest behind.
 */
export default function RoadDivider({ rounded = true }) {
  const ref = useRef(null)
  const p = useScrollProgress(ref, { from: 1.05, to: -0.35 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded ? 'rounded-t-[2rem]' : ''} bg-gradient-to-b from-white via-[#f4f6f8] to-[#eceff3]`} aria-hidden="true">
      <div className="relative h-56 sm:h-72">
        {/* far: mountains */}
        <Mountains
          className="absolute bottom-0 left-0 h-36 w-[2500px] max-w-none will-change-transform sm:h-44 sm:w-[3050px]"
          style={{ transform: `translateX(${-p * 18}%)` }}
        />
        {/* mid: Victoria skyline → forest */}
        <CityToForest
          className="absolute bottom-0 left-0 h-28 w-[2240px] max-w-none will-change-transform sm:h-36 sm:w-[2880px]"
          style={{ transform: `translateX(${-p * 45}%)` }}
        />
        {/* roadside verge */}
        <div className="absolute inset-x-0 bottom-0 h-3 bg-[#cfd5dc]" />

        {/* truck */}
        <div
          className="absolute -bottom-[3px] w-60 will-change-transform sm:w-[22rem]"
          style={{ left: `calc(${-12 + p * 110}% - 80px)` }}
        >
          <TruckIllustration className="w-full" wheelAngle={p * 2400} bounce={p > 0 && p < 1} />
        </div>
      </div>

      {/* the road */}
      <div className="relative h-11 bg-charcoal">
        <div className="absolute inset-x-0 top-0 h-1 bg-crimson" />
        <div
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffffff_0_36px,transparent_36px_72px)] opacity-70"
          style={{ backgroundPositionX: `${-p * 900}px` }}
        />
      </div>
    </div>
  )
}
