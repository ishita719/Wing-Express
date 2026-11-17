import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, LoaderCircle, CircleCheck, TriangleAlert } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { company, coverage, quoteOptions } from '../../data/site'
import { tel } from '../../lib/utils'

const initial = {
  name: '', company: '', phone: '', email: '',
  from: '', to: '', service: '', timing: '',
  cargo: '', weight: '', tailgate: false, notes: '',
  website: '', // honeypot — real visitors never fill this
}

function Field({ label, id, required, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block label text-ink/70">
        {label} {required && <span className="text-route">*</span>}
      </label>
      {children}
    </div>
  )
}

function buildMailto(d) {
  const body = Object.entries(d)
    .filter(([k, v]) => k !== 'website' && v !== '' && v !== false)
    .map(([k, v]) => `${k}: ${v === true ? 'yes' : v}`)
    .join('\n')
  return `mailto:${company.email}?subject=${encodeURIComponent('Quote request — ' + d.name)}&body=${encodeURIComponent(body)}`
}

export default function Quote() {
  const [data, setData] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const stopNames = [...coverage.stops.map((s) => s.name), ...coverage.pickups, 'Other']

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setData((d) => ({ ...d, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setData(initial)
    } catch {
      setStatus('error')
    }
  }

  const contact = [
    { icon: Phone, label: 'Dispatch', value: company.phone, href: tel(company.phone) },
    { icon: Phone, label: 'Alternate', value: company.phoneAlt, href: tel(company.phoneAlt) },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: 'Main hub', value: company.address },
    { icon: Clock, label: 'Hours', value: company.hours },
  ]

  return (
    <section id="quote" className="relative overflow-hidden bg-asphalt py-20 sm:py-28" aria-labelledby="quote-title">
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Contact side */}
        <Reveal className="text-paper lg:col-span-5">
          <p className="label mb-4 inline-flex items-center gap-3 text-signal"><span className="rounded-sm bg-signal px-1.5 py-0.5 text-ink">06</span>
            Dispatch
          </p>
          <h2 id="quote-title" className="text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">
            Get a freight quote today
          </h2>
          <p className="mt-4 text-paper/65">
            Tell us what is moving and where. Our dispatch team replies the same business day with a clear, upfront rate.
          </p>

          <ul className="mt-10 space-y-3">
            {contact.map(({ icon: Icon, label, value, href }) => {
              const Inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-paper/10 text-signal transition group-hover:bg-signal group-hover:text-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-paper/45">{label}</span>
                    <span className="font-medium">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4 rounded-md border-2 border-dashed border-paper/20 p-3 transition hover:border-signal hover:bg-paper/5">
                      {Inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-md border-2 border-dashed border-paper/20 p-3">{Inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={120} className="lg:col-span-7">
          <form onSubmit={submit} className="rounded-md border-2 border-ink bg-white p-6 shadow-hard-signal sm:p-10" noValidate={false}>
            {status === 'sent' ? (
              <div className="py-16 text-center" role="status">
                <CircleCheck className="mx-auto size-16 text-emerald-500" aria-hidden="true" />
                <h3 className="mt-5 text-4xl">Request received!</h3>
                <p className="mx-auto mt-2 max-w-sm text-ink/60">
                  Thanks — our dispatch team will get back to you the same business day.
                </p>
                <Button type="button" variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                  Send another request
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-4xl leading-none">Request a rate</h3>
                <p className="mt-1 text-sm text-ink/50">Fields marked * are required.</p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field label="Pickup from" id="from" required>
                    <select id="from" name="from" required value={data.from} onChange={update} className="field">
                      <option value="">Select…</option>
                      {stopNames.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Deliver to" id="to" required>
                    <select id="to" name="to" required value={data.to} onChange={update} className="field">
                      <option value="">Select…</option>
                      {stopNames.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Service" id="service">
                    <select id="service" name="service" value={data.service} onChange={update} className="field">
                      <option value="">Select…</option>
                      {quoteOptions.service.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Timing" id="timing">
                    <select id="timing" name="timing" value={data.timing} onChange={update} className="field">
                      <option value="">Select…</option>
                      {quoteOptions.timing.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="What is moving?" id="cargo" required>
                    <input id="cargo" name="cargo" required value={data.cargo} onChange={update} className="field" placeholder="e.g. 4 pallets of tiles" />
                  </Field>
                  <Field label="Weight or piece count" id="weight">
                    <input id="weight" name="weight" value={data.weight} onChange={update} className="field" placeholder="e.g. 1,800 lb" />
                  </Field>

                  <label className="flex cursor-pointer items-center gap-3 rounded-sm border-2 border-ink bg-paper px-4 py-3 font-medium text-sm sm:col-span-2">
                    <input type="checkbox" name="tailgate" checked={data.tailgate} onChange={update} className="size-4 accent-route" />
                    Tailgate needed — no dock or forklift at the delivery site
                  </label>

                  <Field label="Full name" id="name" required>
                    <input id="name" name="name" required autoComplete="name" value={data.name} onChange={update} className="field" />
                  </Field>
                  <Field label="Company" id="company">
                    <input id="company" name="company" autoComplete="organization" value={data.company} onChange={update} className="field" />
                  </Field>
                  <Field label="Phone" id="phone" required>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" value={data.phone} onChange={update} className="field" />
                  </Field>
                  <Field label="Email" id="email" required>
                    <input id="email" name="email" type="email" required autoComplete="email" value={data.email} onChange={update} className="field" />
                  </Field>
                  <Field label="Anything else?" id="notes" className="sm:col-span-2">
                    <textarea id="notes" name="notes" rows={3} value={data.notes} onChange={update} className="field resize-none" placeholder="Dimensions, access notes, delivery windows…" />
                  </Field>

                  {/* Honeypot */}
                  <input type="text" name="website" value={data.website} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                </div>

                {status === 'error' && (
                  <div className="mt-5 flex gap-3 rounded-sm bg-signal/40 border-2 border-ink p-4 text-sm text-ink" role="alert">
                    <TriangleAlert className="size-5 shrink-0 text-route" aria-hidden="true" />
                    <p>
                      We could not send your request online. Please{' '}
                      <a href={buildMailto(data)} className="font-semibold text-route underline">
                        email it to dispatch
                      </a>{' '}
                      or call <a href={tel(company.phone)} className="font-semibold underline">{company.phone}</a>.
                    </p>
                  </div>
                )}

                <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="text-xs text-ink/50">Same-day replies, {company.serviceDays}.</p>
                  <Button type="submit" size="lg" disabled={status === 'sending'} icon={status === 'sending' ? undefined : Send}>
                    {status === 'sending' && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
                    {status === 'sending' ? 'Sending…' : 'Send request'}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
