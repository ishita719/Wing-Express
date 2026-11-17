import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { features, industries } from '../../data/site'

export default function WhyUs() {
  return (
    <section id="why" className="border-t-2 border-ink bg-paper-2 py-20 sm:py-28" aria-labelledby="why-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading
            id="why-title"
            number="05"
            eyebrow="Why Wing Express"
            title={['A carrier you', 'can count on']}
            text="Built for businesses that cannot afford a missed delivery. Clear communication, careful handling and trucks that leave on time — every time."
          />
          <Reveal effect="rise" delay={150} className="mt-10">
            <p className="label mb-4 text-ink/60">Industries we serve</p>
            <ul className="flex flex-wrap gap-2">
              {industries.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-sm border-2 border-ink bg-white px-3 py-2 text-sm font-semibold transition hover:bg-signal">
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Checklist styled like an inspection sheet */}
        <Reveal effect="wipe" className="plate lg:col-span-7">
          <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3">
            <span className="label text-signal">Carrier checklist</span>
            <span className="label text-paper/60">{features.length}/{features.length} passed</span>
          </div>
          <ul>
            {features.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b-2 border-dashed border-ink/15 p-5 transition-colors last:border-b-0 hover:bg-signal/25 sm:p-6"
              >
                <span className="grid size-11 place-items-center rounded-md border-2 border-ink bg-paper transition-colors group-hover:bg-signal">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl leading-none">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{text}</p>
                </div>
                <span className="label rounded-sm bg-route px-2 py-1 text-white">0{i + 1} ✓</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
