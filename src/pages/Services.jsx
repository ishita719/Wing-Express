import { Truck, ArrowRight } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import ServicesSection from '../components/sections/Services'
import FleetBlock from '../components/sections/FleetBlock'
import Fleet from '../components/sections/Fleet'
import DeliveryScope from '../components/sections/DeliveryScope'
import RoadDivider from '../components/sections/RoadDivider'
import CtaBand from '../components/sections/CtaBand'
import Button from '../components/ui/Button'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        icon={Truck}
        title="Tailgate delivery and daily freight runs"
        text="Tailgate delivery, daily Island runs and a daily mainland run via Tsawwassen — from one box to a full load, for businesses and homes."
      >
        <Button href="/contact" icon={ArrowRight}>Get a free quote</Button>
      </PageHero>
      <ServicesSection />
      <RoadDivider />
      <FleetBlock />
      <Fleet />
      <DeliveryScope />
      <CtaBand />
    </>
  )
}
