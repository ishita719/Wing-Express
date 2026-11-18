import { CircleHelp } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import FaqSection from '../components/sections/Faq'
import WaysToBook from '../components/sections/WaysToBook'
import CtaBand from '../components/sections/CtaBand'
import { faqs } from '../data/site'

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        icon={CircleHelp}
        title="Questions? Here are straight answers"
        text={`${faqs.length} of the questions shippers ask us most — about areas, hours, booking, pricing and preparing your freight.`}
      />
      <FaqSection />
      <WaysToBook />
      <CtaBand />
    </>
  )
}
