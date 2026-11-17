import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { services } from '../../data/site'

export default function Services() {
  return (
    <section id="services" className="dot-grid py-20 sm:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          number="01"
          eyebrow="What we move"
          title={['Freight services', 'built around your schedule']}
          text="Whether it is one box or a full deck of pallets, Wing Express has a service that fits the load, the timeline and the budget."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="article" effect="rise" delay={(i % 3) * 90} className="h-full">
              <a href="#quote" className="plate plate-hover group flex h-full flex-col p-6">
                <div className="mb-8 flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-md border-2 border-ink bg-signal transition-colors duration-200 group-hover:bg-route group-hover:text-white">
                    <Icon className="size-6" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-ink/40">SVC-0{i + 1}</span>
                </div>
                <h3 className="text-3xl leading-none">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{text}</p>
                <span className="label mt-6 inline-flex items-center gap-1.5 border-t-2 border-dashed border-ink/20 pt-4 text-route">
                  Request a rate
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
