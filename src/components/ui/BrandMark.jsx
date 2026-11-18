/**
 * EagleWing Express brand mark — the "feather fan".
 * Nine feathers fan out in a half-circle over a horizon bar, like an eagle's
 * spread wing (or a sunrise over the Island). The centre feather is crimson.
 *
 * variant: "light" → white feathers (for dark backgrounds)   [default]
 *          "dark"  → charcoal feathers (for light backgrounds)
 *          "tile-dark" / "tile-red" → mark on a rounded square tile (app icon / favicon)
 */

const CX = 50
const CY = 50
const R_OUT = 46
const R_IN = 22
const COUNT = 9
const GAP = 5.5 // degrees between feathers
const CENTRE_SPAN = 9 // the crimson centre feather is slimmer

const rad = (d) => (d * Math.PI) / 180
const pt = (r, deg) => [CX + r * Math.cos(rad(deg)), CY - r * Math.sin(rad(deg))]

/** Annular wedge between two angles (degrees, 0 = right, 180 = left). */
function wedge(a0, a1, rOut = R_OUT, rIn = R_IN) {
  const [x0, y0] = pt(rOut, a0)
  const [x1, y1] = pt(rOut, a1)
  const [x2, y2] = pt(rIn, a1)
  const [x3, y3] = pt(rIn, a0)
  const f = (n) => n.toFixed(2)
  return `M${f(x0)} ${f(y0)} A${rOut} ${rOut} 0 0 0 ${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} A${rIn} ${rIn} 0 0 1 ${f(x3)} ${f(y3)} Z`
}

/** Feather wedges, left to right. `centre` marks the crimson one. */
export const FEATHERS = (() => {
  const side = (180 - CENTRE_SPAN - GAP * (COUNT - 1)) / (COUNT - 1)
  const out = []
  let a = 180
  for (let i = 0; i < COUNT; i++) {
    const span = i === (COUNT - 1) / 2 ? CENTRE_SPAN : side
    out.push({ d: wedge(a, a - span, i === (COUNT - 1) / 2 ? R_OUT + 3 : R_OUT), centre: i === (COUNT - 1) / 2 })
    a -= span + GAP
  }
  return out
})()

/** Horizon bar under the fan. */
export const BASE = { x: 2, y: 56, w: 96, h: 6 }

/** Raw SVG markup of the mark in a 100×64 box — used by the brand-file generator too. */
export function markSvg({ feather = '#ffffff', accent = '#d7263d', base = feather } = {}) {
  return (
    FEATHERS.map((f) => `<path d="${f.d}" fill="${f.centre ? accent : feather}"/>`).join('') +
    `<rect x="${BASE.x}" y="${BASE.y}" width="${BASE.w}" height="${BASE.h}" rx="1" fill="${base}"/>`
  )
}

const COLORS = {
  light: { feather: '#ffffff', tile: null },
  dark: { feather: '#1b1f27', tile: null },
  'tile-dark': { feather: '#ffffff', tile: '#1b1f27' },
  'tile-red': { feather: '#ffffff', tile: '#d7263d', accent: '#1b1f27' },
}

export default function BrandMark({ variant = 'light', animate = false, className = 'h-9 w-auto', title }) {
  const c = COLORS[variant] ?? COLORS.light
  const accent = c.accent ?? '#d7263d'

  const art = (
    <>
      {FEATHERS.map((f, i) => (
        <path
          key={i}
          d={f.d}
          fill={f.centre ? accent : c.feather}
          className={animate ? 'fan-in' : ''}
          style={animate ? { animationDelay: `${0.05 + Math.abs(i - 4) * 0.07}s` } : undefined}
        />
      ))}
      <rect x={BASE.x} y={BASE.y} width={BASE.w} height={BASE.h} rx="1" fill={c.feather} />
    </>
  )

  if (c.tile) {
    return (
      <svg viewBox="0 0 100 100" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
        <rect width="100" height="100" rx="22" fill={c.tile} />
        <g transform="translate(14 24) scale(0.72)">{art}</g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {art}
    </svg>
  )
}
