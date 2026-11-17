import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { features, industries } from '../../data/site'

export default function WhyUs() {
  return (
    <section id="why" className="bg-surface py-20 sm:py-28" aria-labelledby="why-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why EagleWing"
            title="A carrier you can count on"
            text="Built for businesses that cannot afford a missed delivery. Clear communication, careful handling and trucks that leave on time — every time."
          />
          <Reveal delay={120} className="mt-10">
            <p className="mb-4 text-sm font-semibold text-ink">Industries we serve</p>
            <ul className="flex flex-wrap gap-2">
              {industries.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm text-ink/80">
                  <Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="article" delay={(i % 2) * 90} className="card card-hover group p-6">
              <span className="grid size-11 place-items-center rounded-lg bg-crimson-50 text-crimson-dark transition-colors duration-300 group-hover:bg-charcoal group-hover:text-crimson-400">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
