const items = [
  'Scheduled daily freight',
  'Full truckload',
  'LTL & pallets',
  'Power tailgate on every truck',
  'Last-mile delivery',
  'GPS tracked fleet',
  'Fully insured',
  'Same-day quotes',
]

/** Hazard-tape banner with a scrolling list of highlights. */
export default function TrustMarquee() {
  const row = [...items, ...items]
  return (
    <div className="relative border-y border-signal/40 bg-asphalt-2" aria-label="Highlights">
      <div className="overflow-hidden py-4 text-paper">
        <div className="flex w-max animate-hazard hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 pr-6 font-display text-xl font-bold tracking-wide whitespace-nowrap uppercase sm:text-2xl"
              aria-hidden={i >= items.length}
            >
              {t}
              <span className="inline-block size-2 rotate-45 bg-signal" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
