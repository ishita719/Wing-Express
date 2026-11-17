import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { company, navLinks, services } from '../../data/site'
import { tel } from '../../lib/utils'

function Col({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 font-sans text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  )
}

const linkCls = 'text-sm text-white/60 transition hover:text-white'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

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
                  Request a quote
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
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href={tel(company.phone)} className="flex items-start gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-100" aria-hidden="true" />
                  <span>
                    {company.phone}
                    <br />
                    {company.phoneAlt}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 transition hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-100" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-100" aria-hidden="true" />
                <address className="not-italic">{company.address}</address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-100" aria-hidden="true" />
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
          <p>Fully insured · NSC-compliant carrier</p>
        </div>
      </div>
    </footer>
  )
}
