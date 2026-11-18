import { ClipboardCheck, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { prepTips, quoteChecklist } from '../../data/site'

export default function PrepTips() {
  return (
    <section id="prepare" className="bg-white py-20 sm:py-28" aria-labelledby="prep-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHeading
            id="prep-title"
            eyebrow="Shipping tips"
            title="Get your shipment road-ready"
            text="A few simple steps help your freight travel safely and keep every pickup on schedule."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {prepTips.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 2) * 100} className="group flex gap-4 rounded-xl border border-line p-5 transition duration-300 hover:border-crimson-100 hover:bg-crimson-50/40">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-charcoal text-crimson-400 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal effect="scale" delay={200} className="lg:col-span-4 lg:pt-28">
          <div className="sticky top-28 rounded-2xl bg-surface p-7 ring-1 ring-line">
            <span className="grid size-12 place-items-center rounded-xl bg-crimson text-white">
              <ClipboardCheck className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl">For a fast quote, have ready:</h3>
            <ul className="mt-5 space-y-3">
              {quoteChecklist.map((item, i) => (
                <Reveal as="li" key={item} delay={300 + i * 90} className="flex gap-3 text-sm text-ink/80">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                  {item}
                </Reveal>
              ))}
            </ul>
            <Button href="#quote" icon={ArrowRight} className="mt-7 w-full">
              Request a quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
