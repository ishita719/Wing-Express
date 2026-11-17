import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { process } from '../../data/site'

/** Four steps laid out along a road, each marked by a road-sign plate. */
export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-asphalt py-20 text-paper sm:py-28" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          dark
          number="03"
          eyebrow="How it works"
          title={['Book today.', 'Delivered tomorrow.']}
          text="A simple, dependable rhythm that runs every service day — so you can promise your customers a delivery date with confidence."
        />

        <Reveal effect="wipe" className="relative mt-16">
          {/* the road */}
          <div className="absolute top-[3.25rem] right-0 left-0 hidden h-6 bg-asphalt-3 lg:block" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffc21a_0_28px,transparent_28px_52px)]" />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map(({ icon: Icon, step, title, text }) => (
              <li key={step} className="relative">
                {/* sign plate on a post */}
                <div className="relative z-10 flex items-end gap-3">
                  <div className="grid size-[4.5rem] rotate-45 place-items-center rounded-md border-[3px] border-ink bg-signal shadow-[0_0_0_3px_#ffc21a]">
                    <Icon className="size-7 -rotate-45 text-ink" strokeWidth={2.25} aria-hidden="true" />
                  </div>
                  <span className="font-display text-6xl leading-none font-black text-paper/15">{step}</span>
                </div>
                <h3 className="mt-8 text-3xl leading-none">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/65">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
