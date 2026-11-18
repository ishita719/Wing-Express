import useInView from '../../hooks/useInView'

const effects = { up: 'reveal-up', scale: 'reveal-scale', left: 'reveal-left', right: 'reveal-right', none: '' }

/**
 * Reveals children when scrolled into view.
 * effect="up"    → fade + lift (default)
 * effect="scale" → fade + gentle zoom
 * effect="left" / "right" → dealt in from that side with a slight rotation
 * effect="none"  → only toggles .is-visible (for children such as .draw-path / .grow-x)
 */
export default function Reveal({ as: Tag = 'div', effect = 'up', delay = 0, className = '', children, ...props }) {
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
