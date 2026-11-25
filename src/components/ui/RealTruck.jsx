import { TRUCK_SRC, TRUCK_W, TRUCK_H, TRUCK_REAR_CONTACT, TRUCK_RIMS } from '../../data/truck'

/**
 * Where the road's far edge sits, as a fraction of the truck image height: a little
 * above the rear tyres, so every wheel (and the shadow) is on the road surface.
 */
export const ROAD_EDGE = TRUCK_REAR_CONTACT - 0.07

/**
 * Realistic EagleWing Express box truck (photo cut-out with the livery
 * painted on — built by scripts/make-truck.mjs). Faces right.
 *
 * spinning    — wheel rims turn continuously (for a truck driving on a loop)
 * wheelAngle  — or set the rims' angle yourself (e.g. from scroll position)
 * bounce      — subtle suspension bob while driving
 * lift        — 'up' (stowed, for a moving truck) or 'down' (lowered to the ground with a pallet on it)
 */
export default function RealTruck({ className = 'w-full', bounce = false, spinning = false, wheelAngle, eager = false, lift = 'up' }) {
  return (
    <div className={`relative select-none ${bounce ? 'truck-bounce' : ''} ${className}`}>
      <img
        src={TRUCK_SRC}
        width={TRUCK_W}
        height={TRUCK_H}
        alt="EagleWing Express box truck"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
        className="block h-auto w-full"
      />
      {/* Tailgate lift (the EagleWing specialty), shown stowed as it is while driving:
          the platform folded up behind the box, on its rail, with the hinge at the bottom.
          Drawn in the image's own pixel units so it scales with the truck. */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${TRUCK_W} ${TRUCK_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="lift-metal" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8e96a0" />
            <stop offset="0.45" stopColor="#d6dbe1" />
            <stop offset="1" stopColor="#a3aab3" />
          </linearGradient>
        </defs>
        {lift === 'down' ? (
          <g>
            {/* rail post, carriage run down to the ground */}
            <rect x="-9" y="226" width="9" height="282" fill="#5d646e" />
            <rect x="-16" y="488" width="22" height="20" rx="2" fill="#2f343c" />
            {/* platform lowered flat at ground level */}
            <rect x="-262" y="496" width="252" height="13" rx="2" fill="url(#lift-metal)" stroke="#6b727c" strokeWidth="1.5" />
            <path d="M-262 496 l-10 13 h10 z" fill="#8e96a0" />
            <ellipse cx="-130" cy="512" rx="150" ry="5" fill="#000" opacity="0.18" />
            {/* wooden pallet */}
            <rect x="-236" y="474" width="196" height="7" fill="#b8874f" />
            {[-236, -146, -56].map((x) => (
              <rect key={x} x={x} y="481" width="16" height="15" fill="#9c6f3e" />
            ))}
            <rect x="-236" y="481" width="196" height="3" fill="#8a5f33" opacity="0.6" />
            {/* boxes on the pallet, stretch-wrapped */}
            {[
              [-232, 412, 62, 62], [-168, 412, 62, 62], [-104, 412, 62, 62],
              [-222, 352, 58, 60], [-162, 352, 58, 60], [-102, 360, 52, 52],
            ].map(([x, y, w, h]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width={w} height={h} fill="#c9965c" stroke="#9a6d3c" strokeWidth="1.5" />
                <rect x={x + w / 2 - 4} y={y} width="8" height={h} fill="#d9b07c" opacity="0.8" />
              </g>
            ))}
            <rect x="-236" y="350" width="196" height="124" fill="#ffffff" opacity="0.16" />
          </g>
        ) : (
          <g>
            {/* rail post */}
            <rect x="-9" y="226" width="9" height="222" fill="#5d646e" />
            {/* folded platform */}
            <rect x="-27" y="238" width="18" height="200" rx="2" fill="url(#lift-metal)" stroke="#6b727c" strokeWidth="1.5" />
            {[262, 292, 322, 352, 382, 412].map((y) => (
              <path key={y} d={`M-24 ${y} l12 -8`} stroke="#8a929c" strokeWidth="1.5" />
            ))}
            {/* hinge / carriage */}
            <rect x="-30" y="436" width="48" height="10" rx="2" fill="#2f343c" />
          </g>
        )}
      </svg>
      {(spinning || wheelAngle !== undefined) &&
        TRUCK_RIMS.map((r) => {
          // A square box around the rim, squashed to the rim's ellipse; the round disc inside rotates.
          const side = (2 * r.ry * TRUCK_H) / TRUCK_W // as a fraction of the image width
          const squash = (r.rx * TRUCK_W) / (r.ry * TRUCK_H)
          return (
            <span
              key={r.src}
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                left: `${(r.x - side / 2) * 100}%`,
                top: `${(r.y - r.ry) * 100}%`,
                width: `${side * 100}%`,
                height: `${2 * r.ry * 100}%`,
                transform: `scaleX(${squash.toFixed(4)})`,
              }}
            >
              <img
                src={r.src}
                alt=""
                draggable="false"
                decoding="async"
                className={`block h-full w-full ${spinning ? 'rim-spin' : ''}`}
                style={wheelAngle !== undefined ? { transform: `rotate(${wheelAngle}deg)` } : undefined}
              />
            </span>
          )
        })}
    </div>
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
        <RealTruck spinning eager />
      </div>
    </div>
  )
}
