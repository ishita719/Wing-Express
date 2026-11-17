import { ArrowRight, Phone, Check } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import TruckIllustration from '../ui/TruckIllustration'
import { company, heroBadges, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

const headline = [
  { text: 'Freight' },
  { text: 'that flies.', accent: true },
  { text: 'On time.' },
]

/** Decorative barcode built from bars of varying width. */
function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2]
  return (
    <div className="flex h-9 items-stretch gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w * 2 }} />
      ))}
    </div>
  )
}

export default function Hero() {
  const first = coverage.stops[0].name
  const last = coverage.stops[coverage.stops.length - 1].name

  return (
    <section className="relative isolate overflow-hidden bg-asphalt pt-32 pb-20 text-paper sm:pt-36 lg:pt-44 lg:pb-28" aria-labelledby="hero-title">
      {/* moving lane markings */}
      <div className="lane-lines absolute top-0 right-[8%] -z-10 hidden h-full w-1 animate-lane opacity-25 lg:block" aria-hidden="true" />
      <div className="lane-lines absolute top-0 right-[38%] -z-10 hidden h-full w-1 animate-lane opacity-10 lg:block" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="label mb-6 inline-flex flex-wrap items-center gap-2 text-paper/70">
            <span className="rounded-sm bg-route px-2 py-1 text-white">● Now booking</span>
            <span>Daily runs · {company.serviceDays}</span>
          </p>

          <Reveal effect="none">
            <h1 id="hero-title" className="text-[3.6rem] leading-[0.86] sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem]">
              {headline.map((l, i) => (
                <span key={l.text} className="mask-line">
                  <span style={{ transitionDelay: `${150 + i * 130}ms` }} className={l.accent ? 'text-signal' : ''}>
                    {l.text}
                  </span>
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal effect="rise" delay={550}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
              Scheduled daily freight, full truckloads and tailgate delivery — from a single parcel to a full pallet deck.
              Book by <strong className="bg-signal px-1 font-semibold whitespace-nowrap text-ink">{company.cutoff}</strong>, delivered next day.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="#quote" size="lg" icon={ArrowRight}>
                Get a free quote
              </Button>
              <Button href={tel(company.phone)} size="lg" variant="ghost" iconLeft={Phone}>
                Call dispatch
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {heroBadges.map((b) => (
                <li key={b} className="label inline-flex items-center gap-1.5 rounded-sm border border-paper/20 px-2.5 py-1.5 text-paper/75">
                  <Check className="size-3.5 text-signal" strokeWidth={3} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Waybill card */}
        <Reveal effect="rise" delay={350} className="relative lg:col-span-5">
          <div className="relative rotate-[-1.5deg] rounded-md border-2 border-ink bg-paper p-5 text-ink shadow-hard-signal transition-transform duration-500 hover:rotate-0 sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-ink/30 pb-4">
              <div>
                <p className="label text-ink/50">Waybill Nº</p>
                <p className="font-mono text-xl font-bold">WX-0204</p>
              </div>
              <Barcode />
            </div>

            <div className="grid grid-cols-2 gap-4 border-b-2 border-dashed border-ink/30 py-4">
              <div>
                <p className="label text-ink/50">From</p>
                <p className="font-display text-2xl font-black uppercase">{first}</p>
              </div>
              <div className="text-right">
                <p className="label text-ink/50">To</p>
                <p className="font-display text-2xl font-black uppercase">{last}</p>
              </div>
            </div>

            <TruckIllustration className="my-5 w-full" />

            <dl className="grid grid-cols-3 gap-3 border-t-2 border-dashed border-ink/30 pt-4 font-mono text-xs">
              <div>
                <dt className="label text-ink/50">Pieces</dt>
                <dd className="mt-1 font-bold">6 PLT</dd>
              </div>
              <div>
                <dt className="label text-ink/50">Cutoff</dt>
                <dd className="mt-1 font-bold">{company.cutoff}</dd>
              </div>
              <div>
                <dt className="label text-ink/50">ETA</dt>
                <dd className="mt-1 font-bold">Next day</dd>
              </div>
            </dl>

            {/* rubber stamp */}
            <div className="absolute -top-5 -right-3 rotate-[12deg] rounded-md border-[3px] border-route bg-paper/90 px-3 py-1.5 font-display text-xl font-black tracking-wider text-route uppercase sm:-right-6">
              On schedule
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
