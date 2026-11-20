/**
 * Logo constants shared by the site (BrandMark, TruckIllustration) and the
 * Node build scripts (scripts/make-brand.mjs). Plain JS so Node can import it.
 */
export const MARK_SRC = '/eaglewing-mark.svg'
/** Same mark with the wings flapping (two beats, then a glide), animated inside the SVG. */
export const MARK_FLY_SRC = '/eaglewing-mark-fly.svg'
/** Headroom in the flying SVG (mark units) so raised wings are not clipped — keep in sync with scripts/trace-logo.mjs. */
export const FLY_PAD_TOP = 150
export const FLY_PAD_BOTTOM = 20
export const MARK_W = 888
export const MARK_H = 315

/** Shield-and-W icon in a 100×100 box (used for favicon, app icons, small sizes). */
export function shieldSvg({ tile = '#1b1f27' } = {}) {
  return (
    (tile ? `<rect width="100" height="100" rx="22" fill="${tile}"/>` : '') +
    `<path d="M24 14 H76 V50 C76 70 63 80 50 88 C37 80 24 70 24 50 Z" fill="#ffffff"/>` +
    `<path d="M29.5 19.5 H70.5 V50 C70.5 66 60 74.5 50 81.5 C40 74.5 29.5 66 29.5 50 Z" fill="none" stroke="#d7263d" stroke-width="3"/>` +
    `<path d="M35 30 H40.5 L44.6 55.5 L50 43 L55.4 55.5 L59.5 30 H65 L58.6 68 H53.2 L50 59.5 L46.8 68 H41.4 Z" fill="#1b1f27"/>`
  )
}
