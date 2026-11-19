import Odometer from '../ui/Odometer'
import Reveal from '../ui/Reveal'
import BrandMark from '../ui/BrandMark'
import { stats } from '../../data/site'

/** Stats panel styled like a truck dashboard: odometer-roll numbers. */
export default function Stats() {
  return (
    <section className="bg-white py-16" aria-label="EagleWing Express at a glance">
      <div className="container-x">
        <Reveal effect="scale" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal to-charcoal-3 px-6 py-12 text-white sm:px-10">
          <BrandMark variant="light" className="absolute -right-12 -bottom-4 h-auto w-96 opacity-[0.06]" />
          <div className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-2 text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
                {/* Screen readers and text tools get the plain sentence; the animated figure is hidden from them */}
                <span className="sr-only">
                  {s.text ?? `${s.value}${s.suffix ?? ''}`} — {s.label}
                </span>
                <p
                  aria-hidden="true"
                  className="inline-flex rounded-lg bg-black/25 px-3 py-2 font-display text-3xl font-extrabold whitespace-nowrap text-crimson-400 shadow-inner sm:text-4xl lg:text-5xl"
                >
                  {s.text ?? <Odometer value={s.value} suffix={s.suffix} />}
                </p>
                <p aria-hidden="true" className="mt-3 text-sm text-white/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
