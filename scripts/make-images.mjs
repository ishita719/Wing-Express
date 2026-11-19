/**
 * Renders the PNG versions of the share image and app icons from SVG.
 * Social networks don't accept SVG for link previews, and phones/older
 * browsers need PNG icons. Run after changing the logo:
 *
 *   node scripts/make-images.mjs
 *
 * Outputs (committed to /public): og-image.png, favicon-32.png,
 * favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = (f) => join(root, 'public', f)

const render = (svg, width, out) => {
  const png = toPng(svg, width)
  writeFileSync(pub(out), png)
  console.log(`  ${out} (${width}px, ${(png.length / 1024).toFixed(1)} KB)`)
}

const toPng = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
  })
    .render()
    .asPng()


// Share image: swap the web fonts for widely available system fallbacks.
const og = readFileSync(pub('og-image.svg'), 'utf8').replaceAll('Quicksand, ', '').replaceAll('Public Sans, ', '')
render(og, 1200, 'og-image.png')

// App icons from the favicon (feather fan on a charcoal tile).
const icon = readFileSync(pub('favicon.svg'), 'utf8')
render(icon, 32, 'favicon-32.png')
render(icon, 180, 'apple-touch-icon.png')
render(icon, 192, 'icon-192.png')
render(icon, 512, 'icon-512.png')

// favicon.ico for old browsers and tools that only look for /favicon.ico (PNG images inside an ICO container).
const sizes = [16, 32, 48]
const pngs = sizes.map((s) => toPng(icon, s))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((s, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(s, e)
  header.writeUInt8(s, e + 1)
  header.writeUInt16LE(1, e + 4)
  header.writeUInt16LE(32, e + 6)
  header.writeUInt32LE(pngs[i].length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += pngs[i].length
})
writeFileSync(pub('favicon.ico'), Buffer.concat([header, ...pngs]))
console.log('  favicon.ico (16/32/48px)')
