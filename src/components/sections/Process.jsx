import { useRef } from 'react'
import { Truck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import useScrollProgress from '../../hooks/useScrollProgress'
import { process } from '../../data/site'

/**
 * Four steps joined by a road. As you scroll, a truck drives along the road
 * and each step lights up when the truck reaches it.
 */
export default function Process() {
  const ref = useRef(null)
  const p = useScrollProgress(ref, { from: 0.85, to: 0.3 })
  const last = process.length - 1

  return (
    <section id="process" className="bg-surface py-20 sm:py-28" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          align="center"
          eyebrow="How it works"
          title="Shipping with us is simple"
          text="Four easy steps from your first call to a confirmed delivery."
        />

        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* road + scroll-driven truck (desktop) */}
          <li className="pointer-events-none absolute top-[2.25rem] right-[12.5%] left-[12.5%] hidden h-1 -translate-y-1/2 rounded-full bg-line lg:block" aria-hidden="true">
            <div className="h-full origin-left rounded-full bg-gradient-to-r from-charcoal via-crimson to-accent" style={{ transform: `scaleX(${p})` }} />
            <div
              className="absolute top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crimson text-white shadow-lg ring-4 ring-surface"
              style={{ left: `${p * 100}%` }}
            >
              <Truck className="size-4" />
            </div>
          </li>

          {process.map(({ icon: Icon, title, text }, i) => {
            const on = p >= i / last - 0.02
            return (
              <Reveal as="li" key={title} delay={i * 120} className="relative text-center">
                <div
                  className={`relative mx-auto grid size-[4.5rem] place-items-center rounded-full border-4 border-surface shadow-card transition-all duration-500 ${
                    on ? 'scale-105 bg-charcoal text-crimson-400' : 'bg-white text-charcoal/60'
                  }`}
                >
                  <Icon className="size-7" aria-hidden="true" />
                  <span
                    className={`absolute -top-1 -right-1 grid size-6 place-items-center rounded-full text-[11px] font-bold transition-colors duration-500 ${
                      on ? 'bg-crimson text-white' : 'bg-line text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className={`mt-6 text-lg transition-colors duration-500 ${on ? 'text-ink' : 'text-ink/60'}`}>{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
