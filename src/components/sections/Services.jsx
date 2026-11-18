import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { services } from '../../data/site'

export default function Services() {
  return (
    <section id="services" className="bg-surface py-20 sm:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow="Our services"
          title="Delivery services built around your business"
          text="Whether it is one box or a full truckload, EagleWing Express has a service that fits the shipment, the timeline and the budget."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} as="article" delay={(i % 3) * 90} className="h-full">
              <SpotlightCard as={Link} to="/contact" className="card card-hover flex h-full flex-col p-7">
                <span className="relative grid size-12 place-items-center rounded-xl bg-charcoal text-crimson-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-crimson group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl">{title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Get a quote
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
