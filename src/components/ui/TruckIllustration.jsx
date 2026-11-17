/** Original Wing Express box truck in the corporate livery. Pure SVG. */
export default function TruckIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="Wing Express box truck">
      <defs>
        <linearGradient id="tk-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9eef5" />
        </linearGradient>
        <linearGradient id="tk-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a6fd6" />
          <stop offset="1" stopColor="#174a96" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="206" rx="240" ry="8" fill="#0a1f33" opacity="0.08" />

      {/* box */}
      <rect x="20" y="22" width="312" height="148" rx="8" fill="url(#tk-box)" stroke="#d5dde8" strokeWidth="2" />
      <rect x="20" y="150" width="312" height="20" fill="#0a1f33" />
      {/* wing mark */}
      <g transform="translate(46 52) scale(2.4)">
        <path d="M7 28 L18 12 h6 L13 28 Z" fill="#1f5fbf" opacity="0.55" />
        <path d="M15 28 L24 15 h6 L21 28 Z" fill="#1f5fbf" opacity="0.8" />
        <path d="M23 28 L29 19 h5 L28 28 Z" fill="#1f5fbf" />
      </g>
      <text x="146" y="96" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="25" fill="#0a1f33">Wing Express</text>
      <text x="147" y="118" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="10.5" letterSpacing="2" fill="#52637a">FREIGHT &amp; LOGISTICS</text>

      {/* cab */}
      <path d="M338 64 h78 a10 10 0 0 1 8 4 l52 62 a10 10 0 0 1 2 6 v34 h-140 z" fill="url(#tk-cab)" />
      <path d="M352 78 h58 l42 50 h-100 z" fill="#0a1f33" opacity="0.85" />
      <path d="M358 84 h14 l-14 18 z" fill="#ffffff" opacity="0.3" />
      <rect x="464" y="146" width="14" height="9" rx="2" fill="#ffe7a8" />
      <rect x="14" y="170" width="472" height="10" rx="3" fill="#0a1f33" />

      {/* wheels */}
      {[88, 152, 420].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="184" r="24" fill="#0a1f33" />
          <circle cx={cx} cy="184" r="10" fill="#c8d3e1" />
        </g>
      ))}
    </svg>
  )
}
