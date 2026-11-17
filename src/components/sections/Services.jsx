import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { services } from '../../data/site'

export default function Services() {
  return (
    <section id="services" className="bg-surface py-20 sm:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow="Our services"
          title="Freight services built around your schedule"
          text="Whether it is one box or a full deck of pallets, Wing Express has a service that fits the load, the timeline and the budget."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="article" delay={(i % 3) * 80} className="h-full">
              <a href="#quote" className="card card-hover group flex h-full flex-col p-7">
                <span className="grid size-12 place-items-center rounded-lg bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Request a rate
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
