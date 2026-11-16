import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import { stats } from '../../data/site'

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-white" aria-label="Wing Express by the numbers">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className={`px-4 text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
            <p className="font-display text-4xl font-extrabold sm:text-5xl">
              <span className="text-gradient">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
            </p>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
