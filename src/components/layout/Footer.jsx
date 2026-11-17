import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { company, navLinks, coverage } from '../../data/site'
import { tel } from '../../lib/utils'

function Col({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 font-sans text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  )
}

const linkCls = 'text-sm text-white/60 transition hover:text-amber'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="h-1 bg-gradient-to-r from-amber via-amber to-brand" aria-hidden="true" />

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{company.description}</p>
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
          <Col title="Service areas">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {coverage.all.map((town) => (
                <li key={town}>
                  <a href="#coverage" className={linkCls}>
                    {town}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </div>

        <div className="lg:col-span-3">
          <Col title="Contact">
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href={tel(company.phone)} className="flex items-start gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                {company.region}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                {company.hours}
              </li>
            </ul>
          </Col>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {company.legalName} All rights reserved.
          </p>
          <p>Proudly serving Vancouver Island</p>
        </div>
      </div>
    </footer>
  )
}
