import { Truck, ArrowRight } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import ServicesSection from '../components/sections/Services'
import Fleet from '../components/sections/Fleet'
import RoadDivider from '../components/sections/RoadDivider'
import CtaBand from '../components/sections/CtaBand'
import Button from '../components/ui/Button'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        icon={Truck}
        title="Freight services for Island businesses and homes"
        text="Scheduled Island runs, express deliveries, pallets and full loads — matched to your shipment, your timeline and your budget."
      >
        <Button href="/contact" icon={ArrowRight}>Get a free quote</Button>
      </PageHero>
      <ServicesSection />
      <RoadDivider />
      <Fleet />
      <CtaBand />
    </>
  )
}
