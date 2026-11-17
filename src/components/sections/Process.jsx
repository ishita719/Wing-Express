import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { process } from '../../data/site'

export default function Process() {
  return (
    <section id="process" className="bg-surface py-20 sm:py-28" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          align="center"
          eyebrow="How it works"
          title="Book today. Delivered tomorrow."
          text="A simple, dependable rhythm that runs every service day — so you can promise your customers a delivery date with confidence."
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-[2.25rem] right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r from-brand via-brand-100 to-accent lg:block" aria-hidden="true" />
          {process.map(({ icon: Icon, step, title, text }, i) => (
            <Reveal as="li" key={step} delay={i * 100} className="relative text-center">
              <div className="relative mx-auto grid size-[4.5rem] place-items-center rounded-full border-4 border-surface bg-white text-brand shadow-card">
                <Icon className="size-7" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
