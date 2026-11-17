/**
 * EagleWing Express brand mark — the "Wing-E".
 * An italic E built from three swept-back wing feathers; the top feather
 * is amber. Reads as both the letter E and an eagle's wing in flight.
 *
 * variant: "navy"  → navy tile, white E, amber top feather (default)
 *          "amber" → amber tile, navy E
 *          "plain" → no tile, navy E with amber feather (for light backgrounds)
 */
export const WING_E_PATH =
  'M14 15 H38 C45 15 49 12 53 7 C52 16 46 21 38 21 H20 V29 H34 C39 29 43 27 46 23 C45 31 40 35 34 35 H20 V43 H38 C45 43 49 40 53 35 C52 44 46 49 38 49 H14 Z'
export const WING_TOP_PATH = 'M14 15 H38 C45 15 49 12 53 7 C52 16 46 21 38 21 H14 Z'

export default function BrandMark({ variant = 'navy', animate = false, className = 'size-10', title }) {
  const tile = { navy: '#0b2e4f', amber: '#f5b247', plain: 'none', white: 'none' }[variant]
  const body = variant === 'navy' || variant === 'white' ? '#ffffff' : '#0b2e4f'
  const top = variant === 'amber' ? '#0b2e4f' : '#f5b247'
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {tile !== 'none' && <rect width="64" height="64" rx="14" fill={tile} />}
      <g transform="translate(8 1) skewX(-14)">
        <path d={WING_E_PATH} fill={body} className={animate ? 'feather' : ''} />
        <path d={WING_TOP_PATH} fill={top} className={animate ? 'feather' : ''} style={animate ? { animationDelay: '0.25s' } : undefined} />
      </g>
    </svg>
  )
}
