import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { services } from '../../data/site'

export default function Services() {
  return (
    <section id="services" className="bg-mist py-20 sm:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="What we move"
          title="Freight services built around your schedule"
          text="Whether it is one box or a full deck of pallets, Wing Express has a service that fits the load, the timeline and the budget."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              as="article"
              delay={(i % 3) * 90}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-wing-600/10"
            >
              <div className="absolute -top-16 -right-16 size-40 rounded-full bg-wing-500/0 transition-all duration-500 group-hover:bg-wing-500/10" aria-hidden="true" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-ink-900 text-white transition-colors duration-500 group-hover:bg-ember-500">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold text-ink-900/15">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-900/60">{text}</p>
                <a
                  href="#quote"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-wing-600 transition group-hover:gap-2.5 hover:text-ember-600"
                >
                  Request a rate <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> for {title}</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
