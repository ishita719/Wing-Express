/** Wing Express brand mark (three forward-swept wing strokes) + wordmark. */
export default function Logo({ light = true, className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Wing Express — home">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill="#1f5fbf" />
        <g fill="#fff" className="origin-center transition-transform duration-300 group-hover:translate-x-0.5">
          <path d="M7 28 L18 12 h6 L13 28 Z" opacity="0.55" />
          <path d="M15 28 L24 15 h6 L21 28 Z" opacity="0.8" />
          <path d="M23 28 L29 19 h5 L28 28 Z" />
        </g>
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          Wing Express
        </span>
        <span className={`mt-1 block text-[10px] font-semibold tracking-[0.18em] uppercase ${light ? 'text-white/55' : 'text-muted'}`}>
          Freight &amp; Logistics
        </span>
      </span>
    </a>
  )
}
