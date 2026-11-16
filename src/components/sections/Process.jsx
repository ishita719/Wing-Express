import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { process } from '../../data/site'

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ink-900 py-20 text-white sm:py-28" aria-labelledby="process-title">
      <div className="absolute top-0 left-1/2 -z-0 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wing-600/20 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          id="process-title"
          dark
          eyebrow="How it works"
          title="Book today. Delivered tomorrow."
          text="A simple, dependable rhythm that runs every service day — so you can promise your customers a delivery date with confidence."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connector line (desktop) */}
          <div className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-wing-500/0 via-white/25 to-ember-500/0 lg:block" aria-hidden="true" />

          {process.map(({ icon: Icon, step, title, text }, i) => (
            <Reveal as="li" key={step} delay={i * 120} className="relative text-center">
              <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-wing-500 to-wing-700 shadow-lg shadow-wing-600/30">
                <Icon className="size-7" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-ember-500 font-display text-[11px] font-bold ring-4 ring-ink-900">
                  {step}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
