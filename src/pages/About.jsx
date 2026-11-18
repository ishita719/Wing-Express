import { Building2 } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import AboutSection from '../components/sections/About'
import Stats from '../components/sections/Stats'
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
        text="EagleWing Express Ltd. is based on Vancouver Island, British Columbia, moving freight between eight Island communities from Victoria to Campbell River."
      >
        <Button href="/coverage" variant="ghost">See where we go</Button>
      </PageHero>
      <AboutSection />
      <Stats />
      <WhyUs />
      <CtaBand />
    </>
  )
}
