/**
 * EagleWing Express brand mark — spread eagle wings (white and crimson
 * feathers) around a shield with a "W", from the client's logo.
 *
 * The full mark is a detailed vector traced from the client's artwork
 * (scripts/trace-logo.mjs → public/eaglewing-mark.svg). It is loaded as one
 * cached image instead of being repeated inline on every page. It has a
 * charcoal backing, so it reads on dark and light backgrounds alike.
 *
 * variant: "light" | "dark"     → the full wings mark (same artwork on any background)
 * fly:     true → the wings flap like a bird in flight (static for reduced-motion users)
 *          "tile-dark" / "tile-red" → the shield-and-W icon on a rounded tile
 *                                     (favicon / app icon size, where wings would blur)
 */

import { MARK_SRC, MARK_FLY_SRC, MARK_W, MARK_H, FLY_PAD_TOP, FLY_PAD_BOTTOM, shieldSvg } from '../../data/brand'

export { MARK_SRC, MARK_FLY_SRC, MARK_W, MARK_H, shieldSvg }

export default function BrandMark({ variant = 'light', animate = false, fly = false, className = 'h-9 w-auto', title }) {
  if (variant === 'tile-dark' || variant === 'tile-red') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
        aria-label={title}
        dangerouslySetInnerHTML={{ __html: shieldSvg({ tile: variant === 'tile-red' ? '#d7263d' : '#1b1f27' }) }}
      />
    )
  }
  if (fly) {
    // The box keeps the still mark's size; the taller flying image overflows it so the wings can rise freely.
    return (
      <span
        className={`${animate ? 'wing-spread' : ''} relative inline-block ${className}`}
        style={{ aspectRatio: `${MARK_W} / ${MARK_H}` }}
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      >
        <img
          src={MARK_FLY_SRC}
          width={MARK_W}
          height={MARK_H + FLY_PAD_TOP + FLY_PAD_BOTTOM}
          alt=""
          decoding="async"
          draggable="false"
          className="pointer-events-none absolute left-0 h-auto w-full max-w-none"
          style={{ top: `${(-FLY_PAD_TOP / MARK_H) * 100}%` }}
        />
      </span>
    )
  }
  return (
    <img
      src={MARK_SRC}
      width={MARK_W}
      height={MARK_H}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      decoding="async"
      draggable="false"
      className={`${animate ? 'wing-spread' : ''} ${className}`}
    />
  )
}
