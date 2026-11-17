import useInView from '../../hooks/useInView'

const effects = { wipe: 'reveal', rise: 'reveal-rise', none: '' }

/**
 * Reveals children when scrolled into view.
 * effect="wipe"  → uncovered left-to-right like tape being pulled (default)
 * effect="rise"  → pops up with a slight overshoot
 * effect="none"  → only toggles .is-visible (for children using .mask-line / .draw-path)
 */
export default function Reveal({ as: Tag = 'div', effect = 'wipe', delay = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${effects[effect]} ${inView ? 'is-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
