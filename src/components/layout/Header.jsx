import { useEffect, useState } from 'react'
import { Menu, X, Phone, Clock, MapPin, ArrowRight } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
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
      <div
        className={`hidden overflow-hidden bg-ink-950 text-xs text-white/60 transition-all duration-300 lg:block ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-ember-400" aria-hidden="true" /> {company.hours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-ember-400" aria-hidden="true" /> {company.address}
            </span>
          </div>
          <a href={`mailto:${company.email}`} className="transition hover:text-white">
            {company.email}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? 'bg-ink-900/90 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-18 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3 py-2 text-sm whitespace-nowrap xl:px-4 font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={tel(company.phone)}
              className="hidden items-center gap-2 text-sm font-semibold whitespace-nowrap text-white xl:inline-flex transition hover:text-ember-300"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/10">
                <Phone className="size-4" aria-hidden="true" />
              </span>
              {company.phone}
            </a>
            <Button href="#quote" size="sm" icon={ArrowRight}>
              Get a quote
            </Button>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-18 bottom-0 bg-ink-900/98 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-x flex h-full flex-col gap-2 overflow-y-auto py-6">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              className={`border-b border-white/10 py-4 font-display text-2xl font-semibold text-white transition-all duration-300 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <Button href="#quote" size="lg" icon={ArrowRight} onClick={() => setOpen(false)}>
              Get a quote
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
