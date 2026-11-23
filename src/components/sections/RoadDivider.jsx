import { useRef } from 'react'
import RealTruck, { ROAD_EDGE } from '../ui/RealTruck'
import { Mountains, CityToForest } from '../ui/IslandScenery'
import useScrollProgress from '../../hooks/useScrollProgress'

/**
 * A stretch of Vancouver Island highway at the top of the page "curtain".
 * The EagleWing truck drives along the road on a loop; as you scroll, the
 * scenery rolls past in layers — Victoria's skyline and legislature dome give
 * way to evergreen forest, with the Island mountains moving slowest behind.
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

        {/* truck drives along the road on its own (wheels spinning); all wheels on the road surface */}
        <div
          className="road-drive absolute bottom-0 z-10 w-56 sm:w-[22rem]"
          style={{ transform: `translateY(${(1 - ROAD_EDGE) * 100}%)` }}
        >
          <RealTruck spinning />
        </div>
      </div>

      {/* the road: deep enough that the whole truck, front tyre included, sits on it */}
      <div className="relative h-12 bg-charcoal sm:h-16">
        <div className="absolute inset-x-0 top-0 h-1 bg-crimson" />
        <div className="absolute inset-x-0 top-[55%] h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffffff_0_36px,transparent_36px_72px)] opacity-70" />
      </div>
    </div>
  )
}
