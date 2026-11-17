import { ShieldCheck, Truck, Clock, Radar, Forklift, BadgeCheck } from 'lucide-react'

const items = [
  { icon: ShieldCheck, label: 'Fully insured' },
  { icon: BadgeCheck, label: 'NSC-compliant carrier' },
  { icon: Clock, label: 'Next-day delivery' },
  { icon: Forklift, label: 'Tailgate on every truck' },
  { icon: Radar, label: 'GPS-tracked fleet' },
  { icon: Truck, label: 'FTL & LTL freight' },
]

/** Credentials bar directly under the hero. */
export default function TrustMarquee() {
  return (
    <div className="border-b border-line bg-white" aria-label="Credentials">
      <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-4 py-6 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-ink/80">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
