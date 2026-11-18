import { useRef } from 'react'

/**
 * Wrapper that pulls its child gently toward the cursor while hovered.
 * Only reacts to a real mouse (ignored on touch screens).
 */
export default function Magnetic({ strength = 0.3, className = '', children }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  )
}
