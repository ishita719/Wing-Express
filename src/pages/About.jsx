import { Building2 } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import AboutSection from '../components/sections/About'
import FleetBlock from '../components/sections/FleetBlock'
import WhyUs from '../components/sections/WhyUs'
import CtaBand from '../components/sections/CtaBand'
import Button from '../components/ui/Button'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        icon={Building2}
        title="A local carrier for Vancouver Island"
        text="EagleWing Express Ltd. is based on Vancouver Island, British Columbia, running daily freight from Victoria to Campbell River and Port Alberni, plus a daily run to the Lower Mainland — with 3 and 5 ton tailgate trucks."
      >
        <Button href="/coverage" variant="ghost">See where we go</Button>
      </PageHero>
      <AboutSection />
      <FleetBlock />
      <WhyUs />
      <CtaBand />
    </>
  )
}
