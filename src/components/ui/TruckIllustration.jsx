/** Original Wing Express box-truck illustration (pure SVG, no image requests). */
export default function TruckIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 520 250" className={className} role="img" aria-label="Wing Express box truck">
      <defs>
        <linearGradient id="tk-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe6ff" />
        </linearGradient>
        <linearGradient id="tk-cab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff8d55" />
          <stop offset="1" stopColor="#f04f0f" />
        </linearGradient>
        <linearGradient id="tk-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9db1ff" />
          <stop offset="1" stopColor="#2a3fc9" />
        </linearGradient>
      </defs>

      {/* speed lines */}
      <g stroke="#7390ff" strokeLinecap="round" opacity=".6">
        <line x1="0" y1="80" x2="40" y2="80" strokeWidth="4" className="animate-pulse" />
        <line x1="10" y1="120" x2="60" y2="120" strokeWidth="4" />
        <line x1="0" y1="160" x2="30" y2="160" strokeWidth="4" className="animate-pulse" />
      </g>

      <g className="animate-drive">
        {/* box */}
        <rect x="60" y="30" width="290" height="150" rx="12" fill="url(#tk-box)" />
        <rect x="60" y="30" width="290" height="150" rx="12" fill="none" stroke="#0a1028" strokeOpacity=".08" strokeWidth="2" />
        {/* wing livery */}
        <path d="M80 150 C150 146 210 120 260 70 L280 88 C228 136 160 162 84 164 Z" fill="#ff6a2b" />
        <path d="M120 170 C190 166 250 140 300 100 L318 116 C268 156 200 178 124 178 Z" fill="#4c6bff" />
        <text x="90" y="72" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="26" fill="#0a1028">
          WING<tspan fill="#ff6a2b">EXPRESS</tspan>
        </text>
        <text x="91" y="94" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11" letterSpacing="3" fill="#0a1028" opacity=".5">
          FREIGHT · LOGISTICS
        </text>

        {/* cab */}
        <path d="M356 70 h76 a10 10 0 0 1 8 4 l46 58 a12 12 0 0 1 3 8 v40 h-133 z" fill="url(#tk-cab)" />
        <path d="M370 84 h56 l38 48 h-94 z" fill="url(#tk-glass)" />
        <path d="M374 88 l14 0 l-14 20 z" fill="#ffffff" opacity=".35" />
        <rect x="476" y="150" width="18" height="10" rx="3" fill="#ffe7a8" />
        <rect x="398" y="142" width="16" height="4" rx="2" fill="#0a1028" opacity=".35" />

        {/* chassis + tailgate */}
        <rect x="50" y="180" width="450" height="14" rx="4" fill="#0a1028" />
        <rect x="44" y="176" width="22" height="6" rx="2" fill="#7390ff" />
      </g>

      {/* wheels */}
      {[120, 180, 420].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="198" r="26" fill="#050816" />
          <circle cx={cx} cy="198" r="12" fill="#c7d0f5" />
          <circle cx={cx} cy="198" r="4" fill="#050816" />
        </g>
      ))}

      {/* road */}
      <line x1="0" y1="232" x2="520" y2="232" stroke="#ffffff" strokeOpacity=".15" strokeWidth="2" />
      <line x1="0" y1="244" x2="520" y2="244" stroke="#ffffff" strokeOpacity=".35" strokeWidth="3" strokeDasharray="22 18" className="animate-dash" />
    </svg>
  )
}
