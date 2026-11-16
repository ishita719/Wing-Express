import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { company } from '../../data/site'
import { tel } from '../../lib/utils'

export default function CtaBand() {
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ember-500 via-ember-600 to-wing-700 px-6 py-14 text-white sm:px-14 sm:py-16">
          <svg className="absolute -right-10 -bottom-10 h-64 opacity-15 sm:h-80" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M10 42 C24 40 34 30 42 16 L48 21 C40 35 28 44 12 46 Z" fill="#fff" />
            <path d="M20 50 C32 48 42 41 50 30 L55 35 C47 45 36 52 22 53 Z" fill="#fff" />
          </svg>
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl leading-tight font-bold sm:text-4xl">
                Got freight that needs to move this week?
              </h2>
              <p className="mt-3 text-white/80">
                Book before {company.cutoff} and it rides tomorrow&apos;s run. Standing weekly bookings get locked-in rates.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="#quote" variant="dark" size="lg" icon={ArrowRight}>
                Get a quote
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
