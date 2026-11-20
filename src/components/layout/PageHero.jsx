import { Link } from 'react-router-dom'
import { ChevronRight, Truck } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SplitWords from '../ui/SplitWords'
import BrandMark from '../ui/BrandMark'

/**
 * Animated banner at the top of every inner page.
 * Title rises word by word; on the right the EagleWing wings mark opens inside
 * a slowly turning dashed ring with the page's icon floating beside it;
 * along the bottom a small truck drives across a road.
 */
export default function PageHero({ eyebrow, title, text, icon: Icon, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-charcoal-950 via-charcoal to-charcoal-3 pt-36 pb-28 text-white lg:pt-44 lg:pb-32">
      {/* ambient */}
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 -z-10 size-[520px] animate-drift rounded-full bg-brand/35 blur-[120px]" aria-hidden="true" />
      <div className="absolute -right-24 -bottom-40 -z-10 size-[460px] animate-drift-slow rounded-full bg-crimson/20 blur-[120px]" aria-hidden="true" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal effect="none" className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-white/55">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-white/85">{eyebrow}</span>
          </nav>
          <p className="eyebrow mb-4 inline-flex items-center gap-2.5 text-crimson-400">
            <span className="grow-x h-0.5 w-7 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.4rem]">
            <SplitWords text={title} delay={150} step={70} />
          </h1>
          {text && (
            <Reveal as="p" delay={450} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {text}
            </Reveal>
          )}
          {children && (
            <Reveal delay={600} className="mt-8">
              {children}
            </Reveal>
          )}
        </Reveal>

        {/* emblem */}
        <Reveal effect="scale" delay={250} className="relative hidden justify-self-center lg:col-span-5 lg:block">
          <div className="relative grid size-80 place-items-center">
            <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" strokeDasharray="4 10" />
              <circle cx="100" cy="4" r="4" fill="#d7263d" />
            </svg>
            <div className="absolute inset-10 rounded-full bg-white/[0.04] ring-1 ring-white/10" aria-hidden="true" />
            <BrandMark variant="light" animate fly className="relative h-auto w-56" />
            {Icon && (
              <span className="absolute right-4 bottom-10 grid size-16 animate-float place-items-center rounded-2xl bg-crimson text-white shadow-xl shadow-crimson/30">
                <Icon className="size-7" aria-hidden="true" />
              </span>
            )}
          </div>
        </Reveal>
      </div>

      {/* road with a truck driving across */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-charcoal-950/80" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson/70" />
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.5)_0_28px,transparent_28px_56px)]" />
        <span className="drive-across absolute top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md bg-crimson text-white shadow-lg">
          <Truck className="size-4" />
        </span>
      </div>
    </section>
  )
}
