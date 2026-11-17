import useInView from '../../hooks/useInView'

/**
 * Fades + lifts children in when scrolled into view.
 * effect="none" only toggles .is-visible (for children such as .draw-path).
 */
export default function Reveal({ as: Tag = 'div', effect = 'up', delay = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${effect === 'up' ? 'reveal-up' : ''} ${inView ? 'is-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
