import { useEffect, useState } from 'react'
import { ArrowRight, Phone, CircleCheck, Check, Truck, PackageCheck, ClipboardList } from 'lucide-react'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import Reveal from '../ui/Reveal'
import { TruckOnRoad } from '../ui/RealTruck'
import { company, heroBadges, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

const steps = [
  { icon: ClipboardList, label: 'Booked' },
  { icon: Check, label: 'Picked up' },
  { icon: Truck, label: 'In transit' },
  { icon: PackageCheck, label: 'Delivered' },
]

/** Cycles through the shipment steps to make the demo card feel live. */
function useCycle(length, ms) {
  const [i, setI] = useState(2)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms])
  return i
}

export default function Hero() {
  const stops = coverage.mainLine
  const step = useCycle(steps.length, 2200)

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-br from-charcoal-950 via-charcoal to-charcoal-3 pt-36 pb-24 text-white lg:flex lg:min-h-svh lg:items-center lg:pt-32 lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Ambient background */}
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 -z-10 size-[560px] animate-drift rounded-full bg-brand/40 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-[-180px] -z-10 size-[520px] animate-drift-slow rounded-full bg-crimson/20 blur-[120px]" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur">
            <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
            Booking now · Deliveries 7 days a week
          </p>

          {/* Headline shows instantly (no fade) so the first screen is never blank; only the underline animates */}
          <Reveal effect="none">
            <h1 id="hero-title" className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.4rem]">
              Daily Island freight &amp;{' '}
              <span className="relative whitespace-nowrap text-crimson-400">
                tailgate delivery
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9 C80 2 200 2 298 7" fill="none" stroke="#d7263d" strokeWidth="3" strokeLinecap="round" pathLength="1000" className="draw-path" />
                </svg>
              </span>
            </h1>
          </Reveal>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
            Victoria to Campbell River and Port Alberni, plus a daily run to the Lower Mainland via Duke Point –
            Tsawwassen. 3 and 5 ton trucks with tailgate lifts — no dock needed — for businesses and homes.
          </p>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Button href="/contact" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                  Get a free quote
                </Button>
              </Magnetic>
              <Button href={tel(company.phone)} size="lg" variant="ghost" iconLeft={Phone}>
                {company.phone}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-10 grid gap-x-6 gap-y-3 text-sm text-white/75 sm:grid-cols-2">
              {heroBadges.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CircleCheck className="size-4 shrink-0 text-crimson-400" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Illustration of how a run works — clearly labelled, not live tracking (review C5) */}
        <Reveal effect="scale" delay={250} className="lg:col-span-6">
          <div className="relative rounded-2xl bg-white p-5 text-ink shadow-2xl shadow-black/40 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted">Illustration · not live tracking</p>
                <p className="font-display text-lg font-bold">How a run works</p>
              </div>
              <span
                key={step}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  step === 3 ? 'bg-accent-50 text-accent-dark' : 'bg-crimson-50 text-crimson-dark'
                }`}
              >
                <span className={`size-1.5 rounded-full ${step === 3 ? 'bg-accent' : 'bg-crimson-dark'}`} aria-hidden="true" />
                {steps[step].label}
              </span>
            </div>

            {/* the truck drives across the road on a loop */}
            <div className="mt-5 overflow-hidden rounded-xl pb-4">
              <TruckOnRoad />
            </div>

            {/* Route track with moving marker */}
            <div className="mt-6">
              <div className="relative mx-2 h-1.5 rounded-full bg-line">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand via-crimson to-accent opacity-80" />
                {stops.map((s, i) => (
                  <span
                    key={s}
                    className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-charcoal"
                    style={{ left: `${(i / (stops.length - 1)) * 100}%` }}
                    title={s}
                  />
                ))}
                <span className="absolute top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 animate-route place-items-center rounded-full bg-crimson text-white shadow-lg ring-4 ring-white">
                  <Truck className="size-3.5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-3 flex justify-between text-xs">
                <span className="font-semibold">{stops[0]}</span>
                <span className="text-muted">{stops.length - 2} stops</span>
                <span className="font-semibold">{stops.at(-1)}</span>
              </div>
            </div>

            <ol className="mt-6 grid grid-cols-4 gap-2 border-t border-line pt-5">
              {steps.map(({ icon: Icon, label }, i) => {
                const done = i < step
                const active = i === step
                return (
                  <li key={label} className="text-center">
                    <span
                      className={`mx-auto grid size-9 place-items-center rounded-full transition-all duration-500 ${
                        active
                          ? 'scale-110 bg-charcoal text-crimson-400 ring-4 ring-crimson-100'
                          : done
                            ? 'bg-accent text-white'
                            : 'bg-surface text-muted'
                      }`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <p className={`mt-2 text-xs font-semibold transition-colors ${active || done ? '' : 'text-muted'}`}>{label}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
