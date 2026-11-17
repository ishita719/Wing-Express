import { useEffect, useState } from 'react'
import { Menu, X, Phone, ArrowRight, Clock, Mail } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import RoadProgress from '../ui/RoadProgress'
import useScrolled from '../../hooks/useScrolled'
import { company, navLinks } from '../../data/site'
import { tel } from '../../lib/utils'

export default function Header() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className={`hidden overflow-hidden bg-navy text-xs text-white/65 transition-all duration-300 lg:block ${scrolled ? 'max-h-0' : 'max-h-10'}`}>
        <div className="container-x flex h-9 items-center justify-between border-b border-white/10">
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5 text-brand-100" aria-hidden="true" /> {company.hours}
          </span>
          <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
            <Mail className="size-3.5 text-brand-100" aria-hidden="true" /> {company.email}
          </a>
        </div>
      </div>

      <div className={`bg-navy/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-lg shadow-navy/20' : ''}`}>
        <nav className="container-x flex h-[4.25rem] items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative px-3.5 py-2 text-sm font-medium whitespace-nowrap text-white/75 transition hover:text-white"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-100 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={tel(company.phone)}
              className="hidden items-center gap-2 text-sm font-semibold whitespace-nowrap text-white transition hover:text-brand-100 xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {company.phone}
            </a>
            <Button href="#quote" size="sm" icon={ArrowRight}>
              Request a quote
            </Button>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        <RoadProgress />
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[4.4rem] bottom-0 bg-navy transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-x flex h-full flex-col overflow-y-auto py-6">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              className={`border-b border-white/10 py-4 font-display text-2xl font-semibold text-white transition-all duration-300 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button href="#quote" size="lg" icon={ArrowRight} onClick={() => setOpen(false)}>
              Request a quote
            </Button>
            <Button href={tel(company.phone)} variant="ghost" size="lg" iconLeft={Phone}>
              {company.phone}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
