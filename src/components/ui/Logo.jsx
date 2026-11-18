import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'

/** EagleWing Express logo lockup: feather-fan mark + wordmark. */
export default function Logo({ light = true, animate = false, className = '' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="EagleWing Express — home">
      <BrandMark
        variant={light ? 'light' : 'dark'}
        animate={animate}
        className="h-8 w-auto shrink-0 transition-transform duration-500 group-hover:scale-105"
      />
      <span className="leading-none">
        <span className={`block font-brand text-[1.6rem] font-medium tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          EagleWing
        </span>
        <span className={`mt-0.5 block font-brand text-[10px] font-semibold tracking-[0.42em] ${light ? 'text-crimson-400' : 'text-crimson'}`}>
          EXPRESS
        </span>
      </span>
    </Link>
  )
}
