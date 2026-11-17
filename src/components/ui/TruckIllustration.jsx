/** Original Wing Express box truck — flat, outlined "sticker" style. Pure SVG. */
export default function TruckIllustration({ className = '' }) {
  const ink = '#15171c'
  return (
    <svg viewBox="0 0 520 230" className={className} role="img" aria-label="Wing Express box truck">
      <g className="animate-bob" stroke={ink} strokeWidth="4" strokeLinejoin="round">
        {/* box */}
        <rect x="20" y="20" width="310" height="150" rx="4" fill="#f2efe6" />
        {/* hazard band */}
        <rect x="20" y="146" width="310" height="24" fill="#ffc21a" />
        <g stroke="none" fill={ink}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M${30 + i * 26} 170 l14 -24 h10 l-14 24 z`} />
          ))}
        </g>
        {/* wing livery */}
        <g fill="#0e6b4a" stroke="none">
          <path d="M44 128 L104 48 H136 L76 128 Z" />
          <path d="M88 128 L136 64 H168 L120 128 Z" />
          <path d="M132 128 L168 80 H200 L164 128 Z" />
        </g>
        <text x="210" y="96" stroke="none" fontFamily="Big Shoulders Display, Impact, sans-serif" fontWeight="900" fontSize="34" fill={ink}>WING</text>
        <text x="210" y="128" stroke="none" fontFamily="Big Shoulders Display, Impact, sans-serif" fontWeight="900" fontSize="34" fill={ink}>EXPRESS</text>

        {/* cab */}
        <path d="M336 62 h86 l58 64 v52 h-144 z" fill="#ffc21a" />
        <path d="M352 76 h62 l44 50 h-106 z" fill="#15171c" />
        <path d="M358 82 h14 l-14 18 z" fill="#f2efe6" stroke="none" />
        <rect x="462" y="146" width="20" height="12" fill="#f2efe6" />
        {/* chassis */}
        <rect x="14" y="174" width="476" height="12" fill={ink} />
      </g>

      {/* wheels */}
      {[86, 150, 420].map((cx) => (
        <g key={cx} stroke={ink} strokeWidth="4">
          <circle cx={cx} cy="190" r="26" fill={ink} />
          <circle cx={cx} cy="190" r="11" fill="#ffc21a" />
        </g>
      ))}
    </svg>
  )
}
