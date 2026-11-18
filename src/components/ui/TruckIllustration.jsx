import { useId } from 'react'
import { FEATHERS, BASE } from './BrandMark'
import { company } from '../../data/site'

/** One detailed truck wheel: tyre, tread ring, alloy rim, hub and lug nuts. */
function Wheel({ cx, cy, ids }) {
  const nuts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    return [cx + Math.cos(a) * 10.5, cy + Math.sin(a) * 10.5]
  })
  return (
    <g>
      <circle cx={cx} cy={cy} r="33" fill="#121418" />
      <circle cx={cx} cy={cy} r="29.5" fill="none" stroke="#2b2e35" strokeWidth="2.5" strokeDasharray="5 3" />
      <circle cx={cx} cy={cy} r="20" fill={`url(#${ids.rim})`} />
      <circle cx={cx} cy={cy} r="15" fill="none" stroke="#868b93" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="7.5" fill="#575c64" />
      <circle cx={cx} cy={cy} r="3" fill="#c9ccd1" />
      {nuts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="#e3e5e8" />
      ))}
    </g>
  )
}

/**
 * Realistic side view of an EagleWing Express box truck (cab-over, 26 ft box).
 * Pure SVG, so it stays sharp at any size and needs no image download.
 */
export default function TruckIllustration({ className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids = {
    box: `box${uid}`,
    rail: `rail${uid}`,
    cab: `cab${uid}`,
    glass: `glass${uid}`,
    chrome: `chrome${uid}`,
    rim: `rim${uid}`,
    shade: `shade${uid}`,
  }

  return (
    <svg viewBox="0 0 640 260" className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id={ids.box} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.85" stopColor="#f1f2f4" />
          <stop offset="1" stopColor="#dfe2e6" />
        </linearGradient>
        <linearGradient id={ids.rail} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4e6e9" />
          <stop offset="0.5" stopColor="#b9bdc4" />
          <stop offset="1" stopColor="#8d929a" />
        </linearGradient>
        <linearGradient id={ids.cab} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ea4459" />
          <stop offset="0.55" stopColor="#d7263d" />
          <stop offset="1" stopColor="#a3182b" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a5768" />
          <stop offset="1" stopColor="#1c232c" />
        </linearGradient>
        <linearGradient id={ids.chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f7f8" />
          <stop offset="0.45" stopColor="#a4a9b0" />
          <stop offset="0.7" stopColor="#e9ebee" />
          <stop offset="1" stopColor="#80858d" />
        </linearGradient>
        <radialGradient id={ids.rim} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#f5f6f8" />
          <stop offset="0.6" stopColor="#b7bbc2" />
          <stop offset="1" stopColor="#7c8189" />
        </radialGradient>
        <linearGradient id={ids.shade} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.12" />
          <stop offset="0.08" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="322" cy="248" rx="306" ry="8" fill="#000" opacity="0.16" />

      {/* ── BOX ── */}
      <rect x="18" y="18" width="414" height="180" rx="5" fill={`url(#${ids.box})`} stroke="#cdd1d6" strokeWidth="1.5" />
      <rect x="18" y="18" width="414" height="180" rx="5" fill={`url(#${ids.shade})`} />
      <rect x="18" y="18" width="414" height="9" rx="3" fill="#d6d9de" />
      {/* panel posts */}
      {Array.from({ length: 9 }, (_, i) => 40 + i * 44).map((x) => (
        <line key={x} x1={x} y1="27" x2={x} y2="186" stroke="#0b0d10" strokeOpacity="0.045" strokeWidth="2" />
      ))}
      {/* rear door frame, hinges, lights */}
      <rect x="18" y="18" width="11" height="180" fill="#c3c7cd" />
      {[46, 104, 160].map((y) => (
        <rect key={y} x="21" y={y} width="12" height="7" rx="1.5" fill="#8d929a" />
      ))}
      <rect x="12" y="160" width="7" height="20" rx="2" fill="#c1121f" />
      <circle cx="24" cy="24" r="3" fill="#f59e0b" />
      {/* livery */}
      <rect x="29" y="172" width="403" height="7" fill="#d7263d" />
      <g transform="translate(58 66) scale(1.15)">
        {FEATHERS.map((f, i) => (
          <path key={i} d={f.d} fill={f.centre ? '#d7263d' : '#1b1f27'} />
        ))}
        <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#1b1f27" />
      </g>
      <text x="188" y="116" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="500" fontSize="46" fill="#1b1f27" letterSpacing="-0.5">
        EagleWing
      </text>
      <text x="191" y="141" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="600" fontSize="15" letterSpacing="9" fill="#d7263d">
        EXPRESS
      </text>
      <text x="60" y="160" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="12" fill="#55606e">
        {company.phone} · Vancouver Island, BC
      </text>
      {/* bottom rail */}
      <rect x="18" y="186" width="414" height="12" fill={`url(#${ids.rail})`} />

      {/* ── CHASSIS ── */}
      <rect x="30" y="198" width="568" height="10" fill="#202329" />
      {/* rear fender + mud flap */}
      <path d="M286 208 A44 44 0 0 1 374 208 Z" fill="#15171b" />
      <rect x="378" y="200" width="9" height="36" rx="1.5" fill="#15171b" />
      {/* fuel tank */}
      <rect x="444" y="204" width="54" height="22" rx="11" fill={`url(#${ids.chrome})`} />
      <rect x="452" y="203" width="4" height="24" fill="#6f747c" />
      <rect x="486" y="203" width="4" height="24" fill="#6f747c" />

      {/* ── CAB ── */}
      <rect x="432" y="64" width="6" height="140" fill="#15171b" />
      <path
        d="M438 62 H556 C572 62 581 69 586 80 L610 148 C612.5 155 614 162 614 170 V208 H438 Z"
        fill={`url(#${ids.cab})`}
      />
      {/* roof marker lights */}
      {[490, 512, 534].map((x) => (
        <rect key={x} x={x} y="58" width="9" height="5" rx="2" fill="#f59e0b" />
      ))}
      {/* side window + reflection */}
      <path d="M452 76 H554 C564 76 570 82 573 90 L590 136 H452 Z" fill={`url(#${ids.glass})`} />
      <path d="M470 76 H496 L470 128 H452 V112 Z" fill="#ffffff" opacity="0.16" />
      <path d="M452 136 H590" stroke="#8f1426" strokeWidth="3" />
      {/* door */}
      <rect x="446" y="72" width="112" height="132" rx="5" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
      <rect x="530" y="152" width="18" height="5" rx="2.5" fill="#8f1426" />
      {/* door logo (white) */}
      <g transform="translate(466 152) scale(0.36)">
        {FEATHERS.map((f, i) => (
          <path key={i} d={f.d} fill="#ffffff" opacity={f.centre ? 1 : 0.92} />
        ))}
        <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill="#ffffff" />
      </g>
      {/* mirror */}
      <path d="M584 92 L604 84" stroke="#202329" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="600" y="70" width="9" height="40" rx="3" fill="#202329" />
      {/* front lights, grille, bumper */}
      <rect x="601" y="156" width="12" height="6" rx="2" fill="#f59e0b" />
      <rect x="596" y="166" width="18" height="13" rx="3" fill="#fff6d6" stroke="#b9bdc4" strokeWidth="1.5" />
      {[184, 189, 194].map((y) => (
        <line key={y} x1="600" y1={y} x2="614" y2={y} stroke="#8f1426" strokeWidth="2" />
      ))}
      <rect x="586" y="200" width="36" height="16" rx="4" fill="#24272e" />
      <rect x="590" y="203" width="28" height="3" rx="1.5" fill="#a4a9b0" />
      {/* step */}
      <rect x="452" y="226" width="40" height="6" rx="2" fill="#24272e" />
      {/* front fender */}
      <path d="M466 208 A44 44 0 0 1 554 208 Z" fill="#15171b" />

      {/* ── WHEELS ── */}
      <Wheel cx={330} cy={214} ids={ids} />
      <Wheel cx={510} cy={214} ids={ids} />
    </svg>
  )
}
