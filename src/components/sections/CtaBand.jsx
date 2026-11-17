import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import BrandMark from '../ui/BrandMark'
import { company } from '../../data/site'
import { tel } from '../../lib/utils'

export default function CtaBand() {
  return (
    <section className="bg-white pb-20 sm:pb-28" aria-labelledby="cta-title">
      <div className="container-x">
        <Reveal effect="scale" className="relative overflow-hidden rounded-2xl bg-amber px-6 py-14 text-navy sm:px-14">
          <BrandMark variant="plain" className="absolute -top-10 -right-6 size-64 rotate-6 opacity-10" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl leading-tight sm:text-4xl">
                Have freight to move on the Island?
              </h2>
              <p className="mt-3 text-navy/80">
                Call {company.phone} or request a quote online — we are open {company.hoursShort}.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="#quote" variant="navy" size="lg" icon={ArrowRight}>
                Get a free quote
              </Button>
              <Button href={tel(company.phone)} variant="white" size="lg" iconLeft={Phone}>
                Call now
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
