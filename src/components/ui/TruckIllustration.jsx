import { WING_E_PATH, WING_TOP_PATH } from './BrandMark'

/** EagleWing Express box truck in the company livery. Pure SVG. */
export default function TruckIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id="tk-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eaeff5" />
        </linearGradient>
        <linearGradient id="tk-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#174b7a" />
          <stop offset="1" stopColor="#0b2e4f" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="206" rx="240" ry="8" fill="#0b2e4f" opacity="0.08" />

      {/* box */}
      <rect x="20" y="22" width="312" height="148" rx="8" fill="url(#tk-box)" stroke="#d5dde8" strokeWidth="2" />
      <rect x="20" y="150" width="312" height="20" fill="#0b2e4f" />
      <rect x="20" y="146" width="312" height="4" fill="#f5b247" />
      {/* Wing-E mark */}
      <g transform="translate(40 44) scale(1.45) translate(8 1) skewX(-14)">
        <path d={WING_E_PATH} fill="#0b2e4f" />
        <path d={WING_TOP_PATH} fill="#f5b247" />
      </g>
      <text x="150" y="92" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="28" fill="#0b2e4f">EagleWing</text>
      <text x="151" y="116" fontFamily="Public Sans, sans-serif" fontWeight="700" fontSize="12" letterSpacing="5" fill="#e39b28">EXPRESS</text>

      {/* cab */}
      <path d="M338 64 h78 a10 10 0 0 1 8 4 l52 62 a10 10 0 0 1 2 6 v34 h-140 z" fill="url(#tk-cab)" />
      <path d="M352 78 h58 l42 50 h-100 z" fill="#9db7d3" opacity="0.9" />
      <path d="M358 84 h14 l-14 18 z" fill="#ffffff" opacity="0.5" />
      <rect x="340" y="140" width="136" height="4" fill="#f5b247" />
      <rect x="464" y="148" width="14" height="9" rx="2" fill="#ffe7a8" />
      <rect x="14" y="170" width="472" height="10" rx="3" fill="#071d33" />

      {/* wheels */}
      {[88, 152, 420].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="184" r="24" fill="#071d33" />
          <circle cx={cx} cy="184" r="10" fill="#c8d3e1" />
        </g>
      ))}
    </svg>
  )
}
