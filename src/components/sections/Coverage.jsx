import { useState } from 'react'
import { MapPin, ArrowRight, Navigation } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { coverage, communities } from '../../data/site'

const W = 1000
const H = 300
const LINE_Y = 175

/**
 * Transit-style route map of Vancouver Island, rotated so north points right:
 * Victoria (south) on the left → Campbell River (north) on the right.
 * Port Alberni branches off at Parksville (Hwy 4), drawn going "up" (west).
 */
export default function Coverage() {
  const { mainLine, branch, all } = coverage
  const [active, setActive] = useState(null)
  const x = (i) => 70 + (i / (mainLine.length - 1)) * (W - 140)
  const pts = mainLine.map((name, i) => ({ name, x: x(i), y: LINE_Y }))
  const fork = pts.find((p) => p.name === branch.from)
  const alberni = { name: branch.to, x: fork.x - 40, y: 62 }

  const main = `M${pts[0].x} ${LINE_Y} H${pts.at(-1).x}`
  const spur = `M${fork.x} ${LINE_Y} C${fork.x} ${LINE_Y - 60} ${alberni.x} ${alberni.y + 60} ${alberni.x} ${alberni.y}`
  const nanaimoX = pts.find((p) => p.name === 'Nanaimo').x

  return (
    <section id="coverage" className="bg-white py-20 sm:py-28" aria-labelledby="coverage-title">
      <div className="container-x">
        <SectionHeading
          id="coverage-title"
          align="center"
          eyebrow="Coverage"
          title="Serving Vancouver Island, end to end"
          text={`From Victoria in the south to Campbell River in the north — ${all.length} communities on one dependable network.`}
        />

        <Reveal effect="none" className="card mt-14 overflow-hidden">
          {/* Desktop: route map */}
          <div className="relative hidden bg-gradient-to-b from-brand-50/70 to-white px-6 pt-6 pb-2 md:block">
            <div className="absolute top-5 right-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-muted shadow-sm">
              <Navigation className="size-3.5 rotate-90 text-brand" aria-hidden="true" /> North
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Route map: ${mainLine.join(', ')}, with a branch from ${branch.from} to ${branch.to}`}>
              {/* track beds */}
              <path d={main} fill="none" stroke="#dde3ea" strokeWidth="14" strokeLinecap="round" />
              <path d={spur} fill="none" stroke="#dde3ea" strokeWidth="14" strokeLinecap="round" />
              {/* drawn lines */}
              <path id="ew-main" d={main} pathLength="1000" className="draw-path" fill="none" stroke="#1b1f27" strokeWidth="5" strokeLinecap="round" />
              <path d={spur} pathLength="1000" className="draw-path" style={{ transitionDelay: '1.2s' }} fill="none" stroke="#d7263d" strokeWidth="5" strokeLinecap="round" />

              {/* highway labels */}
              {[
                { label: 'Hwy 1', cx: (pts[0].x + nanaimoX) / 2 },
                { label: 'Hwy 19', cx: (nanaimoX + pts.at(-1).x) / 2 + 40 },
              ].map((h) => (
                <g key={h.label} transform={`translate(${h.cx - 26} ${LINE_Y + 58})`}>
                  <rect width="52" height="22" rx="11" fill="#fff" stroke="#dde3ea" />
                  <text x="26" y="15" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontWeight="700" fontSize="11" fill="#46607a">{h.label}</text>
                </g>
              ))}
              <g transform={`translate(${(fork.x + alberni.x) / 2 - 62} ${(LINE_Y + alberni.y) / 2 - 11})`}>
                <rect width="44" height="22" rx="11" fill="#fff" stroke="#f9d3d8" />
                <text x="22" y="15" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontWeight="700" fontSize="11" fill="#b51d32">{branch.highway}</text>
              </g>

              {/* moving truck */}
              <g>
                <rect x="-15" y="-10" width="30" height="20" rx="6" fill="#d7263d" stroke="#fff" strokeWidth="3" />
                <path d="M-7 -3 h9 v6 h-9z M3 -1 h4 l2 3 v1 h-6z" fill="#1b1f27" />
                <animateMotion dur="12s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear">
                  <mpath href="#ew-main" />
                </animateMotion>
              </g>

              {/* stops */}
              {[...pts, alberni].map((p, i) => {
                const end = p.name === mainLine[0] || p.name === mainLine.at(-1)
                const isBranch = p.name === branch.to
                const below = isBranch ? false : p.name === branch.from ? true : i % 2 === 0
                const on = active === p.name
                const delay = `${(isBranch ? 2.2 : 0.6) + i * 0.16}s`
                return (
                  <g
                    key={p.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {on && <circle cx={p.x} cy={p.y} r="10" fill="#d7263d" className="stop-ring" />}
                    <g className="stop-pop" style={{ animationDelay: delay }}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={on ? 13 : end ? 11 : 8}
                        fill={on ? '#d7263d' : '#fff'}
                        stroke={on || isBranch ? '#b51d32' : '#1b1f27'}
                        strokeWidth="4"
                        style={{ transition: 'r 0.25s, fill 0.25s' }}
                      />
                      {end && !on && <circle cx={p.x} cy={p.y} r="4" fill="#d7263d" />}
                    </g>
                    <text
                      x={isBranch ? p.x - 18 : p.x}
                      y={isBranch ? p.y + 5 : below ? p.y + 36 : p.y - 24}
                      textAnchor={isBranch ? 'end' : 'middle'}
                      fontFamily="Archivo, sans-serif"
                      fontWeight="700"
                      fontSize={on ? 18 : 16}
                      fill={on ? '#d7263d' : '#1b1f27'}
                      className="stop-label"
                      style={{ transitionDelay: delay }}
                    >
                      {p.name}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile: vertical route list (north at the bottom) */}
          <ol className="relative m-6 ml-9 border-l-2 border-charcoal/20 md:hidden">
            {mainLine.map((s, i) => (
              <li key={s} className="relative pb-5 pl-6 last:pb-0">
                <span className={`absolute top-1 -left-[9px] size-4 rounded-full border-[3px] bg-white ${i === 0 || i === mainLine.length - 1 ? 'border-crimson' : 'border-charcoal'}`} />
                <p className="font-semibold">{s}</p>
                {s === branch.from && (
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-crimson-50 px-3 py-1 text-sm">
                    <span className="size-2 shrink-0 rounded-full bg-crimson-dark" aria-hidden="true" />
                    <span>
                      Branch to <strong>{branch.to}</strong> via {branch.highway}
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-start justify-between gap-6 border-t border-line p-6 lg:flex-row lg:items-center">
            <ul className="flex flex-wrap gap-2">
              {all.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(t)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(t)}
                    onBlur={() => setActive(null)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-all duration-200 ${
                      active === t ? '-translate-y-0.5 bg-crimson text-white shadow-md' : 'bg-surface text-ink/80'
                    }`}
                  >
                    <MapPin className={`size-3.5 ${active === t ? 'text-white' : 'text-crimson-dark'}`} aria-hidden="true" /> {t}
                  </button>
                </li>
              ))}
            </ul>
            <Button href="#quote" variant="charcoal" icon={ArrowRight} className="shrink-0">
              Check your location
            </Button>
          </div>
        </Reveal>

        {/* Community cards — hovering one highlights it on the map above */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 80}>
              <article
                onMouseEnter={() => setActive(c.name)}
                onMouseLeave={() => setActive(null)}
                className={`h-full rounded-xl border p-5 transition-all duration-300 ${
                  active === c.name ? '-translate-y-1 border-crimson bg-crimson-50/50 shadow-card-hover' : 'border-line bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg">{c.name}</h3>
                    <p className="text-xs font-medium tracking-wide text-crimson-700 uppercase">{c.region}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink/70">
                    {c.km === 0 ? 'Start' : `~${c.km} km`}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.fact}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted">Distances are approximate road distances from Victoria.</p>
      </div>
    </section>
  )
}
