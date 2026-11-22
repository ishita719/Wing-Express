import { Check, ArrowDownToLine } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TruckIllustration from '../ui/TruckIllustration'
import { fleet } from '../../data/site'

/** Our fleet — 7 trucks, 3 ton and 5 ton, with tailgate lifts (client-confirmed). */
export default function FleetBlock() {
  return (
    <section id="fleet" className="overflow-x-clip bg-white py-20 sm:py-28" aria-labelledby="fleet-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="fleet-title" eyebrow="Our fleet" title={`${fleet.total} tailgate trucks on the Island`} text={fleet.intro} />
          <Reveal delay={300} className="mt-8 inline-flex items-center gap-3 rounded-xl bg-crimson-50 px-4 py-3 text-sm text-ink">
            <ArrowDownToLine className="size-5 shrink-0 text-crimson" aria-hidden="true" />
            Our 3 and 5 ton trucks carry tailgate lifts — no loading dock or forklift needed.
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal effect="scale" className="overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50 to-surface pt-6">
            <div className="truck-travel relative z-10 px-6" style={{ animationDuration: '11s' }}>
              <TruckIllustration className="w-full" spinning bounce />
            </div>
            <div className="relative h-6 bg-charcoal" style={{ marginTop: '-1.75%' }}>
              <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson" />
              <div className="road-dash absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2" style={{ animation: 'none' }} />
            </div>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fleet.types.map((t, i) => (
              <Reveal key={t.name} effect={i === 0 ? 'left' : 'right'} delay={150} className="card p-6">
                <h3 className="text-xl">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink/85">
                      <span className="grid size-5 place-items-center rounded-full bg-accent text-white">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
