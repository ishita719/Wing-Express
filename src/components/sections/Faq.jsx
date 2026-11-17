import { useState } from 'react'
import { Plus } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { faqs } from '../../data/site'

function FaqItem({ q, a, open, onToggle, id }) {
  return (
    <div className={`rounded-md border-2 transition-colors ${open ? 'border-ink bg-white shadow-hard-sm' : 'border-ink/25 bg-white'}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-6 p-5 text-left font-display text-xl font-extrabold uppercase sm:p-6 sm:text-2xl"
        >
          {q}
          <span className={`grid size-9 shrink-0 place-items-center rounded-md transition-all duration-300 ${open ? 'rotate-45 border-2 border-ink bg-signal text-ink' : 'border-2 border-ink/20'}`}>
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-sm leading-relaxed text-ink/70 sm:px-6 sm:text-base">{a}</p>
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
    <section id="faq" className="py-20 sm:py-28" aria-labelledby="faq-title">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            align="left"
            number="07"
            eyebrow="FAQ"
            title="Straight answers"
            text="Everything shippers usually ask before their first booking. Still curious? Dispatch is a phone call away."
          />
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
