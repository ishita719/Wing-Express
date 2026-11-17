import { ArrowRight, Phone, CircleCheck, Check, Truck, PackageCheck, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import TruckIllustration from '../ui/TruckIllustration'
import { company, heroBadges, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

const timeline = [
  { icon: Check, label: 'Picked up', time: '3:40 pm', state: 'done' },
  { icon: Truck, label: 'In transit', time: 'Departed 6:00 pm', state: 'active' },
  { icon: MapPin, label: 'Out for delivery', time: 'Est. 9:00 am', state: 'next' },
  { icon: PackageCheck, label: 'Delivered', time: 'Est. 11:30 am', state: 'next' },
]

export default function Hero() {
  const first = coverage.stops[0].name
  const last = coverage.stops[coverage.stops.length - 1].name

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-navy-3 pt-36 pb-20 text-white lg:pt-44 lg:pb-28"
      aria-labelledby="hero-title"
    >
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
            <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
            Scheduled daily runs · {company.serviceDays}
          </p>

          <h1 id="hero-title" className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.6rem]">
            Reliable freight delivery, <span className="text-brand-100">on schedule</span> every day.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Scheduled daily freight, full truckloads and tailgate delivery — from a single parcel to a full pallet deck.
            Book by <strong className="font-semibold text-white">{company.cutoff}</strong> and it's delivered next day.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg" icon={ArrowRight}>
              Request a free quote
            </Button>
            <Button href={tel(company.phone)} size="lg" variant="ghost" iconLeft={Phone}>
              Call dispatch
            </Button>
          </div>

          <ul className="mt-10 grid gap-x-6 gap-y-3 text-sm text-white/75 sm:grid-cols-2">
            {heroBadges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CircleCheck className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Shipment tracking card */}
        <Reveal delay={150} className="lg:col-span-6">
          <div className="rounded-xl bg-white p-5 text-ink shadow-2xl shadow-black/30 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted">Shipment</p>
                <p className="font-display text-lg font-bold">WX-20481</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                On schedule
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-surface px-4 pt-4">
              <TruckIllustration className="w-full" />
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
              <div>
                <p className="text-xs text-muted">From</p>
                <p className="font-semibold">{first}</p>
              </div>
              <div className="mx-4 h-px flex-1 bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
              <div className="text-right">
                <p className="text-xs text-muted">To</p>
                <p className="font-semibold">{last}</p>
              </div>
            </div>

            <ol className="mt-6 grid grid-cols-4 gap-2 border-t border-line pt-5">
              {timeline.map(({ icon: Icon, label, time, state }) => (
                <li key={label} className="text-center">
                  <span
                    className={`mx-auto grid size-9 place-items-center rounded-full ${
                      state === 'done'
                        ? 'bg-accent text-white'
                        : state === 'active'
                          ? 'bg-brand text-white ring-4 ring-brand-100'
                          : 'bg-surface text-muted'
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className={`mt-2 text-xs font-semibold ${state === 'next' ? 'text-muted' : ''}`}>{label}</p>
                  <p className="mt-0.5 hidden text-[11px] text-muted sm:block">{time}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
