import { useRef } from 'react'

/**
 * Card that tilts in 3D toward the cursor, with a soft crimson spotlight
 * following the pointer. Mouse only — touch devices get a normal card.
 */
export default function SpotlightCard({ as: Tag = 'div', tilt = 7, className = '', children, ...props }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    const rx = (0.5 - y / r.height) * tilt
    const ry = (x / r.width - 0.5) * tilt
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group relative overflow-hidden [transform-style:preserve-3d] ${className}`}
      style={{ transition: 'transform 0.25s ease-out, translate 0.3s, box-shadow 0.3s, border-color 0.3s' }}
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
