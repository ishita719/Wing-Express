import { Send, MapPin } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Quote from '../components/sections/Quote'
import HoursCard from '../components/sections/HoursCard'
import WaysToBook from '../components/sections/WaysToBook'
import Reveal from '../components/ui/Reveal'
import { company, coverage } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact & quote"
        icon={Send}
        title="Tell us what is moving, and where"
        text={`Send the form below, call ${company.phone} or email ${company.email}. Phones are answered ${company.phoneHoursShort}, and deliveries run ${company.deliveryDays}.`}
      />
      <Quote />

      <section className="bg-white py-20 sm:py-24" aria-label="Hours and service area">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <HoursCard />
          <Reveal effect="scale" delay={120} className="card p-7">
            <h3 className="inline-flex items-center gap-2 text-lg">
              <MapPin className="size-5 text-crimson" aria-hidden="true" /> Service area
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We are based on {company.region}. Pickups and deliveries are arranged by phone, email or the quote form, and we serve
              these communities:
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {coverage.all.map((t, i) => (
                <Reveal as="li" key={t} delay={150 + i * 50} className="inline-flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm">
                  <span className="size-1.5 rounded-full bg-crimson" aria-hidden="true" />
                  {t}
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <WaysToBook />
    </>
  )
}
