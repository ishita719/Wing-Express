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
 *          "tile-dark" / "tile-red" → the shield-and-W icon on a rounded tile
 *                                     (favicon / app icon size, where wings would blur)
 */

import { MARK_SRC, MARK_W, MARK_H, shieldSvg } from '../../data/brand'

export { MARK_SRC, MARK_W, MARK_H, shieldSvg }

// The wings are always static (client's request); `animate` is accepted but no longer moves the mark.
// eslint-disable-next-line no-unused-vars
export default function BrandMark({ variant = 'light', animate = false, className = 'h-9 w-auto', title }) {
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
  return (
    <img
      src={MARK_SRC}
      width={MARK_W}
      height={MARK_H}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      decoding="async"
      draggable="false"
      className={className}
    />
  )
}
