import { Feather } from 'lucide-react'

const items = [
  'Scheduled daily freight',
  'Full truckload',
  'LTL & pallets',
  'Power tailgate on every truck',
  'Last-mile delivery',
  'GPS tracked fleet',
  'Fully insured',
  'NSC certified carrier',
  'Same-day quotes',
]

export default function TrustMarquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ember-500 py-4 text-white" aria-label="Highlights">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-semibold tracking-wide whitespace-nowrap uppercase sm:text-base" aria-hidden={i >= items.length}>
            {t}
            <Feather className="size-4 opacity-70" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
