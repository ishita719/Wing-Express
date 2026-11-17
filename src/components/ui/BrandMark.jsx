/**
 * EagleWing Express brand mark — "Winged Truck".
 * A box truck in profile with a three-feather eagle wing painted on the box,
 * sweeping forward for speed. Keeps the company's trucking identity while
 * reading cleanly from favicon size up to signage.
 *
 * variant: "charcoal" → charcoal tile, white truck, crimson wing (default)
 *          "crimson"  → crimson tile, white truck, charcoal wing
 *          "plain"    → no tile, charcoal truck, crimson wing (light backgrounds)
 *          "white"    → no tile, white truck, crimson wing (dark backgrounds)
 */

/** Truck body, cab and wheels (one colour). */
export const TRUCK_BODY = [
  'M9 20 h30 a2 2 0 0 1 2 2 v19 H7 V22 a2 2 0 0 1 2 -2 z', // box
  'M40 27 h9 a2 2 0 0 1 1.6 .8 l5 6.2 a2 2 0 0 1 .4 1.2 v5.8 h-16 z', // cab
  'M6 41 h51 v2 a1 1 0 0 1 -1 1 H7 a1 1 0 0 1 -1 -1 z', // chassis
]
export const WHEELS = [
  [16, 46],
  [49, 46],
]
export const WINDOW = 'M42.5 29.5 h5.5 l4 5 h-9.5 z'
/** Three swept feathers, largest first. */
export const FEATHERS = [
  'M10 34.5 C18 33.5 27 28.5 35.5 21.5 C35 28.5 28.5 34 19.5 36 Z',
  'M12.5 37.6 C20.5 37 28.5 33.5 36 28 C35 33.2 29.5 36.8 21.5 38.6 Z',
  'M16.5 40 C23 39.8 29.5 37.6 35.5 34 C34.6 37.4 30.6 39.6 25 40.4 Z',
]

const PALETTES = {
  charcoal: { tile: '#1b1f27', truck: '#ffffff', wing: '#d7263d', cut: '#1b1f27' },
  crimson: { tile: '#d7263d', truck: '#ffffff', wing: '#1b1f27', cut: '#d7263d' },
  plain: { tile: null, truck: '#1b1f27', wing: '#d7263d', cut: '#ffffff' },
  white: { tile: null, truck: '#ffffff', wing: '#d7263d', cut: '#1b1f27' },
}

export default function BrandMark({ variant = 'charcoal', animate = false, className = 'size-10', title }) {
  const p = PALETTES[variant] ?? PALETTES.charcoal
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {p.tile && <rect width="64" height="64" rx="14" fill={p.tile} />}
      <g fill={p.truck}>
        {TRUCK_BODY.map((d) => (
          <path key={d} d={d} />
        ))}
        {WHEELS.map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="5" />
        ))}
      </g>
      <path d={WINDOW} fill={p.cut} />
      {WHEELS.map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="2" fill={p.cut} />
      ))}
      <g fill={p.wing}>
        {FEATHERS.map((d, i) => (
          <path
            key={d}
            d={d}
            opacity={1 - i * 0.2}
            className={animate ? 'feather' : ''}
            style={animate ? { animationDelay: `${0.15 + i * 0.12}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  )
}
