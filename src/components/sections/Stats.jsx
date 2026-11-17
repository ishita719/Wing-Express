import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import BrandMark from '../ui/BrandMark'
import { stats } from '../../data/site'

export default function Stats() {
  return (
    <section className="bg-white py-16" aria-label="EagleWing Express at a glance">
      <div className="container-x">
        <Reveal effect="scale" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal to-charcoal-3 px-6 py-12 text-white sm:px-10">
          <BrandMark variant="white" className="absolute -right-10 -bottom-16 size-72 opacity-[0.07]" />
          <div className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-2 text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
                <p className="font-display text-4xl font-extrabold text-crimson-400 sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
