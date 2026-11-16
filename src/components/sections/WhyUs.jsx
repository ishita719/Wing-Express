import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { features, industries } from '../../data/site'

export default function WhyUs() {
  return (
    <section id="why" className="bg-mist py-20 sm:py-28" aria-labelledby="why-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading
            id="why-title"
            align="left"
            eyebrow="Why Wing Express"
            title="A carrier you can actually count on"
            text="We are built for businesses that cannot afford a missed delivery. Clear communication, careful handling and trucks that leave on time — every time."
          />
          <Reveal delay={150} className="mt-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-900/50 uppercase">Industries we serve</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industries.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 rounded-2xl bg-white p-3 text-sm font-medium shadow-sm">
                  <Icon className="size-4 shrink-0 text-wing-600" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              as="article"
              delay={(i % 2) * 100}
              className={`group rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                i % 2 === 1 ? 'sm:mt-8 sm:-mb-8' : ''
              }`}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-ember-500/10 text-ember-600 transition-colors duration-500 group-hover:bg-ember-500 group-hover:text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
