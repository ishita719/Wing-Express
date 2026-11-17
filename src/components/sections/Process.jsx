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
          title="Shipping with us is simple"
          text="Four easy steps from your first call to a confirmed delivery."
        />

        <Reveal effect="none" as="ol" className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connector that grows across when the steps scroll into view */}
          <div className="absolute top-[2.25rem] right-[12.5%] left-[12.5%] hidden h-0.5 bg-line lg:block" aria-hidden="true">
            <div className="grow-x h-full bg-gradient-to-r from-navy via-amber to-accent" />
          </div>
          {process.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={150 + i * 180} className="group relative text-center">
              <div className="relative mx-auto grid size-[4.5rem] place-items-center rounded-full border-4 border-surface bg-white text-navy shadow-card transition-all duration-300 group-hover:bg-navy group-hover:text-amber">
                <Icon className="size-7" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-amber text-[11px] font-bold text-navy">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
