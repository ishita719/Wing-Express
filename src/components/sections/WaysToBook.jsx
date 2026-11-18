import { Link } from 'react-router-dom'
import { PhoneCall, Mail, FileText, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import SpotlightCard from '../ui/SpotlightCard'
import { company } from '../../data/site'
import { tel } from '../../lib/utils'

/** Three ways to book, each a tilting card that links straight to the action. */
export default function WaysToBook() {
  const ways = [
    { icon: PhoneCall, title: 'Call dispatch', text: `Speak with our team directly, ${company.hoursShort}.`, cta: company.phone, href: tel(company.phone) },
    { icon: Mail, title: 'Send an email', text: 'Send your shipment details any time — we reply during business hours.', cta: company.email, href: `mailto:${company.email}` },
    { icon: FileText, title: 'Request a quote online', text: 'Fill in the quote form with your pickup, delivery and freight details.', cta: 'Open the quote form', to: '/contact' },
  ]
  return (
    <section className="bg-surface py-20 sm:py-28" aria-labelledby="book-title">
      <div className="container-x">
        <SectionHeading id="book-title" align="center" eyebrow="Book a delivery" title="Three easy ways to book" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ways.map(({ icon: Icon, title, text, cta, href, to }, i) => (
            <Reveal key={title} delay={i * 110} className="h-full">
              <SpotlightCard
                as={to ? Link : 'a'}
                {...(to ? { to } : { href })}
                className="card card-hover flex h-full flex-col p-7"
              >
                <span className="relative grid size-14 place-items-center rounded-2xl bg-charcoal text-crimson-400 transition duration-300 group-hover:bg-crimson group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl">{title}</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold break-all text-crimson-700">
                  {cta}
                  <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
