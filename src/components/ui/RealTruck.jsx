import { TRUCK_SRC, TRUCK_W, TRUCK_H, TRUCK_REAR_CONTACT } from '../../data/truck'

/**
 * Where the road's far edge sits, as a fraction of the truck image height: a little
 * above the rear tyres, so every wheel (and the shadow) is on the road surface.
 */
export const ROAD_EDGE = TRUCK_REAR_CONTACT - 0.07

/**
 * Realistic EagleWing Express box truck (photo cut-out with the livery
 * painted on — built by scripts/make-truck.mjs). Faces right.
 *
 * `bounce` adds a subtle suspension bob while driving.
 */
export default function RealTruck({ className = 'w-full', bounce = false, eager = false }) {
  return (
    <img
      src={TRUCK_SRC}
      width={TRUCK_W}
      height={TRUCK_H}
      alt="EagleWing Express box truck"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      className={`block h-auto select-none ${bounce ? 'truck-bounce' : ''} ${className}`}
    />
  )
}

/**
 * Truck driving across a strip of road. The road's far edge runs just behind
 * the rear tyres, so all wheels roll on the road surface (the near front tyre
 * sits lower on it, as it does in a three-quarter view).
 */
export function TruckOnRoad({ duration = '9s', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-x-0 -bottom-4 bg-charcoal"
        style={{ top: `${ROAD_EDGE * 100}%` }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson" />
        <div className="road-dash absolute inset-x-0 top-[58%] h-0.5 -translate-y-1/2" style={{ animation: 'none' }} />
      </div>
      <div className="truck-travel relative z-10 mx-auto w-[86%]" style={{ animationDuration: duration }}>
        <RealTruck bounce eager />
      </div>
    </div>
  )
}
