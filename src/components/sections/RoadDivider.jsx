import { useRef } from 'react'
import RealTruck, { ROAD_EDGE } from '../ui/RealTruck'
import { Mountains, CityToForest } from '../ui/IslandScenery'
import useScrollProgress from '../../hooks/useScrollProgress'

/**
 * A stretch of Vancouver Island highway at the top of the page "curtain".
 * As you scroll, the EagleWing truck drives left (forwards — it faces left)
 * while the scenery rolls past the other way in layers: evergreen forest gives
 * way to Victoria's skyline and legislature dome, with the Island mountains
 * moving slowest behind.
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
          style={{ transform: `translateX(${-(1 - p) * 18}%)` }}
        />
        {/* mid: Victoria skyline → forest */}
        <CityToForest
          className="absolute bottom-0 left-0 h-28 w-[2240px] max-w-none will-change-transform sm:h-36 sm:w-[2880px]"
          style={{ transform: `translateX(${-(1 - p) * 45}%)` }}
        />
        {/* roadside verge */}
        <div className="absolute inset-x-0 bottom-0 h-3 bg-[#cfd5dc]" />

        {/* truck: all wheels on the road surface (front tyre lower, three-quarter view) */}
        <div
          className="absolute bottom-0 z-10 w-64 will-change-transform sm:w-[24rem]"
          style={{
            left: `calc(${98 - p * 110}% - 80px)`,
            transform: `translateY(${(1 - ROAD_EDGE) * 100}%)`,
          }}
        >
          <RealTruck bounce={p > 0 && p < 1} />
        </div>
      </div>

      {/* the road */}
      <div className="relative h-11 bg-charcoal">
        <div className="absolute inset-x-0 top-0 h-1 bg-crimson" />
        <div
          className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffffff_0_36px,transparent_36px_72px)] opacity-70"
          style={{ backgroundPositionX: `${p * 900}px` }}
        />
      </div>
    </div>
  )
}
