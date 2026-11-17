import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { company } from '../../data/site'
import { tel } from '../../lib/utils'

export default function CtaBand() {
  return (
    <section className="bg-paper py-20 sm:py-24" aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal effect="wipe" className="relative overflow-hidden rounded-md border-2 border-ink bg-signal shadow-hard">
          <div className="hazard h-3 border-b-2 border-ink" aria-hidden="true" />
          <div className="flex flex-col items-start justify-between gap-8 px-6 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="label mb-3 text-ink/70">Freight cutoff today · {company.cutoff}</p>
              <h2 id="cta-title" className="text-5xl leading-[0.9] sm:text-6xl">
                Got freight that needs to move this week?
              </h2>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <Button href="#quote" variant="dark" size="lg" icon={ArrowRight}>
                Get a quote
              </Button>
              <Button href={tel(company.phone)} variant="outline" size="lg" iconLeft={Phone}>
                {company.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
