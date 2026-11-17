import { MapPin, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { coverage } from '../../data/site'

const W = 1000
const H = 240

export default function Coverage() {
  const { stops, pickups } = coverage
  const max = stops[stops.length - 1].km

  // Place each stop along the width by distance, zig-zagging vertically like a highway.
  const pts = stops.map((s, i) => ({
    ...s,
    x: 50 + (s.km / max) * (W - 100),
    y: i % 2 === 0 ? 150 : 80,
  }))
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y}`).join(' ')

  return (
    <section id="coverage" className="dot-grid border-t-2 border-ink py-20 sm:py-28" aria-labelledby="coverage-title">
      <div className="container-x">
        <SectionHeading
          id="coverage-title"
          number="04"
          eyebrow="Coverage"
          title={['Where our', 'trucks stop']}
          text={`One scheduled line, ${stops.length} stops and ${max} km of dependable daily service — plus pickups from surrounding regions.`}
        />

        <Reveal effect="none" className="plate mt-14 overflow-hidden">
          <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
            <span className="label text-signal">Route map · Line WX</span>
            <span className="label text-paper/60">{max} km · {stops.length} stops</span>
          </div>

          {/* Desktop: route drawn as it scrolls into view, truck drives along it */}
          <div className="relative hidden p-6 md:block">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Route map of Wing Express stops">
              <path d={d} fill="none" stroke="#15171c" strokeWidth="22" strokeLinejoin="round" strokeLinecap="round" />
              <path
                id="wx-route"
                d={d}
                pathLength="1000"
                style={{ '--len': 1000 }}
                className="draw-path"
                fill="none"
                stroke="#ffc21a"
                strokeWidth="3"
                strokeDasharray="1000"
                strokeLinejoin="round"
              />

              {/* truck */}
              <g>
                <rect x="-13" y="-9" width="26" height="18" rx="2" fill="#ffc21a" stroke="#15171c" strokeWidth="3" />
                <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear">
                  <mpath href="#wx-route" />
                </animateMotion>
              </g>

              {pts.map((p, i) => {
                const end = i === 0 || i === pts.length - 1
                const above = p.y < 120
                const lw = Math.max(p.name.length * 9 + 24, 70)
                return (
                  <g key={p.name}>
                    <circle cx={p.x} cy={p.y} r="10" fill={end ? '#ffc21a' : '#f2efe6'} stroke="#15171c" strokeWidth="4" />
                    <g transform={`translate(${p.x - lw / 2} ${above ? p.y - 62 : p.y + 22})`}>
                      <rect width={lw} height="40" rx="4" fill="#0e6b4a" stroke="#f2efe6" strokeWidth="2" />
                      <text x={lw / 2} y="18" textAnchor="middle" fontFamily="Big Shoulders Display, Impact, sans-serif" fontWeight="800" fontSize="16" fill="#fff">
                        {p.name.toUpperCase()}
                      </text>
                      <text x={lw / 2} y="33" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#ffc21a">
                        {p.km} KM
                      </text>
                    </g>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile: exit-sign list */}
          <ol className="space-y-3 p-5 md:hidden">
            {stops.map((s, i) => (
              <li key={s.name} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-sm border-2 border-ink bg-signal font-mono text-xs font-bold">
                  {i + 1}
                </span>
                <span className="flex flex-1 items-center justify-between rounded-sm border-2 border-paper bg-route px-3 py-2 text-white outline-2 outline-route">
                  <span className="font-display text-lg font-extrabold uppercase">{s.name}</span>
                  <span className="font-mono text-xs text-signal">{s.km} km</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-start justify-between gap-6 border-t-2 border-ink bg-paper p-5 sm:p-6 lg:flex-row lg:items-center">
            <div>
              <p className="label text-ink/60">Also picking up from</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pickups.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-sm border-2 border-ink bg-white px-3 py-1.5 text-sm font-semibold">
                    <MapPin className="size-3.5 text-route" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="#quote" variant="dark" icon={ArrowRight}>
              Check your location
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
