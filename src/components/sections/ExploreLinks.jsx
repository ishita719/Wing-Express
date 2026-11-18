import { Link } from 'react-router-dom'
import { Info, Truck, Route, MapPinned, CircleHelp, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

const pages = [
  { to: '/about', icon: Info, title: 'About us', text: 'Who we are and the Island roads we run.' },
  { to: '/services', icon: Truck, title: 'Services', text: 'Scheduled runs, express, pallets and full loads.' },
  { to: '/how-it-works', icon: Route, title: 'How it works', text: 'From your first call to a confirmed delivery.' },
  { to: '/coverage', icon: MapPinned, title: 'Coverage', text: 'Eight communities, Victoria to Campbell River.' },
  { to: '/faq', icon: CircleHelp, title: 'FAQ', text: 'Straight answers before your first booking.' },
]

/** Home-page directory of the inner pages; each tile fills crimson from the bottom on hover. */
export default function ExploreLinks() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="explore-title">
      <div className="container-x">
        <SectionHeading id="explore-title" align="center" eyebrow="Explore" title="Everything about EagleWing Express" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pages.map(({ to, icon: Icon, title, text }, i) => (
            <Reveal key={to} delay={i * 80} className="h-full">
              <Link
                to={to}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-crimson hover:shadow-card-hover"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-crimson transition-transform duration-500 ease-out group-hover:scale-y-100" aria-hidden="true" />
                <Icon className="relative size-7 text-crimson transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                <h3 className="relative mt-5 text-lg transition-colors duration-300 group-hover:text-white">{title}</h3>
                <p className="relative mt-1.5 flex-1 text-sm text-muted transition-colors duration-300 group-hover:text-white/85">{text}</p>
                <ArrowRight className="relative mt-5 size-5 text-ink/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
