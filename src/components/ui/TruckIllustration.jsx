import { FEATHERS } from './BrandMark'

/** EagleWing Express box truck in the company livery (wing on the box). Pure SVG. */
export default function TruckIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id="tk-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eeecea" />
        </linearGradient>
        <linearGradient id="tk-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e03a50" />
          <stop offset="1" stopColor="#b51d32" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="206" rx="240" ry="8" fill="#1b1f27" opacity="0.08" />

      {/* box */}
      <rect x="20" y="22" width="312" height="148" rx="8" fill="url(#tk-box)" stroke="#dcdad6" strokeWidth="2" />
      <rect x="20" y="150" width="312" height="20" fill="#1b1f27" />
      {/* wing livery — the brand feathers, scaled up */}
      <g transform="translate(-22 -84) scale(5.6)" fill="#d7263d">
        {FEATHERS.map((d, i) => (
          <path key={d} d={d} opacity={1 - i * 0.2} />
        ))}
      </g>
      <text x="196" y="74" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="24" fill="#1b1f27">EagleWing</text>
      <text x="197" y="96" fontFamily="Public Sans, sans-serif" fontWeight="700" fontSize="11" letterSpacing="5" fill="#b51d32">EXPRESS</text>

      {/* cab */}
      <path d="M338 64 h78 a10 10 0 0 1 8 4 l52 62 a10 10 0 0 1 2 6 v34 h-140 z" fill="url(#tk-cab)" />
      <path d="M352 78 h58 l42 50 h-100 z" fill="#1b1f27" opacity="0.85" />
      <path d="M358 84 h14 l-14 18 z" fill="#ffffff" opacity="0.35" />
      <rect x="464" y="148" width="14" height="9" rx="2" fill="#ffe7a8" />
      <rect x="14" y="170" width="472" height="10" rx="3" fill="#12151b" />

      {/* wheels */}
      {[88, 152, 420].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="184" r="24" fill="#12151b" />
          <circle cx={cx} cy="184" r="10" fill="#c9ccd1" />
        </g>
      ))}
    </svg>
  )
}
