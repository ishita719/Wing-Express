import { ArrowRight, Phone, CircleCheck, Clock, PackageCheck, Navigation } from 'lucide-react'
import Button from '../ui/Button'
import TruckIllustration from '../ui/TruckIllustration'
import { company, heroBadges } from '../../data/site'
import { tel } from '../../lib/utils'

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink-900 pt-32 pb-20 text-white sm:pt-40 lg:pt-44 lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Background layers */}
      <div className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-32 -left-32 -z-10 size-[520px] rounded-full bg-wing-600/30 blur-[120px]" aria-hidden="true" />
      <div className="absolute right-0 bottom-0 -z-10 size-[460px] rounded-full bg-ember-500/20 blur-[120px]" aria-hidden="true" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-4 pl-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="rounded-full bg-ember-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
              Now booking
            </span>
            Daily runs · {company.serviceDays}
          </p>

          <h1 id="hero-title" className="text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Freight that moves like it has <span className="text-gradient">wings.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Scheduled daily freight, full truckloads and tailgate delivery — from a single parcel to a full
            pallet deck. Book by <strong className="font-semibold text-white">{company.cutoff}</strong>, delivered next day.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg" icon={ArrowRight}>
              Get a free quote
            </Button>
            <Button href={tel(company.phone)} size="lg" variant="ghost" iconLeft={Phone}>
              Call dispatch
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-2">
            {heroBadges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CircleCheck className="size-4 shrink-0 text-ember-400" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6 shadow-2xl backdrop-blur sm:p-10">
            <div className="mb-6 flex items-center justify-between text-xs text-white/50">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                Live run · WX-204
              </span>
              <span>Hub → Coast Terminal</span>
            </div>

            <TruckIllustration className="w-full" />

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-white/50">
                <span>Departed 6:00 pm</span>
                <span>ETA 11:30 am</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-wing-500 to-ember-500" />
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -top-6 -left-2 hidden animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink-900 shadow-2xl sm:flex lg:-left-10">
            <span className="grid size-10 place-items-center rounded-xl bg-ember-500/10 text-ember-600">
              <Clock className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] text-ink-900/50">Daily cutoff</span>
              <span className="font-display text-sm font-bold">{company.cutoff}</span>
            </span>
          </div>

          <div className="absolute -right-2 -bottom-8 hidden animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink-900 shadow-2xl [animation-delay:1.5s] sm:flex lg:-right-6">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <PackageCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] text-ink-900/50">Delivered · photo POD</span>
              <span className="font-display text-sm font-bold">Signed 10:42 am</span>
            </span>
          </div>

          <div className="absolute top-1/2 -right-4 hidden size-14 animate-float place-items-center rounded-full bg-wing-600 shadow-xl shadow-wing-600/40 [animation-delay:.8s] xl:grid">
            <Navigation className="size-6 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
