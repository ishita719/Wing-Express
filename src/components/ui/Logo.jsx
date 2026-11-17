/** Wing Express brand mark (three slanted "speed wings") + stencil wordmark. */
export default function Logo({ light = true, className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Wing Express — home">
      <svg viewBox="0 0 64 64" className="size-10 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="6" fill={light ? '#e0a83a' : '#0f1b2d'} />
        <g fill={light ? '#0f1b2d' : '#e0a83a'} className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M10 44 L30 16 H40 L20 44 Z" />
          <path d="M24 44 L40 22 H50 L34 44 Z" />
          <path d="M38 44 L48 30 H58 L48 44 Z" />
        </g>
        <rect x="8" y="50" width="48" height="4" fill="#1d6f7a" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-black tracking-wide uppercase ${light ? 'text-paper' : 'text-ink'}`}>
          Wing Express
        </span>
        <span className={`label mt-0.5 !text-[9px] ${light ? 'text-signal' : 'text-route'}`}>Freight · Logistics</span>
      </span>
    </a>
  )
}
