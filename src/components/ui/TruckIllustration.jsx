import { useId } from 'react'
import { FEATHERS, BASE } from './BrandMark'
import { company } from '../../data/site'

/**
 * One truck wheel: tyre + sidewall, polished aluminium rim with hand holes,
 * hub and lug nuts. The rim group rotates — either to `angle` degrees
 * (scroll-driven) or continuously when `spinning` is true.
 */
function Wheel({ cx, cy, ids, angle, spinning }) {
  const holes = Array.from({ length: 10 }, (_, i) => (i / 10) * 360)
  const nuts = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)
  const rimStyle = angle != null ? { transform: `rotate(${angle}deg)` } : undefined
  return (
    <g>
      <circle cx={cx} cy={cy} r="34" fill="#111317" />
      <circle cx={cx} cy={cy} r="30.5" fill="none" stroke="#2a2d34" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="23" fill={`url(#${ids.rim})`} />
      <circle cx={cx} cy={cy} r="23" fill="none" stroke="#7f858e" strokeWidth="1.5" />
      <g className={`wheel-spin ${spinning ? 'animate-wheel' : ''}`} style={rimStyle}>
        {holes.map((deg) => (
          <ellipse
            key={deg}
            cx={cx}
            cy={cy - 15}
            rx="2.4"
            ry="4.2"
            fill="#5d636c"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r="8.5" fill="#d9dce0" stroke="#9ba0a8" strokeWidth="1" />
        {nuts.map((a, i) => (
          <circle key={i} cx={cx + Math.cos(a) * 6} cy={cy + Math.sin(a) * 6} r="1.3" fill="#7f858e" />
        ))}
        <circle cx={cx} cy={cy} r="2.6" fill="#7f858e" />
      </g>
    </g>
  )
}

/**
 * Realistic side view of a conventional-cab box truck in EagleWing livery:
 * white cab with hood and chrome grille, aluminium box with amber marker
 * lights, polished wheels, chrome bumper and fuel tank.
 *
 * Props:
 *  - wheelAngle: number — rotate wheels to this angle (use for scroll-driven motion)
 *  - spinning:   boolean — wheels spin continuously
 *  - bounce:     boolean — gentle suspension bounce on the body
 */
export default function TruckIllustration({ className = '', wheelAngle, spinning = false, bounce = false }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids = {
    alu: `alu${uid}`,
    post: `post${uid}`,
    rail: `rail${uid}`,
    cab: `cab${uid}`,
    glass: `glass${uid}`,
    chrome: `chrome${uid}`,
    rim: `rim${uid}`,
  }

  return (
    <svg viewBox="0 0 680 270" className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id={ids.alu} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfbfc" />
          <stop offset="0.55" stopColor="#eef0f2" />
          <stop offset="1" stopColor="#d9dde2" />
        </linearGradient>
        <linearGradient id={ids.post} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9bec5" />
          <stop offset="0.5" stopColor="#e9ebee" />
          <stop offset="1" stopColor="#aab0b8" />
        </linearGradient>
        <linearGradient id={ids.rail} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2e5e9" />
          <stop offset="0.5" stopColor="#b3b9c1" />
          <stop offset="1" stopColor="#868c95" />
        </linearGradient>
        <linearGradient id={ids.cab} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f3f4f6" />
          <stop offset="1" stopColor="#d8dce1" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b5868" />
          <stop offset="1" stopColor="#141a22" />
        </linearGradient>
        <linearGradient id={ids.chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#a9aeb6" />
          <stop offset="0.6" stopColor="#eef0f2" />
          <stop offset="1" stopColor="#7c828b" />
        </linearGradient>
        <radialGradient id={ids.rim} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#c8ccd2" />
          <stop offset="1" stopColor="#868c95" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="340" cy="258" rx="322" ry="7" fill="#000" opacity="0.18" />

      {/* ── BODY (bounces) ── */}
      <g className={bounce ? 'truck-bounce' : ''}>
        {/* box */}
        <rect x="18" y="14" width="424" height="192" rx="4" fill={`url(#${ids.alu})`} stroke="#c3c8ce" strokeWidth="1.2" />
        <rect x="18" y="14" width="424" height="10" fill="#c9ced5" />
        {Array.from({ length: 7 }, (_, i) => 71 + i * 53).map((x) => (
          <line key={x} x1={x} y1="24" x2={x} y2="192" stroke="#0b0d10" strokeOpacity="0.05" strokeWidth="1.5" />
        ))}
        <rect x="18" y="14" width="12" height="192" fill={`url(#${ids.post})`} />
        <rect x="430" y="14" width="12" height="192" fill={`url(#${ids.post})`} />
        <rect x="18" y="192" width="424" height="14" fill={`url(#${ids.rail})`} />
        {/* amber marker lights along the top, like the reference truck */}
        {[34, 140, 246, 352, 424].map((x) => (
          <rect key={x} x={x} y="16" width="11" height="5" rx="2" fill="#f59e0b" />
        ))}
        <rect x="11" y="166" width="7" height="24" rx="2" fill="#c1121f" />
        {/* livery */}
        <rect x="30" y="178" width="400" height="6" fill="#d7263d" />
        <g transform="translate(56 64) scale(1.05)">
          {FEATHERS.map((f, i) => (
            <path key={i} d={f.d} fill={f.centre ? '#d7263d' : '#1b1f27'} />
          ))}
          <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#1b1f27" />
        </g>
        <text x="180" y="110" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="500" fontSize="44" fill="#1b1f27" letterSpacing="-0.5">
          EagleWing
        </text>
        <text x="183" y="135" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="600" fontSize="14" letterSpacing="9" fill="#d7263d">
          EXPRESS
        </text>
        <text x="58" y="160" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="12" fill="#55606e">
          {company.phone} · Vancouver Island, BC
        </text>
        {/* rear underride guard */}
        <rect x="24" y="206" width="6" height="22" fill="#2a2d34" />
        <rect x="16" y="226" width="40" height="6" rx="1" fill="#2a2d34" />

        {/* chassis + rear wheel well + mud flap */}
        <rect x="40" y="206" width="596" height="10" fill="#1d2026" />
        <path d="M312 208 A42 42 0 0 1 396 208 Z" fill="#15171b" />
        <rect x="398" y="206" width="9" height="40" rx="1.5" fill="#15171b" />

        {/* gap between box and cab */}
        <rect x="442" y="58" width="9" height="154" fill="#15171b" />

        {/* cab (conventional, with hood) */}
        <path
          d="M451 212 L451 76 C451 70 455 66 461 66 L536 66 C546 66 552 70 556 78 L580 130 L636 136 C648 137 654 144 656 154 L660 196 C660 205 656 212 648 212 L629 212 A36 36 0 0 0 557 212 Z"
          fill={`url(#${ids.cab})`}
          stroke="#c9ced5"
          strokeWidth="1.5"
        />
        {/* hood crease + panel line */}
        <path d="M580 130 L636 136" stroke="#ffffff" strokeWidth="2" />
        <path d="M584 142 C610 144 630 148 642 160" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="1.5" />
        {/* side window + reflection */}
        <path d="M463 78 L533 78 C540 78 544 81 547 87 L567 128 L463 128 Z" fill={`url(#${ids.glass})`} />
        <path d="M478 78 L500 78 L474 128 L463 128 L463 106 Z" fill="#ffffff" opacity="0.16" />
        {/* door, handle, brand pinstripe, door logo */}
        <rect x="457" y="74" width="100" height="134" rx="4" fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="1.5" />
        <rect x="532" y="146" width="17" height="4.5" rx="2" fill="#9aa0a8" />
        <path d="M451 170 H560 M629 170 H656" stroke="#d7263d" strokeWidth="4" />
        <g transform="translate(474 136) scale(0.3)">
          {FEATHERS.map((f, i) => (
            <path key={i} d={f.d} fill={f.centre ? '#d7263d' : '#1b1f27'} />
          ))}
          <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#1b1f27" />
        </g>
        {/* west-coast mirror */}
        <path d="M555 86 L572 80 M560 124 L572 118" stroke="#2a2d34" strokeWidth="3" strokeLinecap="round" />
        <rect x="570" y="70" width="9" height="54" rx="3" fill="#1d2026" />
        <circle cx="575" cy="132" r="5" fill="#1d2026" />
        {/* cab roof marker lights */}
        {[478, 500, 522].map((x) => (
          <rect key={x} x={x} y="61" width="10" height="5" rx="2" fill="#f59e0b" />
        ))}
        {/* grille, headlight, marker, bumper */}
        <rect x="645" y="148" width="13" height="46" rx="3" fill={`url(#${ids.chrome})`} />
        {[156, 164, 172, 180, 188].map((y) => (
          <line key={y} x1="647" y1={y} x2="656" y2={y} stroke="#6f757e" strokeWidth="1.2" />
        ))}
        <rect x="626" y="150" width="19" height="12" rx="4" fill="#eef4ff" stroke="#9aa0a8" strokeWidth="1.2" />
        <rect x="620" y="176" width="9" height="4" rx="1.5" fill="#f59e0b" />
        <rect x="634" y="196" width="34" height="17" rx="4" fill={`url(#${ids.chrome})`} />
        {/* fuel tank with step */}
        <rect x="464" y="216" width="72" height="24" rx="12" fill={`url(#${ids.chrome})`} />
        <rect x="474" y="215" width="4" height="26" fill="#7c828b" />
        <rect x="522" y="215" width="4" height="26" fill="#7c828b" />
      </g>

      {/* ── WHEELS (spin) ── */}
      <Wheel cx={354} cy={224} ids={ids} angle={wheelAngle} spinning={spinning} />
      <Wheel cx={593} cy={224} ids={ids} angle={wheelAngle} spinning={spinning} />
    </svg>
  )
}
