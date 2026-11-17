import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import { stats } from '../../data/site'

/** Odometer-style stats on a highway-green sign panel. */
export default function Stats() {
  return (
    <section className="bg-route py-14 text-white" aria-label="Wing Express by the numbers">
      <div className="container-x">
        <div className="grid grid-cols-2 border-2 border-white/80 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              effect="rise"
              delay={i * 90}
              className={`p-6 sm:p-8 ${i % 2 === 1 ? 'border-l-2 border-white/80' : ''} ${i > 1 ? 'border-t-2 border-white/80 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l-2' : ''}`}
            >
              <p className="font-display text-6xl leading-none font-black sm:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="label mt-3 text-white/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
