import { MapPinned } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import CoverageSection from '../components/sections/Coverage'
import RoadDivider from '../components/sections/RoadDivider'
import TrustMarquee from '../components/sections/TrustMarquee'
import CtaBand from '../components/sections/CtaBand'
import { coverage } from '../data/site'

export default function Coverage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        icon={MapPinned}
        title="Victoria to Campbell River, and everywhere between"
        text={`We serve ${coverage.all.length} Vancouver Island communities along Highways 1 and 19, with service west to Port Alberni on Highway 4 — plus a daily run to the Lower Mainland via the Duke Point – Tsawwassen ferry.`}
      />
      <TrustMarquee />
      <CoverageSection />
      <RoadDivider rounded={false} />
      <CtaBand />
    </>
  )
}
