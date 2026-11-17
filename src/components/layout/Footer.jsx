import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { company, navLinks, services, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

function Col({ title, children }) {
  return (
    <div>
      <h3 className="label mb-5 font-sans text-signal">{title}</h3>
      {children}
    </div>
  )
}

const linkCls = 'text-sm text-paper/60 transition hover:text-signal hover:translate-x-1 inline-block'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-asphalt text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="hazard h-3" aria-hidden="true" />

      {/* Giant wordmark */}
      <div className="container-x overflow-hidden pt-14">
        <p className="font-display text-[18vw] leading-[0.8] font-black text-paper/[0.06] uppercase select-none lg:text-[11rem]" aria-hidden="true">
          Wing Express
        </p>
      </div>

      <div className="container-x grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">{company.description}</p>
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
            <ul className="space-y-4 text-sm text-paper/60">
              <li>
                <a href={tel(company.phone)} className="flex items-start gap-3 transition hover:text-signal">
                  <Phone className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                  <span className="font-mono">
                    {company.phone}
                    <br />
                    {company.phoneAlt}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 transition hover:text-signal">
                  <Mail className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                <address className="not-italic">{company.address}</address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
                {company.hours}
              </li>
            </ul>
          </Col>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-paper/15">
        <div className="container-x label flex flex-col items-center justify-between gap-3 py-6 text-paper/40 sm:flex-row">
          <p>
            © {year} {company.legalName} All rights reserved.
          </p>
          <p>
            {coverage.stops.length} stops · {coverage.pickups.length} pickup regions · {company.serviceDays}
          </p>
        </div>
      </div>
    </footer>
  )
}
