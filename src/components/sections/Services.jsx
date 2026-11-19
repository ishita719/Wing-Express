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
          title="Tailgate delivery, daily Island runs and the mainland"
          text="Our 3 and 5 ton tailgate trucks run daily across the Island and to the Lower Mainland — from one box to a full load, for businesses and homes."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text, highlight }, i) => (
            <Reveal key={title} as="article" delay={(i % 4) * 80} className="h-full">
              <SpotlightCard
                as={Link}
                to="/contact"
                className={`card card-hover flex h-full flex-col p-7 ${highlight ? '!border-crimson/40 ring-1 ring-crimson/20' : ''}`}
              >
                {highlight && (
                  <span className="absolute top-5 right-5 rounded-full bg-crimson px-2.5 py-1 text-[11px] font-bold text-white">
                    {i === 0 ? 'Our specialty' : 'Every day'}
                  </span>
                )}
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
