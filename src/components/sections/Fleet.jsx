import { Check, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { shipmentSizes } from '../../data/site'

/** "What we carry" — shipment sizes from parcels to full loads. */
export default function Fleet() {
  return (
    <section id="shipments" className="bg-white py-20 sm:py-28" aria-labelledby="shipments-title">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="shipments-title"
            eyebrow="What we carry"
            title="From a single parcel to a full truckload"
            text="Tell us what you are shipping and we will match it to the right run and the right price."
          />
          <Reveal>
            <Button href="#quote" variant="outline" icon={ArrowRight}>
              Not sure? Ask us
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {shipmentSizes.map(({ icon: Icon, name, text, examples, featured }, i) => (
            <Reveal key={name} as="article" delay={i * 100}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition duration-300 hover:-translate-y-1 ${
                  featured ? 'bg-navy text-white shadow-xl shadow-navy/25' : 'card card-hover'
                }`}
              >
                {featured && (
                  <span className="absolute top-6 right-6 rounded-full bg-amber px-3 py-1 text-xs font-bold text-navy">Most popular</span>
                )}
                <span
                  className={`grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 ${
                    featured ? 'bg-amber text-navy' : 'bg-brand-50 text-brand'
                  }`}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-2xl">{name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-muted'}`}>{text}</p>
                <ul className={`mt-6 space-y-2.5 border-t pt-6 ${featured ? 'border-white/10' : 'border-line'}`}>
                  {examples.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${featured ? 'text-white/85' : 'text-ink/80'}`}>
                      <span className={`grid size-5 place-items-center rounded-full ${featured ? 'bg-amber text-navy' : 'bg-accent text-white'}`}>
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
