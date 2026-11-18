import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import BrandMark from '../ui/BrandMark'
import { about, company } from '../../data/site'

/** Highway shield in the BC-route style (simplified, original drawing). */
function HighwayShield({ code }) {
  return (
    <span className="relative grid h-12 w-11 shrink-0 place-items-center" aria-hidden="true">
      <svg viewBox="0 0 44 48" className="absolute inset-0 h-full w-full">
        <path d="M4 4 H40 V28 C40 38 30 44 22 46 C14 44 4 38 4 28 Z" fill="#1b1f27" stroke="#d7263d" strokeWidth="2.5" />
      </svg>
      <span className="relative -mt-1 font-display text-base font-extrabold text-white">{code}</span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="about-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading id="about-title" eyebrow={`About ${company.name}`} title={about.title} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {about.paragraphs.map((t, i) => (
              <Reveal as="p" key={i} delay={150 + i * 120}>
                {t}
              </Reveal>
            ))}
          </div>

          <Reveal delay={450} className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {about.facts.map((f) => (
              <div key={f.label}>
                <p className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{f.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{f.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Highways card */}
        <Reveal effect="scale" delay={150} className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl bg-charcoal p-7 text-white shadow-2xl shadow-charcoal/25 sm:p-9">
            <BrandMark variant="light" className="absolute -right-8 -bottom-2 h-auto w-64 opacity-[0.06]" />
            <p className="eyebrow text-crimson-400">The roads we run</p>
            <p className="mt-2 font-display text-2xl font-bold">Vancouver Island, British Columbia, Canada</p>

            <ol className="relative mt-8 space-y-6">
              <span className="absolute top-6 bottom-6 left-[21px] w-0.5 bg-white/10" aria-hidden="true" />
              {about.highways.map((h, i) => (
                <Reveal as="li" key={h.code} delay={300 + i * 150} className="relative flex items-center gap-4">
                  <HighwayShield code={h.code} />
                  <div>
                    <p className="font-semibold">
                      Highway {h.code} · <span className="text-white/70">{h.name}</span>
                    </p>
                    <p className="mt-0.5 text-sm text-white/55">{h.span}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/70">
              Dispatch: <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} className="font-semibold text-white hover:text-crimson-400">{company.phone}</a> ·{' '}
              {company.hoursShort}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
