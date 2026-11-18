/**
 * Splits text into masked words that rise one after another when an
 * ancestor gets the `.is-visible` class (see Reveal). Screen readers get the
 * plain sentence via aria-label.
 */
export default function SplitWords({ text, delay = 0, step = 55, className = '' }) {
  const words = text.split(' ')
  return (
    <span aria-label={text} className={className}>
      {words.map((w, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <span style={{ transitionDelay: `${delay + i * step}ms` }}>{w}</span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
