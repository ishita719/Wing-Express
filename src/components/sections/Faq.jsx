import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { company, faqs } from '../../data/site'
import { tel } from '../../lib/utils'

function FaqItem({ q, a, open, onToggle, id }) {
  return (
    <div className={`rounded-lg border bg-white transition-colors ${open ? 'border-brand-100 shadow-card' : 'border-line'}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-6 p-5 text-left font-sans text-base font-semibold sm:p-6"
        >
          {q}
          <ChevronDown
            className={`size-5 shrink-0 text-brand transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:text-[15px]">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  // FAQ structured data for rich results
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <section id="faq" className="bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Frequently asked questions"
            text="Everything shippers usually ask before their first booking."
          />
          <Reveal delay={100} className="mt-6 text-sm text-muted">
            Still have a question?{' '}
            <a href={tel(company.phone)} className="font-semibold text-brand hover:underline">
              Call dispatch
            </a>
          </Reveal>
        </div>
        <Reveal className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} id={`faq-${i}`} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
