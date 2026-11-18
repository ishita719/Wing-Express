import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BackToTop from '../ui/BackToTop'
import BrandMark from '../ui/BrandMark'
import { company } from '../../data/site'

const TITLES = {
  '/': `${company.name} | Freight & Delivery Across Vancouver Island`,
  '/about': `About Us | ${company.name}`,
  '/services': `Services | ${company.name}`,
  '/how-it-works': `How It Works | ${company.name}`,
  '/coverage': `Coverage Area | ${company.name}`,
  '/faq': `FAQ | ${company.name}`,
  '/contact': `Contact & Quote | ${company.name}`,
}

/**
 * Shared page shell: header, footer, back-to-top, plus the page transition —
 * a charcoal panel with the feather-fan mark sweeps across the screen while
 * the new page rises in behind it.
 */
export default function Layout() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    document.title = TITLES[pathname] ?? `Page not found | ${company.name}`
    if (first.current) {
      first.current = false
      return
    }
    // Jump to top while the wipe covers the screen (or to an in-page anchor).
    const t = setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView()
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }, 380)
    return () => clearTimeout(t)
  }, [pathname, hash])

  const showWipe = !first.current

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" key={pathname} className={showWipe ? 'page-enter' : ''}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      {showWipe && (
        <div key={`wipe-${pathname}`} className="route-wipe" aria-hidden="true">
          <BrandMark variant="light" animate className="h-auto w-28" />
        </div>
      )}
    </>
  )
}
