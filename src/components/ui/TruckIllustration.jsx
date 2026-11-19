import { useId } from 'react'
import { FEATHERS, BASE } from './BrandMark'
import { company } from '../../data/site'

/*
 * EagleWing Express box truck in three-quarter front view (front facing
 * right), modelled on a medium-duty conventional-cab box truck: white cab
 * with hood, chrome grille and bumper, aluminium box with amber marker
 * lights, chrome fuel tank, polished wheels.
 *
 * Drawn with a tiny perspective projection so every panel lines up:
 *   d = distance from the front of the truck (0 = nose, 1 = back of box)
 *   e = across the truck (0 = near side, 1 = far side)
 *   h = height above the ground
 */
const X0 = 560 // x of the near-front corner
const X1 = 70 // x of the near-back corner
const W = 132 // apparent width of the front face
const G0 = 380 // ground line at the front

function P(d, e, h) {
  const s = 1 - 0.3 * d // things further back look smaller
  const k = 1 - 0.14 * e // far side looks slightly smaller
  return [X0 + (X1 - X0) * d + W * e * (1 - 0.25 * d), G0 - 55 * d - 30 * e - h * s * k]
}
const f = (n) => n.toFixed(1)
const poly = (...pts) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')} Z`

/** Affine transform that maps a local W×H box onto the box side panel. */
function sideMatrix(dLeft, dRight, hTop, hBottom, w, h) {
  const [ax, ay] = P(dLeft, 0, hTop)
  const [bx, by] = P(dRight, 0, hTop)
  const [cx, cy] = P(dLeft, 0, hBottom)
  return `matrix(${(bx - ax) / w} ${(by - ay) / w} ${(cx - ax) / h} ${(cy - ay) / h} ${ax} ${ay})`
}

/**
 * Wheel seen at an angle: tyre tread (visible depth), sidewall, polished
 * dished rim with hand holes, hub and lug nuts. The rim spins.
 */
function Wheel({ d, e = 0, R = 50, ids, angle, spinning, far = false }) {
  const [cx, cy] = P(d, e, R)
  const s = 1 - 0.3 * d
  const r = R * s
  const holes = Array.from({ length: 10 }, (_, i) => i * 36)
  const nuts = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2)
  return (
    <g opacity={far ? 0.9 : 1}>
      {/* tread: the tyre's thickness, seen toward the front */}
      <g transform={`translate(${f(cx + r * 0.26)} ${f(cy - r * 0.04)}) scale(0.8 1)`}>
        <circle r={r} fill="#1a1c21" />
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={r - 4} y={-1.6} width="5" height="3.2" fill="#2b2e35" transform={`rotate(${i * 20 - 90})`} />
        ))}
      </g>
      <g transform={`translate(${f(cx)} ${f(cy)}) scale(0.8 1)`}>
        {/* sidewall */}
        <circle r={r} fill="#101216" />
        <circle r={r * 0.9} fill="none" stroke="#24272d" strokeWidth={r * 0.06} />
        {!far && (
          <>
            {/* rim */}
            <circle r={r * 0.63} fill={`url(#${ids.rim})`} />
            <circle r={r * 0.63} fill="none" stroke="#7d838c" strokeWidth="1.5" />
            <circle r={r * 0.5} fill="none" stroke="#a3a9b1" strokeWidth="1" opacity="0.8" />
            <g className={`wheel-spin ${spinning ? 'animate-wheel' : ''}`} style={angle != null ? { transform: `rotate(${angle}deg)` } : undefined}>
              {holes.map((deg) => (
                <ellipse key={deg} cx="0" cy={-r * 0.42} rx={r * 0.06} ry={r * 0.1} fill="#5a6069" transform={`rotate(${deg})`} />
              ))}
              <circle r={r * 0.25} fill="#e3e6ea" stroke="#9aa0a8" strokeWidth="1" />
              {nuts.map((a, i) => (
                <circle key={i} cx={Math.cos(a) * r * 0.18} cy={Math.sin(a) * r * 0.18} r={r * 0.03} fill="#7d838c" />
              ))}
              <circle r={r * 0.08} fill="#8a9098" />
            </g>
          </>
        )}
      </g>
    </g>
  )
}

/**
 * Props:
 *  - wheelAngle: number — rotate wheels to this angle (scroll-driven motion)
 *  - spinning:   boolean — wheels spin continuously
 *  - bounce:     boolean — gentle suspension bounce on the body
 */
export default function TruckIllustration({ className = '', wheelAngle, spinning = false, bounce = false }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids = {
    alu: `alu${uid}`,
    aluFront: `aluf${uid}`,
    rail: `rail${uid}`,
    cab: `cab${uid}`,
    hood: `hood${uid}`,
    glass: `glass${uid}`,
    chrome: `chrome${uid}`,
    rim: `rim${uid}`,
    shadow: `shadow${uid}`,
  }

  // panel geometry
  const BOX_FRONT = 0.31
  const BOX_BOTTOM = 80
  const BOX_TOP = 300
  const CAB_BACK = 0.275
  const ROOF = 214
  const COWL = 0.128
  const HOOD = 150
  const CAB_BOTTOM = 62
  const FRONT_AXLE = 0.088
  const REAR_AXLE = 0.8

  // front wheel arch on the cab side
  const [wcx, wcy] = P(FRONT_AXLE, 0, 50)
  const ws = 1 - 0.3 * FRONT_AXLE
  const archRx = 50 * ws * 0.8 * 1.18
  const archRy = 50 * ws * 1.16
  const archY = wcy - 10
  const cabSide = `${poly(P(CAB_BACK, 0, ROOF - 4), P(CAB_BACK - 0.01, 0, ROOF), P(0.15, 0, ROOF + 1), P(0.142, 0, ROOF - 6), P(COWL, 0, HOOD + 8), P(0.004, 0, HOOD - 4), P(0, 0, HOOD - 12), P(0, 0, CAB_BOTTOM)).slice(0, -2)} L${f(wcx + archRx)} ${f(archY)} A${f(archRx)} ${f(archRy)} 0 0 0 ${f(wcx - archRx)} ${f(archY)} L${f(P(CAB_BACK, 0, CAB_BOTTOM)[0])} ${f(P(CAB_BACK, 0, CAB_BOTTOM)[1])} Z`

  return (
    <svg viewBox="40 60 680 350" className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id={ids.alu} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d6dade" />
          <stop offset="0.6" stopColor="#eef0f2" />
          <stop offset="1" stopColor="#f8f9fa" />
        </linearGradient>
        <linearGradient id={ids.aluFront} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c4c9cf" />
          <stop offset="1" stopColor="#a9afb7" />
        </linearGradient>
        <linearGradient id={ids.rail} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9dde2" />
          <stop offset="1" stopColor="#8a9098" />
        </linearGradient>
        <linearGradient id={ids.cab} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.65" stopColor="#f1f3f5" />
          <stop offset="1" stopColor="#d3d8de" />
        </linearGradient>
        <linearGradient id={ids.hood} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e9ed" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#56657a" />
          <stop offset="0.5" stopColor="#222b36" />
          <stop offset="1" stopColor="#11161d" />
        </linearGradient>
        <linearGradient id={ids.chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#b5bac1" />
          <stop offset="0.55" stopColor="#f2f4f6" />
          <stop offset="1" stopColor="#7a8089" />
        </linearGradient>
        <radialGradient id={ids.rim} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#cfd3d8" />
          <stop offset="1" stopColor="#80868f" />
        </radialGradient>
        <filter id={ids.shadow} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ground shadow */}
      <path d={poly(P(1.02, -0.06, 0), P(-0.04, -0.06, 0), P(-0.04, 1.06, 0), P(1.02, 1.06, 0))} fill="#000" opacity="0.22" filter={`url(#${ids.shadow})`} />

      <g className={bounce ? 'truck-bounce' : ''}>
        {/* ── BOX ── */}
        <path d={poly(P(BOX_FRONT, 0, BOX_TOP), P(BOX_FRONT, 1, BOX_TOP), P(BOX_FRONT, 1, BOX_BOTTOM), P(BOX_FRONT, 0, BOX_BOTTOM))} fill={`url(#${ids.aluFront})`} />
        <path d={poly(P(1, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_BOTTOM), P(1, 0, BOX_BOTTOM))} fill={`url(#${ids.alu})`} />
        {/* panel seams */}
        {[0.4, 0.49, 0.58, 0.67, 0.76, 0.85, 0.94].map((d) => {
          const [x1, y1] = P(d, 0, BOX_TOP - 10)
          const [x2, y2] = P(d, 0, BOX_BOTTOM + 14)
          return <line key={d} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke="#0b0d10" strokeOpacity="0.06" strokeWidth="1.4" />
        })}
        {/* top rail, corner posts, bottom rail */}
        <path d={poly(P(1, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_TOP - 9), P(1, 0, BOX_TOP - 9))} fill="#c6cbd1" />
        <path d={poly(P(BOX_FRONT + 0.014, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_TOP), P(BOX_FRONT, 0, BOX_BOTTOM), P(BOX_FRONT + 0.014, 0, BOX_BOTTOM))} fill="#e9ebee" stroke="#b7bcc3" strokeWidth="0.8" />
        <path d={poly(P(1, 0, BOX_TOP), P(0.985, 0, BOX_TOP), P(0.985, 0, BOX_BOTTOM), P(1, 0, BOX_BOTTOM))} fill="#c3c8ce" />
        <path d={poly(P(1, 0, BOX_BOTTOM + 13), P(BOX_FRONT, 0, BOX_BOTTOM + 13), P(BOX_FRONT, 0, BOX_BOTTOM), P(1, 0, BOX_BOTTOM))} fill={`url(#${ids.rail})`} />
        {/* amber marker lights (side + front of box) */}
        {[0.36, 0.5, 0.64, 0.78, 0.93].map((d) => {
          const [x, y] = P(d, 0, BOX_TOP - 4)
          return <rect key={d} x={f(x - 5)} y={f(y - 2)} width="10" height="4.5" rx="2" fill="#f59e0b" />
        })}
        {[0.18, 0.82].map((e) => {
          const [x, y] = P(BOX_FRONT, e, BOX_TOP - 4)
          return <rect key={e} x={f(x - 5)} y={f(y - 2)} width="10" height="4.5" rx="2" fill="#f59e0b" />
        })}
        {/* rear light */}
        <path d={poly(P(1.004, 0, 118), P(0.992, 0, 118), P(0.992, 0, 94), P(1.004, 0, 94))} fill="#c1121f" />

        {/* livery, mapped onto the box side */}
        <g transform={sideMatrix(0.955, 0.36, 268, 104, 400, 164)}>
          <g transform="translate(6 16) scale(0.92)">
            {FEATHERS.map((ft, i) => (
              <path key={i} d={ft.d} fill={ft.centre ? '#d7263d' : '#1b1f27'} />
            ))}
            <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#1b1f27" />
          </g>
          <text x="112" y="58" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="500" fontSize="50" fill="#1b1f27" letterSpacing="-0.5">
            EagleWing
          </text>
          <text x="115" y="86" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="600" fontSize="16" letterSpacing="10" fill="#d7263d">
            EXPRESS
          </text>
          <text x="8" y="124" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="15" fill="#55606e">
            {company.phone} · Vancouver Island, BC
          </text>
          <rect x="0" y="146" width="400" height="9" fill="#d7263d" />
        </g>

        {/* rear underride guard */}
        <path d={poly(P(0.99, 0, BOX_BOTTOM), P(0.975, 0, BOX_BOTTOM), P(0.975, 0, 44), P(0.99, 0, 44))} fill="#2a2d34" />
        <path d={poly(P(1.0, 0.0, 48), P(1.0, 0.95, 48), P(1.0, 0.95, 38), P(1.0, 0.0, 38))} fill="#2a2d34" />

        {/* chassis frame */}
        <path d={poly(P(0.96, 0, BOX_BOTTOM), P(0.02, 0, BOX_BOTTOM), P(0.02, 0, 64), P(0.96, 0, 64))} fill="#1d2026" />
        {/* rear wheel well shade + mud flap */}
        <path d={poly(P(0.86, 0, BOX_BOTTOM), P(0.74, 0, BOX_BOTTOM), P(0.74, 0, 70), P(0.86, 0, 70))} fill="#15171b" />
        <path d={poly(P(0.885, 0, 70), P(0.872, 0, 70), P(0.872, 0, 16), P(0.885, 0, 16))} fill="#15171b" />
      </g>

      {/* near rear wheel (dual) */}
      <Wheel d={REAR_AXLE + 0.012} ids={ids} far />
      <Wheel d={REAR_AXLE} ids={ids} angle={wheelAngle} spinning={spinning} />

      <g className={bounce ? 'truck-bounce' : ''}>
        {/* gap between box and cab */}
        <path d={poly(P(BOX_FRONT, 0, BOX_TOP - 60), P(CAB_BACK, 0, BOX_TOP - 60), P(CAB_BACK, 0, CAB_BOTTOM), P(BOX_FRONT, 0, CAB_BOTTOM))} fill="#15171b" />

        {/* fuel tank + step */}
        <path d={poly(P(0.262, 0, 64), P(0.158, 0, 64), P(0.158, 0, 26), P(0.262, 0, 26))} fill={`url(#${ids.chrome})`} />
        {[0.172, 0.248].map((d) => (
          <path key={d} d={poly(P(d + 0.004, 0, 66), P(d, 0, 66), P(d, 0, 24), P(d + 0.004, 0, 24))} fill="#6c727b" />
        ))}

        {/* ── CAB ── */}
        {/* back of cab (thin face) */}
        <path d={poly(P(CAB_BACK, 0, ROOF - 4), P(CAB_BACK, 0.9, ROOF - 4), P(CAB_BACK, 0.9, CAB_BOTTOM), P(CAB_BACK, 0, CAB_BOTTOM))} fill="#d3d8de" />
        {/* cab roof */}
        <path d={poly(P(CAB_BACK - 0.01, 0, ROOF), P(CAB_BACK - 0.01, 0.95, ROOF), P(0.15, 0.95, ROOF + 1), P(0.15, 0, ROOF + 1))} fill="#f6f7f8" />
        {/* side panel with wheel arch */}
        <path d={cabSide} fill={`url(#${ids.cab})`} stroke="#c3c8ce" strokeWidth="1.2" />
        {/* side window */}
        <path d={poly(P(0.262, 0, ROOF - 12), P(0.157, 0, ROOF - 10), P(0.138, 0, HOOD + 20), P(0.262, 0, HOOD + 20))} fill={`url(#${ids.glass})`} />
        <path d={poly(P(0.245, 0, ROOF - 12), P(0.215, 0, ROOF - 11), P(0.24, 0, HOOD + 20), P(0.262, 0, HOOD + 20), P(0.262, 0, ROOF - 30))} fill="#fff" opacity="0.14" />
        {/* door + handle */}
        <path d={poly(P(0.268, 0, ROOF - 6), P(0.15, 0, ROOF - 4), P(0.13, 0, HOOD + 6), P(0.13, 0, CAB_BOTTOM + 8), P(0.268, 0, CAB_BOTTOM + 8))} fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="1.3" />
        <path d={poly(P(0.165, 0, HOOD + 3), P(0.148, 0, HOOD + 3), P(0.148, 0, HOOD - 1), P(0.165, 0, HOOD - 1))} fill="#8f959d" />
        {/* brand stripe on cab */}
        <path d={poly(P(CAB_BACK, 0, 112), P(0.004, 0, 112), P(0.004, 0, 106), P(CAB_BACK, 0, 106))} fill="#d7263d" />
        {/* door logo */}
        <g transform={sideMatrix(0.255, 0.195, 140, 120, 100, 64)}>
          {FEATHERS.map((ft, i) => (
            <path key={i} d={ft.d} fill={ft.centre ? '#d7263d' : '#1b1f27'} />
          ))}
          <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#1b1f27" />
        </g>

        {/* hood top */}
        <path d={poly(P(COWL, 0, HOOD + 8), P(COWL, 1, HOOD + 8), P(0.004, 1, HOOD - 4), P(0.004, 0, HOOD - 4))} fill={`url(#${ids.hood})`} />
        {/* windshield (front face of cab) */}
        <path d={poly(P(0.147, 0.05, ROOF - 5), P(0.147, 0.95, ROOF - 5), P(COWL + 0.002, 0.95, HOOD + 10), P(COWL + 0.002, 0.05, HOOD + 10))} fill={`url(#${ids.glass})`} />
        <path d={poly(P(0.147, 0.12, ROOF - 5), P(0.147, 0.3, ROOF - 5), P(COWL + 0.002, 0.18, HOOD + 10), P(COWL + 0.002, 0.06, HOOD + 10))} fill="#fff" opacity="0.15" />
        {/* cab roof marker lights */}
        {[0.24, 0.37, 0.5, 0.63, 0.76].map((e) => {
          const [x, y] = P(0.15, e, ROOF + 2)
          return <rect key={e} x={f(x - 5)} y={f(y - 2.5)} width="10" height="5" rx="2" fill="#f59e0b" />
        })}

        {/* nose (front face) */}
        <path d={poly(P(0, 0, HOOD - 12), P(0, 1, HOOD - 12), P(0, 1, CAB_BOTTOM), P(0, 0, CAB_BOTTOM))} fill="#eceff2" />
        <path d={poly(P(0.004, 0, HOOD - 4), P(0.004, 1, HOOD - 4), P(0, 1, HOOD - 12), P(0, 0, HOOD - 12))} fill="#f7f8f9" />
        {/* chrome grille with bars */}
        <path d={poly(P(-0.001, 0.24, HOOD - 16), P(-0.001, 0.76, HOOD - 16), P(-0.001, 0.76, 84), P(-0.001, 0.24, 84))} fill={`url(#${ids.chrome})`} stroke="#8a9098" strokeWidth="1" />
        {[124, 114, 104, 94].map((h) => {
          const [x1, y1] = P(-0.002, 0.27, h)
          const [x2, y2] = P(-0.002, 0.73, h)
          return <line key={h} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke="#6b717a" strokeWidth="2" />
        })}
        {/* headlights */}
        {[
          [0.04, 0.21],
          [0.79, 0.96],
        ].map(([e1, e2]) => (
          <g key={e1}>
            <path d={poly(P(-0.001, e1, 130), P(-0.001, e2, 130), P(-0.001, e2, 110), P(-0.001, e1, 110))} fill="#eef4ff" stroke="#9aa0a8" strokeWidth="1.2" />
            <path d={poly(P(-0.001, e1 + 0.02, 127), P(-0.001, e1 + 0.07, 127), P(-0.001, e1 + 0.07, 113), P(-0.001, e1 + 0.02, 113))} fill="#ffffff" />
          </g>
        ))}
        {/* amber corner marker on fender */}
        <path d={poly(P(0.03, 0, 104), P(0.012, 0, 104), P(0.012, 0, 97), P(0.03, 0, 97))} fill="#f59e0b" />

        {/* west-coast mirror */}
        {(() => {
          const [ax, ay] = P(0.14, 0, ROOF - 18)
          const [bx, by] = P(0.14, 0, HOOD + 18)
          return (
            <g>
              <path d={`M${f(ax)} ${f(ay)} L${f(ax - 16)} ${f(ay + 8)} M${f(bx)} ${f(by)} L${f(bx - 16)} ${f(by - 6)}`} stroke="#2a2d34" strokeWidth="3" strokeLinecap="round" />
              <rect x={f(ax - 24)} y={f(ay - 2)} width="10" height={f(by - ay - 2)} rx="3" fill="#1d2026" />
              <ellipse cx={f(ax - 19)} cy={f(by + 8)} rx="5" ry="6" fill="#1d2026" />
            </g>
          )
        })()}
      </g>

      {/* near front wheel */}
      <Wheel d={FRONT_AXLE} ids={ids} angle={wheelAngle} spinning={spinning} />

      {/* chrome bumper (wraps around the corner) */}
      <g className={bounce ? 'truck-bounce' : ''}>
        <path d={poly(P(0.035, 0, 80), P(-0.02, -0.03, 80), P(-0.02, -0.03, 50), P(0.035, 0, 50))} fill={`url(#${ids.chrome})`} />
        <path d={poly(P(-0.02, -0.03, 80), P(-0.02, 1.03, 80), P(-0.02, 1.03, 50), P(-0.02, -0.03, 50))} fill={`url(#${ids.chrome})`} stroke="#8a9098" strokeWidth="1" />
      </g>
    </svg>
  )
}
