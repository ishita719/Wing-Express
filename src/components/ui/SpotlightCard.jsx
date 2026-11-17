import { useRef } from 'react'

/**
 * Card with a soft crimson spotlight that follows the cursor.
 * Falls back to a normal card on touch devices.
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden ${className}`}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(215 38 61 / 0.14), transparent 60%)' }}
        aria-hidden="true"
      />
      {children}
    </Tag>
  )
}
