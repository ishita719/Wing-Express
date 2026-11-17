import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, text, align = 'left', dark = false, id }) {
  const center = align === 'center'
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${dark ? 'text-crimson-400' : 'text-crimson-700'}`}>{eyebrow}</p>
      )}
      <h2 id={id} className={`text-3xl leading-tight sm:text-4xl lg:text-[2.6rem] ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${center ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-muted'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
