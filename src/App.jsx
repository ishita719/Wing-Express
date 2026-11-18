import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import TrustMarquee from './components/sections/TrustMarquee'
import Stats from './components/sections/Stats'
import Services from './components/sections/Services'
import Fleet from './components/sections/Fleet'
import Process from './components/sections/Process'
import Coverage from './components/sections/Coverage'
import WhyUs from './components/sections/WhyUs'
import Quote from './components/sections/Quote'
import Faq from './components/sections/Faq'
import CtaBand from './components/sections/CtaBand'
import BackToTop from './components/ui/BackToTop'
import PinnedHero from './components/layout/PinnedHero'
import RoadDivider from './components/sections/RoadDivider'
import About from './components/sections/About'
import PrepTips from './components/sections/PrepTips'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* Home hero stays pinned; everything after slides up over it like a curtain */}
        <PinnedHero>
          <Hero />
        </PinnedHero>
        <div className="relative z-10 -mt-8 rounded-t-[2rem] bg-white shadow-[0_-30px_60px_-12px_rgb(0_0_0/0.55)]">
          <RoadDivider />
          <TrustMarquee />
          <About />
          <Services />
          <Stats />
          <Fleet />
          <Process />
          <Coverage />
          <PrepTips />
          <WhyUs />
          <Quote />
          <Faq />
          <CtaBand />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
