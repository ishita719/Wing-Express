import { MapPin, ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { coverage } from '../../data/site'

const W = 1000
const H = 220

export default function Coverage() {
  const { stops, pickups } = coverage
  const max = stops[stops.length - 1].km

  // Place stops by distance along a gently curving line.
  const pts = stops.map((s, i) => ({
    ...s,
    x: 60 + (s.km / max) * (W - 120),
    y: 110 + Math.sin((i / (stops.length - 1)) * Math.PI * 2) * 34,
  }))
  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`
    const prev = pts[i - 1]
    const cx = (prev.x + p.x) / 2
    return `${acc} C${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`
  }, '')

  return (
    <section id="coverage" className="bg-white py-20 sm:py-28" aria-labelledby="coverage-title">
      <div className="container-x">
        <SectionHeading
          id="coverage-title"
          align="center"
          eyebrow="Coverage"
          title="Where our trucks stop"
          text={`One scheduled line, ${stops.length} stops and ${max} km of dependable daily service — plus pickups from surrounding regions.`}
        />

        <Reveal effect="none" className="card mt-14 overflow-hidden">
          {/* Desktop: route drawn on scroll, truck travels along it */}
          <div className="hidden bg-gradient-to-b from-brand-50/60 to-white px-6 pt-8 pb-4 md:block">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Route map of Wing Express stops">
              <path d={d} fill="none" stroke="#dbe7f8" strokeWidth="10" strokeLinecap="round" />
              <path id="wx-route" d={d} pathLength="1000" className="draw-path" fill="none" stroke="#1f5fbf" strokeWidth="4" strokeLinecap="round" />

              <g>
                <circle r="11" fill="#0f9d76" stroke="#fff" strokeWidth="3" />
                <animateMotion dur="10s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear">
                  <mpath href="#wx-route" />
                </animateMotion>
              </g>

              {pts.map((p, i) => {
                const end = i === 0 || i === pts.length - 1
                const below = i % 2 === 0
                return (
                  <g key={p.name}>
                    <circle cx={p.x} cy={p.y} r={end ? 9 : 7} fill="#fff" stroke={end ? '#0a1f33' : '#1f5fbf'} strokeWidth="3" />
                    <text x={p.x} y={below ? p.y + 32 : p.y - 38} textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="15" fill="#0a1f33">
                      {p.name}
                    </text>
                    <text x={p.x} y={below ? p.y + 50 : p.y - 21} textAnchor="middle" fontFamily="Public Sans, sans-serif" fontSize="12" fill="#52637a">
                      {p.km} km
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile: vertical route */}
          <ol className="relative m-6 ml-9 border-l-2 border-brand-100 md:hidden">
            {stops.map((s, i) => (
              <li key={s.name} className="relative pb-6 pl-6 last:pb-0">
                <span
                  className={`absolute top-1 -left-[9px] size-4 rounded-full border-[3px] bg-white ${
                    i === 0 || i === stops.length - 1 ? 'border-navy' : 'border-brand'
                  }`}
                />
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-muted">{s.km} km from hub</p>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-start justify-between gap-6 border-t border-line p-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold">Also picking up from</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pickups.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink/80">
                    <MapPin className="size-3.5 text-brand" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="#quote" icon={ArrowRight}>
              Check your location
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
