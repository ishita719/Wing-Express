import { MapPin } from 'lucide-react'
import { coverage } from '../../data/site'

/** Scrolling ribbon of the communities served, under the hero. */
export default function TrustMarquee() {
  const row = [...coverage.all, ...coverage.all, ...coverage.all, ...coverage.all]
  return (
    <div className="relative overflow-hidden border-b border-line bg-white py-5" aria-label="Communities we serve">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
      <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {row.map((town, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 px-7 font-display text-lg font-semibold whitespace-nowrap text-ink/80"
            aria-hidden={i >= coverage.all.length}
          >
            <MapPin className="size-4 text-crimson-dark" aria-hidden="true" />
            {town}
          </li>
        ))}
      </ul>
    </div>
  )
}
