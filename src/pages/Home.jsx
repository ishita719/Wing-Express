import PinnedHero from '../components/layout/PinnedHero'
import Hero from '../components/sections/Hero'
import RoadDivider from '../components/sections/RoadDivider'
import TrustMarquee from '../components/sections/TrustMarquee'
import ExploreLinks from '../components/sections/ExploreLinks'
import Services from '../components/sections/Services'
import Stats from '../components/sections/Stats'
import Process from '../components/sections/Process'
import WhyUs from '../components/sections/WhyUs'
import CtaBand from '../components/sections/CtaBand'

/** Home: pinned hero with the rest of the page sliding over it like a curtain. */
export default function Home() {
  return (
    <>
      <PinnedHero>
        <Hero />
      </PinnedHero>
      <div className="relative z-10 -mt-8 rounded-t-[2rem] bg-white shadow-[0_-30px_60px_-12px_rgb(0_0_0/0.55)]">
        <RoadDivider />
        <TrustMarquee />
        <ExploreLinks />
        <Services />
        <Stats />
        <Process />
        <WhyUs />
        <CtaBand />
      </div>
    </>
  )
}
