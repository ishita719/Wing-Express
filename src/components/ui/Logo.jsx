import BrandMark from './BrandMark'

/** EagleWing Express logo lockup: Wing-E mark + wordmark. */
export default function Logo({ light = true, animate = false, className = '' }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-3 ${className}`} aria-label="EagleWing Express — home">
      <BrandMark
        variant={light ? 'crimson' : 'charcoal'}
        animate={animate}
        className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
      />
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          EagleWing
        </span>
        <span className="mt-1 block text-[10px] font-bold tracking-[0.34em] text-crimson-400">EXPRESS</span>
      </span>
    </a>
  )
}
