import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { company } from '../../data/site'
import { tel } from '../../lib/utils'

export default function CtaBand() {
  return (
    <section className="bg-white pb-20 sm:pb-28" aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-white sm:px-14">
          <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl leading-tight sm:text-4xl">
                Have freight that needs to move this week?
              </h2>
              <p className="mt-3 text-white/80">
                Book before {company.cutoff} and it rides tomorrow's run. Standing weekly bookings get locked-in rates.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="#quote" variant="white" size="lg" icon={ArrowRight}>
                Request a quote
              </Button>
              <Button href={tel(company.phone)} variant="ghost" size="lg" iconLeft={Phone}>
                {company.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
