import { Check, X, ReceiptText, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { weDeliver, notAccepted, pricing, company } from '../../data/site'
import { tel } from '../../lib/utils'

/** What we deliver, what we can't accept, and how pricing works. */
export default function DeliveryScope() {
  return (
    <section id="scope" className="bg-surface py-20 sm:py-28" aria-labelledby="scope-title">
      <div className="container-x">
        <SectionHeading
          id="scope-title"
          align="center"
          eyebrow="Before you book"
          title="What we carry, and what we can't"
          text="A quick guide to the freight we handle. If your item is not listed, ask dispatch — we will tell you straight away."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* we deliver */}
          <Reveal effect="left" className="card p-7">
            <p className="eyebrow text-accent">We deliver</p>
            <ul className="mt-5 space-y-3">
              {weDeliver.map((item, i) => (
                <Reveal as="li" key={item} delay={150 + i * 70} className="flex items-start gap-3 text-sm text-ink/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* not accepted */}
          <Reveal className="card p-7">
            <p className="eyebrow text-crimson-700">We can't accept</p>
            <ul className="mt-5 space-y-3">
              {notAccepted.map((item, i) => (
                <Reveal as="li" key={item} delay={150 + i * 70} className="flex items-start gap-3 text-sm text-ink/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-crimson text-white">
                    <X className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* pricing */}
          <Reveal effect="right" className="relative overflow-hidden rounded-xl bg-charcoal p-7 text-white">
            <span className="grid size-12 place-items-center rounded-xl bg-crimson">
              <ReceiptText className="size-6" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-6 text-crimson-400">Pricing</p>
            <h3 className="mt-2 text-2xl">{pricing.model}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{pricing.text}</p>
            <div className="mt-7 flex flex-col gap-3">
              <Button href="/contact" icon={ArrowRight}>
                Get a free quote
              </Button>
              <Button href={tel(company.phone)} variant="ghost">
                Call {company.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
