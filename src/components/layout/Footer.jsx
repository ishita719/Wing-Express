import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { company, navLinks, services, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

function Col({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-[0.15em] text-white uppercase">{title}</h3>
      {children}
    </div>
  )
}

const linkCls = 'text-sm text-white/55 transition hover:text-ember-300'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="pointer-events-none absolute -top-40 right-0 size-[500px] rounded-full bg-wing-600/10 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{company.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/60">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            Dispatch open {company.serviceDays}
          </p>
        </div>

        <div className="lg:col-span-2">
          <Col title="Company">
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className={linkCls}>
                  Get a quote
                </a>
              </li>
            </ul>
          </Col>
        </div>

        <div className="lg:col-span-3">
          <Col title="Services">
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services" className={linkCls}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </div>

        <div className="lg:col-span-3">
          <Col title="Contact">
            <ul className="space-y-4 text-sm text-white/55">
              <li>
                <a href={tel(company.phone)} className="flex items-start gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-ember-400" aria-hidden="true" />
                  <span>
                    Dispatch: {company.phone}
                    <br />
                    Alt: {company.phoneAlt}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 transition hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-ember-400" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ember-400" aria-hidden="true" />
                <address className="not-italic">{company.address}</address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-ember-400" aria-hidden="true" />
                {company.hours}
              </li>
            </ul>
          </Col>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} {company.legalName} All rights reserved.
          </p>
          <p>Serving {coverage.stops.length} stops and {coverage.pickups.length} pickup regions</p>
        </div>
      </div>
    </footer>
  )
}
