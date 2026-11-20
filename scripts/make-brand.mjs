/**
 * Writes the SVG brand files from the logo artwork:
 *   public/favicon.svg, brand/eaglewing-app-icon.svg — shield-and-W icon on a charcoal tile
 *   public/og-image.svg — 1200×630 link-preview image (wings + wordmark)
 *
 *   node scripts/trace-logo.mjs   (only if the source logo changed)
 *   node scripts/make-brand.mjs
 *   node scripts/make-images.mjs  (renders the PNG versions)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { shieldSvg, MARK_W, MARK_H } from '../src/data/brand.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const at = (p) => join(root, p)

// Icon (favicon / app icon)
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="64" height="64">${shieldSvg()}</svg>\n`
writeFileSync(at('public/favicon.svg'), icon)
writeFileSync(at('brand/eaglewing-app-icon.svg'), icon)

// Share image: wings centred over the wordmark, like the client's logo
const markInner = readFileSync(at('public/eaglewing-mark.svg'), 'utf8').match(/<path[\s\S]*<\/svg>/)[0].replace('</svg>', '')
const mw = 600
const mh = (mw * MARK_H) / MARK_W
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<rect width="1200" height="630" fill="#1b1f27"/>
<rect y="618" width="1200" height="12" fill="#d7263d"/>
<svg x="${600 - mw / 2}" y="44" width="${mw}" height="${mh.toFixed(1)}" viewBox="0 0 ${MARK_W} ${MARK_H}">${markInner}</svg>
<text x="600" y="368" text-anchor="middle" font-family="Quicksand, 'Century Gothic', Arial, sans-serif" font-size="104" font-weight="500" fill="#ffffff">EagleWing</text>
<text x="608" y="428" text-anchor="middle" font-family="Quicksand, 'Century Gothic', Arial, sans-serif" font-size="32" font-weight="600" letter-spacing="18" fill="#f0566a">EXPRESS</text>
<text x="600" y="520" text-anchor="middle" font-family="Public Sans, Arial, sans-serif" font-size="30" fill="#c9ccd1">Daily Island freight &amp; tailgate delivery · Vancouver Island, BC</text>
</svg>
`
writeFileSync(at('public/og-image.svg'), og)
console.log('favicon.svg, eaglewing-app-icon.svg, og-image.svg written')
