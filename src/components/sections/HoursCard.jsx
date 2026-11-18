import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { weeklyHours } from '../../data/site'

/** Weekly hours with today's row highlighted and a live open/closed badge (Pacific Time). */
export default function HoursCard({ className = '' }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  // Vancouver Island is on Pacific Time.
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', weekday: 'long', hour: 'numeric', hour12: false }).formatToParts(now)
  const today = parts.find((p) => p.type === 'weekday')?.value
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const row = weeklyHours.find((h) => h.day === today)
  const open = row && !row.closed && hour >= 8 && hour < 20

  return (
    <Reveal effect="scale" className={`card p-7 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="inline-flex items-center gap-2 text-lg">
          <Clock className="size-5 text-crimson" aria-hidden="true" /> Business hours
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            open ? 'bg-accent-50 text-accent' : 'bg-crimson-50 text-crimson-700'
          }`}
        >
          <span className={`size-1.5 rounded-full ${open ? 'animate-pulse-dot bg-accent' : 'bg-crimson'}`} aria-hidden="true" />
          {open ? 'Open now' : 'Closed now'}
        </span>
      </div>
      <dl className="mt-5 divide-y divide-line text-sm">
        {weeklyHours.map((h, i) => (
          <Reveal key={h.day} delay={100 + i * 60} className={`flex justify-between py-2.5 ${h.day === today ? 'font-semibold text-ink' : 'text-ink/75'}`}>
            <dt className="inline-flex items-center gap-2">
              {h.day === today && <span className="size-1.5 rounded-full bg-crimson" aria-hidden="true" />}
              {h.day}
            </dt>
            <dd className={h.closed ? 'text-crimson-700' : ''}>{h.time}</dd>
          </Reveal>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted">Pacific Time. Quote requests sent outside these hours are answered the next business day.</p>
    </Reveal>
  )
}
