import { Send } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Quote from '../components/sections/Quote'
import WaysToBook from '../components/sections/WaysToBook'
import { company } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact & quote"
        icon={Send}
        title="Tell us what is moving, and where"
        text={`Send the form below, call ${company.phone} or email ${company.email}. Our dispatch team is available ${company.hoursShort}.`}
      />
      <Quote />
      <WaysToBook />
    </>
  )
}
