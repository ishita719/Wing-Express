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
    <div className="relative border-y-2 border-ink" aria-label="Highlights">
      <div className="hazard h-2.5" aria-hidden="true" />
      <div className="overflow-hidden bg-signal py-3.5 text-ink">
        <div className="flex w-max animate-hazard hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 pr-6 font-display text-2xl font-black whitespace-nowrap uppercase sm:text-3xl"
              aria-hidden={i >= items.length}
            >
              {t}
              <span className="inline-block size-3 rotate-45 bg-ink" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <div className="hazard h-2.5" aria-hidden="true" />
    </div>
  )
}
