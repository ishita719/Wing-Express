import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../ui/Logo'
import { company, navLinks, coverage } from '../../data/site'
import { tel } from '../../lib/utils'
import { useRef } from 'react'
import useScrollProgress from '../../hooks/useScrollProgress'

function Col({ title, children }) {
  return (
    <div>
      <h3 className="mb-5 font-sans text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  )
}

const linkCls = 'text-sm text-white/60 transition hover:text-crimson-400'

/** Giant outlined wordmark that fills with crimson as the footer scrolls in. */
function Wordmark() {
  const ref = useRef(null)
  const p = useScrollProgress(ref, { from: 1.05, to: 0.82 })
  const cls = 'block font-display text-[19vw] leading-[0.82] font-extrabold tracking-tighter whitespace-nowrap select-none lg:text-[13.5rem]'
  return (
    <div ref={ref} className="container-x relative overflow-hidden pt-4" aria-hidden="true">
      <span className={`${cls} text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.14)]`}>EagleWing</span>
      <span
        className={`${cls} absolute inset-x-4 top-4 bg-gradient-to-r from-crimson to-crimson-400 bg-clip-text text-transparent sm:inset-x-6 lg:inset-x-8`}
        style={{ clipPath: `inset(0 ${100 - p * 100}% 0 0)` }}
      >
        EagleWing
      </span>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-charcoal-950 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="h-1 bg-gradient-to-r from-crimson via-crimson to-brand" aria-hidden="true" />

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{company.description}</p>
        </div>

        <div className="lg:col-span-2">
          <Col title="Company">
            <ul className="space-y-3">
              {[{ label: 'Home', to: '/' }, ...navLinks, { label: 'Contact & quote', to: '/contact' }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </div>

        <div className="lg:col-span-3">
          <Col title="Service areas">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {coverage.all.map((town) => (
                <li key={town}>
                  <Link to="/coverage" className={linkCls}>
                    {town}
                  </Link>
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
                  <Phone className="mt-0.5 size-4 shrink-0 text-crimson-400" aria-hidden="true" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-crimson-400" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-crimson-400" aria-hidden="true" />
                {company.region}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-crimson-400" aria-hidden="true" />
                {company.hours}
              </li>
            </ul>
          </Col>
        </div>
      </div>

      <Wordmark />

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
