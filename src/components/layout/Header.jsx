import { useEffect, useState } from 'react'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
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
      {/* Dispatch ticker */}
      <div
        className={`hidden overflow-hidden bg-signal text-ink transition-all duration-300 lg:block ${
          scrolled ? 'max-h-0' : 'max-h-9'
        }`}
      >
        <div className="container-x label flex h-8 items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 animate-blink rounded-full bg-route" aria-hidden="true" />
            Dispatch open · {company.hours}
          </span>
          <span>Cutoff {company.cutoff} → delivered next day</span>
          <a href={`mailto:${company.email}`} className="underline-offset-4 hover:underline">
            {company.email}
          </a>
        </div>
      </div>

      <div className={`bg-asphalt transition-shadow ${scrolled ? 'shadow-[0_6px_0_0_rgb(0_0_0/0.15)]' : ''}`}>
        <nav className="container-x flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center lg:flex">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-baseline gap-1.5 px-3 py-2 font-display text-lg font-bold tracking-wide whitespace-nowrap text-paper/80 uppercase transition hover:text-signal xl:px-4"
                >
                  <span className="font-mono text-[10px] text-signal/60">0{i + 1}</span>
                  {l.label}
                  <span className="absolute inset-x-3 bottom-0.5 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={tel(company.phone)}
              className="hidden items-center gap-2 font-mono text-sm font-bold whitespace-nowrap text-paper transition hover:text-signal xl:inline-flex"
            >
              <Phone className="size-4 text-signal" aria-hidden="true" />
              {company.phone}
            </a>
            <Button href="#quote" size="sm" icon={ArrowRight}>
              Get a quote
            </Button>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-md border-2 border-signal text-signal lg:hidden"
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

      {/* Mobile menu — slides down like a roller door */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[4.5rem] bottom-0 origin-top bg-asphalt transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] lg:hidden ${
          open ? 'scale-y-100' : 'pointer-events-none scale-y-0'
        }`}
      >
        <div className="container-x flex h-full flex-col overflow-y-auto py-6">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${200 + i * 60}ms` : '0ms' }}
              className={`flex items-baseline gap-3 border-b-2 border-dashed border-paper/15 py-4 font-display text-4xl font-black text-paper uppercase transition-all duration-300 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-3 pt-8">
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
