import Reveal from './Reveal'

/**
 * Section title in the "manifest" style: a numbered mono tag, then a big
 * condensed headline whose lines slide up out of a mask.
 * `title` may be a string or an array of strings (one per line).
 */
export default function SectionHeading({ number, eyebrow, title, text, align = 'left', dark = false, id }) {
  const lines = Array.isArray(title) ? title : [title]
  const center = align === 'center'
  return (
    <Reveal effect="none" className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`label mb-4 inline-flex items-center gap-3 ${dark ? 'text-signal' : 'text-route'}`}>
          {number && (
            <span className={`rounded-sm px-1.5 py-0.5 ${dark ? 'bg-signal text-ink' : 'bg-ink text-signal'}`}>{number}</span>
          )}
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-5xl leading-[0.9] sm:text-6xl lg:text-7xl ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {lines.map((l, i) => (
          <span key={i} className="mask-line">
            <span style={{ transitionDelay: `${i * 110}ms` }}>{l}</span>
          </span>
        ))}
      </h2>
      {text && (
        <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${center ? 'mx-auto' : ''} ${dark ? 'text-paper/65' : 'text-ink/65'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
