/**
 * Traces the client's wings-and-shield logo (brand/source/eaglewing-logo-wings.png)
 * into public/eaglewing-mark.svg (also copied to brand/).
 *
 *   node scripts/trace-logo.mjs
 *
 * Three layers are traced separately:
 *   back  — the whole mark, slightly grown, filled charcoal (keeps the feather
 *           outlines visible on white backgrounds such as the truck)
 *   white — white feathers and shield
 *   red   — crimson feathers and shield line
 * Only needed again if the source logo changes.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'
import potrace from 'potrace'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = PNG.sync.read(readFileSync(join(root, 'brand/source/eaglewing-logo-wings.png')))

// Mark area (wings + shield) in the source image, with a small margin.
const X0 = 60, Y0 = 85, X1 = 948, Y1 = 400
const SCALE = 3 // upsample before tracing for smoother curves
const w = X1 - X0, h = Y1 - Y0
const BG = [28, 31, 39]

const at = (x, y) => {
  const i = (y * src.width + x) * 4
  return [src.data[i], src.data[i + 1], src.data[i + 2]]
}
/** 0..1 coverage maps from colour distance to the three logo colours. */
function coverage(kind) {
  const m = new Float32Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const [r, g, b] = at(x + X0, y + Y0)
      let v
      if (kind === 'white') v = (Math.min(r, g, b) - BG[2]) / (240 - BG[2])
      else if (kind === 'red') v = r > 70 && r - g > 40 ? Math.min(1, (r - g) / 140) : 0
      else v = Math.min(1, Math.max(Math.abs(r - BG[0]), Math.abs(g - BG[1]), Math.abs(b - BG[2])) / 60)
      if (kind === 'white' && r - g > 40) v = 0 // red pixels are not white
      m[y * w + x] = Math.max(0, Math.min(1, v))
    }
  return m
}
/** Grow (dilate) a binary mask by r pixels — used for the charcoal backing. */
function grow(m, r) {
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let dy = -r; dy <= r && !v; dy++)
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy > r * r) continue
          const xx = x + dx, yy = y + dy
          if (xx >= 0 && yy >= 0 && xx < w && yy < h && m[yy * w + xx] > 0.5) { v = 1; break }
        }
      out[y * w + x] = v
    }
  return out
}
/** Fill enclosed holes (e.g. the W inside the shield) so the backing is solid inside. */
function fillHoles(m) {
  const seen = new Uint8Array(w * h)
  const stack = []
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)
  while (stack.length) {
    const i = stack.pop()
    if (seen[i] || m[i] > 0.5) continue
    seen[i] = 1
    const x = i % w, y = (i / w) | 0
    if (x > 0) stack.push(i - 1)
    if (x < w - 1) stack.push(i + 1)
    if (y > 0) stack.push(i - w)
    if (y < h - 1) stack.push(i + w)
  }
  const out = new Float32Array(w * h)
  for (let i = 0; i < w * h; i++) out[i] = seen[i] ? 0 : 1
  return out
}
/** Bilinear upsample to a black-on-white PNG for potrace. */
function toPng(m) {
  const W = w * SCALE, H = h * SCALE
  const png = new PNG({ width: W, height: H })
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const fx = Math.min(w - 1.001, Math.max(0, x / SCALE - 0.5)), fy = Math.min(h - 1.001, Math.max(0, y / SCALE - 0.5))
      const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0
      const v =
        m[y0 * w + x0] * (1 - tx) * (1 - ty) + m[y0 * w + x0 + 1] * tx * (1 - ty) +
        m[(y0 + 1) * w + x0] * (1 - tx) * ty + m[(y0 + 1) * w + x0 + 1] * tx * ty
      const c = v > 0.5 ? 0 : 255
      const i = (y * W + x) * 4
      png.data[i] = png.data[i + 1] = png.data[i + 2] = c
      png.data[i + 3] = 255
    }
  return PNG.sync.write(png)
}
const trace = (buf) =>
  new Promise((res, rej) =>
    potrace.trace(buf, { threshold: 128, turdSize: 40, optTolerance: 1.2, alphaMax: 1 }, (err, svg) => {
      if (err) return rej(err)
      const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ')
      // Scale path coordinates back down to source pixels and round.
      res(d.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round((+n / SCALE) * 4) / 4)))
    }),
  )

const white = coverage('white')
const red = coverage('red')
const any = coverage('any')
const back = fillHoles(grow(any, 3))

// Split into left wing, right wing and shield so the wings can flap.
// Shield outline measured on the source image (source pixels), shifted into mark coordinates.
const SHIELD = [
  [456, 231], [552, 231], [552, 300], [547, 326], [534, 349], [519, 364], [504, 376],
  [489, 364], [474, 349], [461, 326], [456, 300],
].map(([x, y]) => [x - X0, y - Y0])
const MID = 504 - X0
const PIVOT_L = [470 - X0, 238 - Y0] // left shoulder (top-left of shield)
const PIVOT_R = [538 - X0, 238 - Y0] // right shoulder
const inShield = (x, y) => {
  let inside = false
  for (let i = 0, j = SHIELD.length - 1; i < SHIELD.length; j = i++) {
    const [xi, yi] = SHIELD[i], [xj, yj] = SHIELD[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
const region = (m, keep) => {
  const out = new Float32Array(w * h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (keep(x, y)) out[y * w + x] = m[y * w + x]
  return out
}
const parts = {
  l: (x, y) => x < MID && !inShield(x, y),
  r: (x, y) => x >= MID && !inShield(x, y),
  s: (x, y) => inShield(x, y),
}
const layers = {}
for (const [k, keep] of Object.entries(parts)) {
  layers[k] = await Promise.all([back, white, red].map((m) => trace(toPng(region(m, keep)))))
}
const group = (id, [b, wt, r]) =>
  `<g id="${id}"><path d="${b}" fill="#1b1f27" fill-rule="evenodd"/><path d="${wt}" fill="#ffffff" fill-rule="evenodd"/><path d="${r}" fill="#d7263d" fill-rule="evenodd"/></g>`
const body = group('wing-l', layers.l) + group('wing-r', layers.r) + group('shield', layers.s)
const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><title>EagleWing Express</title>`

// Static mark (truck livery, share image, watermarks)
const svg = `${open}${body}</svg>\n`
writeFileSync(join(root, 'public/eaglewing-mark.svg'), svg)
writeFileSync(join(root, 'brand/eaglewing-mark.svg'), svg)

// Flying mark: two wing beats (wings rise and fold in, then sweep down and open), then a short glide.
// The animation lives inside the SVG, so it also plays when used as an <img>. Honours reduced motion.
const [lx, ly] = PIVOT_L
const [rx, ry] = PIVOT_R
const css = [
  `#bird{transform-origin:${w / 2}px ${ly}px;animation:lift 2.8s ease-in-out infinite}`,
  `#wing-l{transform-origin:${lx}px ${ly}px;animation:flap-l 2.8s ease-in-out infinite}`,
  `#wing-r{transform-origin:${rx}px ${ry}px;animation:flap-r 2.8s ease-in-out infinite}`,
  '@keyframes flap-l{0%,62%,100%{transform:none}14%{transform:rotate(24deg) scaleX(.78)}30%{transform:rotate(-16deg) scaleX(.94)}44%{transform:rotate(22deg) scaleX(.8)}56%{transform:rotate(-8deg)}}',
  '@keyframes flap-r{0%,62%,100%{transform:none}14%{transform:rotate(-24deg) scaleX(.78)}30%{transform:rotate(16deg) scaleX(.94)}44%{transform:rotate(-22deg) scaleX(.8)}56%{transform:rotate(8deg)}}',
  '@keyframes lift{0%,62%,100%{transform:none}14%{transform:translateY(6px)}30%{transform:translateY(-10px)}44%{transform:translateY(4px)}56%{transform:translateY(-6px)}}',
  '@media (prefers-reduced-motion:reduce){#bird,#wing-l,#wing-r{animation:none}}',
].join('')
// Extra room above and below so raised wing tips are not cut off (keep in sync with FLY_PAD_* in src/data/brand.js).
const PAD_TOP = 150
const PAD_BOTTOM = 20
const flyH = h + PAD_TOP + PAD_BOTTOM
const flyOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${-PAD_TOP} ${w} ${flyH}" width="${w}" height="${flyH}"><title>EagleWing Express</title>`
const fly = `${flyOpen}<style>${css}</style><g id="bird">${body}</g></svg>\n`
writeFileSync(join(root, 'public/eaglewing-mark-fly.svg'), fly)
console.log(`eaglewing-mark.svg ${(svg.length / 1024).toFixed(1)} KB, eaglewing-mark-fly.svg ${(fly.length / 1024).toFixed(1)} KB`)
