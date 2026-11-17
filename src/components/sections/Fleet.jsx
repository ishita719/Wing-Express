import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { fleet } from '../../data/site'

const lengths = { '16 ft': 16, '20 ft': 20, '26 ft': 26 }

export default function Fleet() {
  return (
    <section id="fleet" className="bg-white py-20 sm:py-28" aria-labelledby="fleet-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="fleet-title"
            eyebrow="Our fleet"
            title="The right truck for every size of load"
            text="Three box-truck sizes, each fitted with a power tailgate — so we can deliver to any site, dock or no dock."
          />
          <Reveal>
            <Button href="#quote" variant="outline" icon={ArrowRight}>
              Not sure which? Ask us
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {fleet.map((t, i) => {
            const featured = t.featured
            return (
              <Reveal key={t.size} as="article" delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-xl p-8 transition duration-300 hover:-translate-y-1 ${
                    featured ? 'bg-navy text-white shadow-xl shadow-navy/20' : 'card card-hover'
                  }`}
                >
                  {featured && (
                    <span className="absolute top-6 right-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                      Most booked
                    </span>
                  )}
                  <p className={`text-sm font-medium ${featured ? 'text-white/60' : 'text-muted'}`}>Box truck</p>
                  <p className={`mt-1 font-display text-5xl font-extrabold ${featured ? '' : 'text-ink'}`}>{t.size}</p>

                  <div className={`mt-5 h-2 rounded-full ${featured ? 'bg-white/10' : 'bg-surface'}`} aria-hidden="true">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                      style={{ width: `${(lengths[t.size] / 26) * 100}%` }}
                    />
                  </div>

                  <h3 className="mt-7 text-xl">{t.name}</h3>
                  <p className={`mt-1 text-sm font-semibold ${featured ? 'text-brand-100' : 'text-brand'}`}>{t.capacity}</p>
                  <p className={`mt-4 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-muted'}`}>{t.best}</p>

                  <ul className={`mt-6 space-y-2.5 border-t pt-6 ${featured ? 'border-white/10' : 'border-line'}`}>
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${featured ? 'text-white/85' : 'text-ink/80'}`}>
                        <span className="grid size-5 place-items-center rounded-full bg-accent text-white">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
