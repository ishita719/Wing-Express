import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { fleet } from '../../data/site'

const lengths = { '16 ft': 'w-[55%]', '20 ft': 'w-[72%]', '26 ft': 'w-[95%]' }

export default function Fleet() {
  return (
    <section id="fleet" className="py-20 sm:py-28" aria-labelledby="fleet-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="fleet-title"
            align="left"
            eyebrow="Our fleet"
            title="The right truck for every size of load"
            text="Three box-truck sizes, each fitted with a power tailgate, so we can deliver to any site — dock or no dock."
          />
          <Reveal>
            <Button href="#quote" variant="outline" icon={ArrowRight}>
              Not sure which? Ask us
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {fleet.map((t, i) => {
            const dark = t.featured
            return (
              <Reveal
                key={t.size}
                as="article"
                delay={i * 100}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                  dark
                    ? 'bg-ink-900 text-white shadow-2xl shadow-ink-900/30 lg:-my-4 lg:py-12'
                    : 'border border-ink-900/10 bg-white hover:shadow-xl'
                }`}
              >
                {dark && (
                  <span className="absolute -top-3 left-8 rounded-full bg-ember-500 px-3 py-1 text-xs font-bold text-white">
                    Most booked
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <p className={`font-display text-5xl font-extrabold ${dark ? 'text-gradient' : 'text-ink-900'}`}>{t.size}</p>
                  <p className={`text-xs font-semibold tracking-widest uppercase ${dark ? 'text-white/50' : 'text-ink-900/40'}`}>
                    Box truck
                  </p>
                </div>

                {/* relative-length bar */}
                <div className={`mt-6 h-3 rounded-full ${dark ? 'bg-white/10' : 'bg-ink-900/5'}`} aria-hidden="true">
                  <div className={`h-full rounded-full bg-gradient-to-r from-wing-500 to-ember-500 ${lengths[t.size]}`} />
                </div>

                <h3 className="mt-7 text-2xl font-bold">{t.name}</h3>
                <p className={`mt-1 text-sm font-medium ${dark ? 'text-ember-300' : 'text-wing-600'}`}>{t.capacity}</p>
                <p className={`mt-4 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-ink-900/60'}`}>{t.best}</p>

                <ul className="mt-6 space-y-2.5 border-t border-current/10 pt-6">
                  {t.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${dark ? 'text-white/80' : 'text-ink-900/75'}`}>
                      <span className={`grid size-5 place-items-center rounded-full ${dark ? 'bg-ember-500' : 'bg-ink-900'} text-white`}>
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
