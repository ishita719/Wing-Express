import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import { stats } from '../../data/site'

export default function Stats() {
  return (
    <section className="bg-white py-16" aria-label="Wing Express by the numbers">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-y-10 rounded-xl bg-navy px-6 py-10 text-white sm:px-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className={`px-2 text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
              <p className="font-display text-4xl font-extrabold sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/65">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
