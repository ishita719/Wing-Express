import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, text, align = 'center', dark = false, id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase ${
            dark ? 'text-ember-300' : 'text-ember-600'
          }`}
        >
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/65' : 'text-ink-900/60'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
