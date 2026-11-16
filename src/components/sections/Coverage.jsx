import { Truck, MapPin, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { coverage } from '../../data/site'

export default function Coverage() {
  const { stops, pickups } = coverage
  const max = stops[stops.length - 1].km

  return (
    <section id="coverage" className="py-20 sm:py-28" aria-labelledby="coverage-title">
      <div className="container-x">
        <SectionHeading
          id="coverage-title"
          eyebrow="Coverage"
          title="Where our trucks stop"
          text={`One scheduled line, ${stops.length} stops and ${max} km of dependable daily service — plus pickups from surrounding regions.`}
        />

        <Reveal className="mt-14 rounded-[2rem] border border-ink-900/10 bg-mist p-6 sm:p-10">
          {/* Desktop: horizontal route */}
          <div className="relative hidden px-6 pt-16 pb-2 md:block">
            <div className="absolute top-[4.5rem] right-6 left-6 h-1.5 rounded-full bg-ink-900/10" aria-hidden="true" />
            <div className="absolute top-[4.5rem] right-6 left-6 h-1.5 rounded-full bg-gradient-to-r from-wing-500 to-ember-500 opacity-80" aria-hidden="true" />

            {/* moving truck */}
            <div className="absolute top-[3.1rem] right-6 left-6" aria-hidden="true">
              <div className="relative h-0">
                <span className="absolute grid size-10 -translate-x-1/2 animate-route place-items-center rounded-full bg-ink-900 text-white shadow-lg ring-4 ring-white">
                  <Truck className="size-4" />
                </span>
              </div>
            </div>

            <ol className="relative h-24">
              {stops.map((s, i) => (
                <li
                  key={s.name}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center text-center"
                  style={{ left: `${(s.km / max) * 100}%` }}
                >
                  <span
                    className={`mt-[0.3rem] size-5 rounded-full border-4 border-white shadow ${
                      i === 0 || i === stops.length - 1 ? 'bg-ember-500' : 'bg-wing-600'
                    }`}
                  />
                  <span className="mt-4 text-sm font-semibold whitespace-nowrap">{s.name}</span>
                  <span className="text-xs text-ink-900/50">{s.km} km</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile: vertical route */}
          <ol className="relative ml-3 border-l-2 border-dashed border-wing-500/40 md:hidden">
            {stops.map((s, i) => (
              <li key={s.name} className="relative pb-7 pl-7 last:pb-0">
                <span
                  className={`absolute top-0.5 -left-[11px] size-5 rounded-full border-4 border-mist ${
                    i === 0 || i === stops.length - 1 ? 'bg-ember-500' : 'bg-wing-600'
                  }`}
                />
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-ink-900/50">{s.km} km from hub</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-ink-900/10 pt-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold">Also picking up from</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pickups.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm text-ink-900/70 shadow-sm">
                    <MapPin className="size-3.5 text-ember-500" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="#quote" variant="dark" icon={ArrowRight}>
              Check your location
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
