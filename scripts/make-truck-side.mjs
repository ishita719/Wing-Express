/**
 * Builds the website truck (public/truck.png + spinning rim images + src/data/truck.js)
 * from the side-view photo brand/source/truck-side.png:
 *
 *   1. cuts the truck out of the road scene along a traced outline (box, cab, chassis,
 *      rear steps, mud flap, fuel tank and wheels), with soft anti-aliased edges
 *   2. paints the EagleWing Express livery onto the flat box side, blended with the
 *      panel's own light and rivets so it looks painted on
 *   3. cuts each wheel rim out as a round image the site spins while the truck drives
 *
 *   node scripts/make-truck-side.mjs
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'
import { PNG } from 'pngjs'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const at = (p) => join(root, p)
const src = PNG.sync.read(readFileSync(at('brand/source/truck-side.png')))
const W = src.width
const H = src.height

// ── 1. Outline (source pixels), traced on the photo ──────────────────────
const BODY = [
  [111, 112], [895, 110], [915, 113], [928, 122], [932, 140], // box top + rounded front cap
  [932, 268], [946, 266], [1097, 266], [1109, 279], [1119, 382], // cab roof + windshield pillar
  [1180, 390], [1240, 402], [1272, 418], [1286, 436], [1291, 478], // hood
  [1300, 500], [1303, 520], [1302, 548], [1265, 553], // headlight + bumper
  [1100, 560], [1085, 578], [935, 578], [930, 524], // cab step + fuel tank
  [170, 524], [150, 505], [122, 482], [111, 482], // chassis under the box (rear step frame left out)
]
const FLAP = [[313, 478], [343, 478], [343, 586], [313, 586]]
const WHEELS = [
  { id: 'rear', cx: 430, cy: 553, r: 68, rim: 40 },
  { id: 'front', cx: 1177, cy: 552, r: 70, rim: 41 },
]
const inPoly = (poly, x, y) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}
const inTruck = (x, y) =>
  inPoly(BODY, x, y) || inPoly(FLAP, x, y) || WHEELS.some((w) => (x - w.cx) ** 2 + (y - w.cy) ** 2 <= w.r ** 2)

// Under the truck the real chassis is near-black; light, road-coloured pixels there are the
// road showing through gaps, so they are dropped (wheels, mud flap and fuel tank are kept).
const inWheel = (x, y) => WHEELS.some((w) => (x - w.cx) ** 2 + (y - w.cy) ** 2 <= (w.r + 1) ** 2)
const isRoadGap = (x, y) => {
  const under = (y > 500 && x < 930) || (y > 558 && x >= 930 && x < 1100)
  if (!under || inWheel(x, y) || inPoly(FLAP, x, y)) return false
  const i = (Math.round(y) * W + Math.round(x)) * 4
  const lum = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3
  return lum > 72
}

// coverage with 4×4 supersampling → smooth edges
const alpha = new Float32Array(W * H)
const SS = 4
for (let y = 100; y < 640; y++)
  for (let x = 60; x < 1320; x++) {
    let n = 0
    for (let sy = 0; sy < SS; sy++)
      for (let sx = 0; sx < SS; sx++) if (inTruck(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS)) n++
    alpha[y * W + x] = isRoadGap(x, y) ? 0 : n / (SS * SS)
  }

const out = new Float32Array(W * H * 4)
for (let i = 0; i < W * H; i++) {
  for (let k = 0; k < 3; k++) out[i * 4 + k] = src.data[i * 4 + k]
  out[i * 4 + 3] = alpha[i] * 255
}

// ── 2. Livery on the box side (flat in a side view) ──────────────────────
function woffToTtf(buf) {
  const numTables = buf.readUInt16BE(12)
  const tables = []
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20
    tables.push({ tag: buf.readUInt32BE(o), offset: buf.readUInt32BE(o + 4), compLength: buf.readUInt32BE(o + 8), origLength: buf.readUInt32BE(o + 12), checksum: buf.readUInt32BE(o + 16) })
  }
  const header = Buffer.alloc(12 + 16 * numTables)
  header.writeUInt32BE(buf.readUInt32BE(4), 0)
  header.writeUInt16BE(numTables, 4)
  let p2 = 1, e = 0
  while (p2 * 2 <= numTables) { p2 *= 2; e++ }
  header.writeUInt16BE(p2 * 16, 6); header.writeUInt16BE(e, 8); header.writeUInt16BE(numTables * 16 - p2 * 16, 10)
  const datas = []
  let offset = header.length
  tables.forEach((t, i) => {
    const raw = buf.subarray(t.offset, t.offset + t.compLength)
    const data = t.compLength < t.origLength ? inflateSync(raw) : Buffer.from(raw)
    const padded = Buffer.alloc((data.length + 3) & ~3)
    data.copy(padded)
    const h = 12 + i * 16
    header.writeUInt32BE(t.tag, h); header.writeUInt32BE(t.checksum, h + 4); header.writeUInt32BE(offset, h + 8); header.writeUInt32BE(t.origLength, h + 12)
    datas.push(padded)
    offset += padded.length
  })
  return Buffer.concat([header, ...datas])
}
const fontDir = at('node_modules/@fontsource/quicksand/files')
const fontFiles = ['500', '600'].map((w) => {
  const f = at(`node_modules/.cache-quicksand-${w}.ttf`)
  writeFileSync(f, woffToTtf(readFileSync(join(fontDir, `quicksand-latin-${w}-normal.woff`))))
  return f
})

// Box side panel area (between the corner posts and rails)
const PX0 = 132, PY0 = 128, PX1 = 892, PY1 = 466
const PW = PX1 - PX0
const PH = PY1 - PY0
const LS = 3 // render the livery at 3× and downsample for crisp edges
const markInner = readFileSync(at('public/eaglewing-mark.svg'), 'utf8').match(/<(?:g|path)[\s\S]*<\/svg>/)[0].replace('</svg>', '')
const phone = JSON.parse(readFileSync(at('src/data/site.js'), 'utf8').match(/phone:\s*('[^']+'|"[^"]+")/)[1].replace(/'/g, '"'))
const cx = PW / 2
const markW = 330
const livery = `<svg xmlns="http://www.w3.org/2000/svg" width="${PW * LS}" height="${PH * LS}" viewBox="0 0 ${PW} ${PH}">
<svg x="${cx - markW / 2}" y="14" width="${markW}" height="${(markW * 315) / 888}" viewBox="0 0 888 315">${markInner}</svg>
<text x="${cx}" y="218" text-anchor="middle" font-family="Quicksand" font-weight="500" font-size="92" fill="#1b1f27" letter-spacing="-1">EagleWing</text>
<text x="${cx + 8}" y="252" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="25" letter-spacing="16" fill="#d7263d">EXPRESS</text>
<text x="${cx}" y="284" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="20" fill="#3b4250">${phone} · Vancouver Island, BC</text>
<rect x="0" y="${PH - 28}" width="${PW}" height="14" fill="#d7263d"/>
</svg>`
const lv = new Resvg(livery, { font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Quicksand' } }).render()
const lpx = lv.pixels
const LW = lv.width
for (let y = 0; y < PH; y++)
  for (let x = 0; x < PW; x++) {
    // average the LS×LS block
    let r = 0, g = 0, b = 0, a = 0
    for (let sy = 0; sy < LS; sy++)
      for (let sx = 0; sx < LS; sx++) {
        const i = ((y * LS + sy) * LW + x * LS + sx) * 4
        const aa = lpx[i + 3] / 255
        r += lpx[i] * aa; g += lpx[i + 1] * aa; b += lpx[i + 2] * aa; a += aa
      }
    if (!a) continue
    const cov = a / (LS * LS)
    const o = ((PY0 + y) * W + PX0 + x) * 4
    // painted-on look: livery colour × the panel's own light (keeps rivets and shading)
    const shade = Math.min(1.05, (out[o] + out[o + 1] + out[o + 2]) / 3 / 222)
    out[o] = out[o] * (1 - cov) + (r / a) * shade * cov
    out[o + 1] = out[o + 1] * (1 - cov) + (g / a) * shade * cov
    out[o + 2] = out[o + 2] * (1 - cov) + (b / a) * shade * cov
  }
fontFiles.forEach((f) => rmSync(f, { force: true }))

// ── 3. Crop and write ─────────────────────────────────────────────────────
let x0 = W, x1 = 0, y0 = H, y1 = 0
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (alpha[y * W + x] > 0) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y) }
const CW = x1 - x0 + 1
const CH = y1 - y0 + 1
const png = new PNG({ width: CW, height: CH })
for (let y = 0; y < CH; y++)
  for (let x = 0; x < CW; x++) {
    const s = ((y + y0) * W + x + x0) * 4
    const d = (y * CW + x) * 4
    for (let k = 0; k < 4; k++) png.data[d + k] = Math.max(0, Math.min(255, Math.round(out[s + k])))
  }
writeFileSync(at('public/truck.png'), PNG.sync.write(png, { colorType: 6 }))

// Rims as round images (true circles in a side view)
const RS = 2
for (const w of WHEELS) {
  const R = w.rim * RS
  const size = R * 2
  const rim = new PNG({ width: size, height: size })
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const u = (x + 0.5 - R) / RS
      const v = (y + 0.5 - R) / RS
      const dist = Math.hypot(u, v) / w.rim
      if (dist > 1) continue
      const fx = w.cx + u, fy = w.cy + v
      const xa = Math.floor(fx), ya = Math.floor(fy), tx = fx - xa, ty = fy - ya
      const d = (y * size + x) * 4
      for (let k = 0; k < 3; k++) {
        const p = (xx, yy) => out[(yy * W + xx) * 4 + k]
        rim.data[d + k] = Math.round(p(xa, ya) * (1 - tx) * (1 - ty) + p(xa + 1, ya) * tx * (1 - ty) + p(xa, ya + 1) * (1 - tx) * ty + p(xa + 1, ya + 1) * tx * ty)
      }
      rim.data[d + 3] = Math.round(255 * Math.min(1, Math.max(0, (1 - dist) * w.rim * 0.8)))
    }
  writeFileSync(at(`public/truck-rim-${w.id}.png`), PNG.sync.write(rim, { colorType: 6 }))
}

const contact = (Math.max(...WHEELS.map((w) => w.cy + w.r)) - y0) / CH
writeFileSync(
  at('src/data/truck.js'),
  `/* Generated by scripts/make-truck-side.mjs — do not edit by hand. */
export const TRUCK_SRC = '/truck.png'
export const TRUCK_W = ${CW}
export const TRUCK_H = ${CH}
/** Where the tyres meet the ground, as a fraction of the image height (side view: all wheels). */
export const TRUCK_REAR_CONTACT = ${contact.toFixed(4)}
export const TRUCK_FRONT_CONTACT = ${contact.toFixed(4)}
/** Spinning wheel rims: centre and radii as fractions of the image width (x, rx) and height (y, ry). */
export const TRUCK_RIMS = ${JSON.stringify(
    WHEELS.map((w) => ({
      src: `/truck-rim-${w.id}.png`,
      x: +((w.cx - x0) / CW).toFixed(4),
      y: +((w.cy - y0) / CH).toFixed(4),
      rx: +(w.rim / CW).toFixed(4),
      ry: +(w.rim / CH).toFixed(4),
    })),
  )}
`,
)
console.log(`truck.png ${CW}×${CH}, ${(readFileSync(at('public/truck.png')).length / 1024).toFixed(0)} KB; tyre contact at ${contact.toFixed(3)}`)
