import Reveal from './Reveal'
import SplitWords from './SplitWords'

/**
 * Section heading: a small eyebrow with a line that draws in, a title that
 * rises word by word, and an intro paragraph that fades up after it.
 */
export default function SectionHeading({ eyebrow, title, text, align = 'left', dark = false, id }) {
  const center = align === 'center'
  return (
    <Reveal effect="none" className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 inline-flex items-center gap-2.5 ${dark ? 'text-crimson-400' : 'text-crimson-700'}`}>
          <span className="grow-x h-0.5 w-2.5 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`text-3xl leading-tight sm:text-4xl lg:text-[2.6rem] ${dark ? 'text-white' : 'text-ink'}`}>
        <SplitWords text={title} delay={120} />
      </h2>
      {text && (
        <Reveal
          as="p"
          delay={350}
          className={`mt-4 text-base leading-relaxed sm:text-lg ${center ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-muted'}`}
        >
          {text}
        </Reveal>
      )}
    </Reveal>
  )
}
