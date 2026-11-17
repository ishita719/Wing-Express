import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { fleet } from '../../data/site'

const lengths = { '16 ft': 16, '20 ft': 20, '26 ft': 26 }

/** Ruler showing truck length in feet, 0–26. */
function LengthRuler({ ft, dark }) {
  return (
    <div className="mt-6" aria-hidden="true">
      <div className={`relative h-6 border-2 ${dark ? 'border-paper/70' : 'border-ink'}`}>
        <div className="hazard absolute inset-y-0 left-0 opacity-90" style={{ width: `${(ft / 26) * 100}%` }} />
      </div>
      <div className={`mt-1 flex justify-between font-mono text-[10px] ${dark ? 'text-paper/50' : 'text-ink/50'}`}>
        <span>0</span>
        <span>8</span>
        <span>16</span>
        <span>26 FT</span>
      </div>
    </div>
  )
}

export default function Fleet() {
  return (
    <section id="fleet" className="border-t-2 border-ink bg-paper-2 py-20 sm:py-28" aria-labelledby="fleet-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="fleet-title"
            number="02"
            eyebrow="Our fleet"
            title={['The right truck', 'for every load']}
            text="Three box-truck sizes, each fitted with a power tailgate — so we can deliver to any site, dock or no dock."
          />
          <Reveal effect="rise">
            <Button href="#quote" variant="outline" icon={ArrowRight}>
              Not sure which? Ask us
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {fleet.map((t, i) => {
            const dark = t.featured
            return (
              <Reveal key={t.size} as="article" effect="rise" delay={i * 110}>
                <div
                  className={`plate plate-hover relative flex h-full flex-col p-7 ${dark ? '!bg-asphalt text-paper !shadow-hard-signal' : ''}`}
                >
                  {dark && (
                    <span className="label absolute -top-3.5 left-6 rounded-sm border-2 border-ink bg-signal px-2 py-1 text-ink">
                      Most booked
                    </span>
                  )}
                  <p className="label opacity-60">Unit 0{i + 1} · Box truck</p>
                  <p className={`mt-2 font-display text-8xl leading-none font-black ${dark ? 'text-signal' : ''}`}>{t.size}</p>
                  <LengthRuler ft={lengths[t.size]} dark={dark} />

                  <h3 className="mt-7 text-3xl leading-none">{t.name}</h3>
                  <p className={`mt-2 font-mono text-xs font-bold ${dark ? 'text-signal' : 'text-route'}`}>{t.capacity}</p>
                  <p className={`mt-4 text-sm leading-relaxed ${dark ? 'text-paper/70' : 'text-ink/65'}`}>{t.best}</p>

                  <ul className={`mt-auto space-y-2.5 border-t-2 border-dashed pt-6 ${dark ? 'border-paper/20' : 'border-ink/20'} mt-6`}>
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
                        <span className={`grid size-5 place-items-center rounded-sm ${dark ? 'bg-signal text-ink' : 'bg-route text-white'}`}>
                          <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
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
