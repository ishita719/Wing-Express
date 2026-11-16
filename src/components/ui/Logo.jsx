/** Wing Express brand mark + wordmark. */
export default function Logo({ light = true, className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Wing Express — home">
      <svg viewBox="0 0 64 64" className="size-10 shrink-0 transition-transform duration-500 group-hover:-rotate-6" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff8d55" />
            <stop offset="1" stopColor="#ff6a2b" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill={light ? '#ffffff14' : '#0a1028'} />
        <path d="M10 42 C24 40 34 30 42 16 L48 21 C40 35 28 44 12 46 Z" fill="url(#logo-g)" />
        <path d="M20 50 C32 48 42 41 50 30 L55 35 C47 45 36 52 22 53 Z" fill="#7390ff" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          Wing<span className="text-ember-500">Express</span>
        </span>
        <span className={`mt-1 text-[10px] font-medium tracking-[0.25em] uppercase ${light ? 'text-white/50' : 'text-ink-900/50'}`}>
          Freight · Logistics
        </span>
      </span>
    </a>
  )
}
