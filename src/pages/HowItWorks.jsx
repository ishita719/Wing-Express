import { Route } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Process from '../components/sections/Process'
import WaysToBook from '../components/sections/WaysToBook'
import PrepTips from '../components/sections/PrepTips'
import CtaBand from '../components/sections/CtaBand'

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        icon={Route}
        title="From your first call to a confirmed delivery"
        text="Booking with EagleWing Express takes four simple steps. Here is what happens, how to book, and how to get your shipment ready."
      />
      <Process />
      <WaysToBook />
      <PrepTips />
      <CtaBand />
    </>
  )
}
