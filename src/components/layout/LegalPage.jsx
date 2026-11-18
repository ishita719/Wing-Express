import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import PageHero from './PageHero'
import Reveal from '../ui/Reveal'
import { legal } from '../../data/site'

/**
 * Shared layout for Terms / Privacy: sticky table of contents that tracks
 * the section you are reading, and sections that fade up as you scroll.
 */
export default function LegalPage({ eyebrow, title, intro, sections, icon = FileText }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sections])

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={intro} icon={icon} />
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <nav aria-label="On this page" className="sticky top-28 rounded-xl border border-line p-5">
              <p className="eyebrow text-crimson-700">On this page</p>
              <ol className="mt-4 space-y-1 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={`flex gap-2 rounded-md px-2 py-1.5 transition ${
                        active === s.id ? 'bg-crimson-50 font-semibold text-crimson-700' : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-line pt-4 text-xs text-muted">Last updated: {legal.updated}</p>
            </nav>
          </aside>

          <div className="space-y-12 lg:col-span-8">
            {sections.map((s, i) => (
              <Reveal as="article" key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-3 text-2xl">
                  <span className="font-display text-base text-crimson">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink/80">
                  {s.body.map((p, k) =>
                    Array.isArray(p) ? (
                      <ul key={k} className="list-disc space-y-1.5 pl-5 marker:text-crimson">
                        {p.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={k}>{p}</p>
                    ),
                  )}
                </div>
              </Reveal>
            ))}
            <p className="rounded-xl bg-surface p-5 text-sm text-muted">
              This page is a plain-language summary provided for information. It does not replace any written agreement, bill of
              lading or quote issued for your shipment, which take priority where they differ.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
