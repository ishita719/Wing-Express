/**
 * Builds the realistic truck image used on the website (public/truck.png)
 * from the reference photo (brand/source/truck-reference.png):
 *
 *   1. removes the maker's badge from the grille and the model name from the door
 *   2. removes the white background; the ground shadow becomes soft transparency
 *   3. mirrors the photo so the truck faces right (it drives left → right on the site)
 *   4. paints the EagleWing Express livery onto the box side in correct perspective,
 *      blended with the panel's own shading so it looks painted on
 *   5. crops tightly and writes a 2× PNG plus the measurements the site needs
 *
 *   node scripts/make-truck.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'
import { PNG } from 'pngjs'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const at = (p) => join(root, p)
const src = PNG.sync.read(readFileSync(at('brand/source/truck-reference.png')))
const W = src.width
const H = src.height
const SCALE = 2 // output resolution multiplier

// ── pixel helpers on a Float32 RGBA buffer ─────────────────────────────
const img = new Float32Array(W * H * 4)
for (let i = 0; i < W * H * 4; i++) img[i] = src.data[i]
const idx = (x, y) => (y * W + x) * 4
const get = (x, y) => {
  const i = idx(x, y)
  return [img[i], img[i + 1], img[i + 2], img[i + 3]]
}
const set = (x, y, [r, g, b, a = 255]) => {
  const i = idx(x, y)
  img[i] = r
  img[i + 1] = g
  img[i + 2] = b
  img[i + 3] = a
}

// 1a. Grille badge (x 129–149, y 198–219): copy the chrome bars from just right of it.
for (let y = 196; y <= 221; y++)
  for (let x = 128; x <= 150; x++) {
    const t = (x - 128) / 22
    const a = get(x + 24, y) // bars to the right
    const b = get(x - 24 < 100 ? x + 30 : x - 24, y) // bars to the left
    set(x, y, a.map((v, k) => v * (1 - t * 0.5) + b[k] * (t * 0.5)))
  }
// 1b. Model name on the door (around x 292–318, y 233–241): fill with the door paint above it.
for (let y = 232; y <= 242; y++)
  for (let x = 290; x <= 320; x++) set(x, y, get(x, 226))

// 2. Background (250,250,250) → transparent, flood-filled from the edges; top text rows dropped.
const BG = 250
const isBg = (x, y) => {
  const [r, g, b] = get(x, y)
  return Math.abs(r - BG) <= 6 && Math.abs(g - BG) <= 6 && Math.abs(b - BG) <= 6
}
const bg = new Uint8Array(W * H)
const stack = []
for (let x = 0; x < W; x++) stack.push([x, H - 1], [x, 0])
for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y])
while (stack.length) {
  const [x, y] = stack.pop()
  if (x < 0 || y < 0 || x >= W || y >= H || bg[y * W + x]) continue
  const edge = x < 3 || x >= W - 3 || y >= H - 3 // the screenshot has a faint border
  if (y > 30 && !edge && !isBg(x, y)) continue
  bg[y * W + x] = 1
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
}
// Wheels keep full opacity (their chrome rims are neutral grey like the shadow).
const WHEELS = [
  [257, 287, 38, 43], // near front
  [437, 276, 24, 29], // near rear duals
  [132, 296, 34, 22], // far front, under the bumper
]
const inWheel = (x, y) => WHEELS.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1)
// Background seen through gaps under the chassis (enclosed, so the flood fill can't reach it).
// Tighter colour match than above, so the cab's white paint (243,246,247) is never touched.
{
  const seen = new Uint8Array(W * H)
  const tight = (x, y) => {
    const [r, g, b] = get(x, y)
    return Math.abs(r - BG) <= 3 && Math.abs(g - BG) <= 3 && Math.abs(b - BG) <= 3
  }
  for (let y0 = 245; y0 < H; y0++)
    for (let x0 = 0; x0 < W; x0++) {
      if (bg[y0 * W + x0] || seen[y0 * W + x0] || !tight(x0, y0)) continue
      const comp = []
      const st = [[x0, y0]]
      while (st.length) {
        const [x, y] = st.pop()
        if (x < 0 || y < 0 || x >= W || y >= H) continue
        const k = y * W + x
        if (seen[k] || bg[k] || !tight(x, y)) continue
        seen[k] = 1
        comp.push(k)
        st.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
      }
      if (comp.length >= 6) comp.forEach((k) => (bg[k] = 1))
    }
  // Under the box (behind the cab, below the box floor) there is no white paint at all, so any
  // light, near-neutral pixel there is background showing through the chassis.
  for (let y = 243; y < H; y++)
    for (let x = 332; x < W; x++) {
      if (inWheel(x, y)) continue
      const [r, g, b] = get(x, y)
      if (Math.min(r, g, b) >= 214 && Math.max(r, g, b) - Math.min(r, g, b) < 18) bg[y * W + x] = 1
    }
}
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    if (bg[y * W + x]) {
      set(x, y, [0, 0, 0, 0])
      continue
    }
    // Ground shadow: neutral grey pixels below the chassis → black with matching transparency.
    const [r, g, b] = get(x, y)
    const lum = (r + g + b) / 3
    const neutral = Math.max(r, g, b) - Math.min(r, g, b) < 16
    if (y >= 291 && neutral && !inWheel(x, y)) {
      const a = Math.min(1, Math.max(0, (BG - lum) / BG)) * 255 * 0.95
      set(x, y, [10, 12, 16, a])
      continue
    }
    // Soften the outermost pixels so no light halo shows on dark backgrounds.
    const touchesBg =
      (x > 0 && bg[y * W + x - 1]) || (x < W - 1 && bg[y * W + x + 1]) || (y > 0 && bg[(y - 1) * W + x]) || (y < H - 1 && bg[(y + 1) * W + x])
    if (touchesBg) set(x, y, [r, g, b, lum > 225 ? 70 : 170])
  }

// 3. Mirror horizontally (truck faces right).
const flipped = new Float32Array(W * H * 4)
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const s = idx(x, y)
    const d = idx(W - 1 - x, y)
    for (let k = 0; k < 4; k++) flipped[d + k] = img[s + k]
  }

// Upscale to SCALE× (bilinear) so the painted livery can be sharp.
const OW = W * SCALE
const OH = H * SCALE
const out = new Float32Array(OW * OH * 4)
for (let y = 0; y < OH; y++)
  for (let x = 0; x < OW; x++) {
    const fx = Math.min(W - 1.001, Math.max(0, (x + 0.5) / SCALE - 0.5))
    const fy = Math.min(H - 1.001, Math.max(0, (y + 0.5) / SCALE - 0.5))
    const x0 = Math.floor(fx)
    const y0 = Math.floor(fy)
    const tx = fx - x0
    const ty = fy - y0
    const o = (y * OW + x) * 4
    // premultiplied-alpha bilinear, so transparent edges don't turn grey
    let a = 0
    const c = [0, 0, 0]
    for (const [dx, dy, wgt] of [[0, 0, (1 - tx) * (1 - ty)], [1, 0, tx * (1 - ty)], [0, 1, (1 - tx) * ty], [1, 1, tx * ty]]) {
      const i = ((y0 + dy) * W + x0 + dx) * 4
      const pa = flipped[i + 3] * wgt
      a += pa
      for (let k = 0; k < 3; k++) c[k] += flipped[i + k] * pa
    }
    out[o + 3] = a
    for (let k = 0; k < 3; k++) out[o + k] = a > 0 ? c[k] / a : 0
  }

// 4. Livery on the box side. Side corners measured on the photo, mirrored (x → W-1-x), then scaled.
const m = ([x, y]) => [(W - 1 - x) * SCALE, y * SCALE]
const quad = {
  tl: m([485, 133]), // rear top
  tr: m([343, 58]), // front top (by the cab)
  br: m([347, 232]), // front bottom
  bl: m([487, 240]), // rear bottom
}

// Quicksand ships as WOFF; convert to TTF so the renderer can use the real logo font.
function woffToTtf(buf) {
  const numTables = buf.readUInt16BE(12)
  const flavor = buf.readUInt32BE(4)
  const tables = []
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20
    tables.push({
      tag: buf.readUInt32BE(o), offset: buf.readUInt32BE(o + 4), compLength: buf.readUInt32BE(o + 8),
      origLength: buf.readUInt32BE(o + 12), checksum: buf.readUInt32BE(o + 16),
    })
  }
  const header = Buffer.alloc(12 + 16 * numTables)
  header.writeUInt32BE(flavor, 0)
  header.writeUInt16BE(numTables, 4)
  let p2 = 1, e = 0
  while (p2 * 2 <= numTables) { p2 *= 2; e++ }
  header.writeUInt16BE(p2 * 16, 6)
  header.writeUInt16BE(e, 8)
  header.writeUInt16BE(numTables * 16 - p2 * 16, 10)
  const datas = []
  let offset = header.length
  tables.forEach((t, i) => {
    const raw = buf.subarray(t.offset, t.offset + t.compLength)
    const data = t.compLength < t.origLength ? inflateSync(raw) : Buffer.from(raw)
    const padded = Buffer.alloc((data.length + 3) & ~3)
    data.copy(padded)
    const h = 12 + i * 16
    header.writeUInt32BE(t.tag, h)
    header.writeUInt32BE(t.checksum, h + 4)
    header.writeUInt32BE(offset, h + 8)
    header.writeUInt32BE(t.origLength, h + 12)
    datas.push(padded)
    offset += padded.length
  })
  return Buffer.concat([header, ...datas])
}
const fontDir = at('node_modules/@fontsource/quicksand/files')
const fontFiles = ['500', '600'].map((w) => {
  const f = join(root, 'node_modules', '.cache-quicksand-' + w + '.ttf')
  writeFileSync(f, woffToTtf(readFileSync(join(fontDir, `quicksand-latin-${w}-normal.woff`))))
  return f
})

// Flat livery artwork in the side's real proportions (about 2.3 : 1, length : height).
const PW = 2300
const PH = 1000
const markInner = readFileSync(at('public/eaglewing-mark.svg'), 'utf8').match(/<(?:g|path)[\s\S]*<\/svg>/)[0].replace('</svg>', '')
const phone = JSON.parse(readFileSync(at('src/data/site.js'), 'utf8').match(/phone:\s*('[^']+'|"[^"]+")/)[1].replace(/'/g, '"'))
const livery = `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}">
<svg x="${PW / 2 - 600}" y="10" width="1200" height="${(1200 * 315) / 888}" viewBox="0 0 888 315">${markInner}</svg>
<text x="${PW / 2}" y="690" text-anchor="middle" font-family="Quicksand" font-weight="500" font-size="280" fill="#1b1f27">EagleWing</text>
<text x="${PW / 2 + 30}" y="800" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="88" letter-spacing="56" fill="#d7263d">EXPRESS</text>
<rect x="${PW / 2 - 620}" y="845" width="1240" height="10" fill="#d7263d"/>
<text x="${PW / 2}" y="950" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="76" fill="#3b4250">${phone} · Vancouver Island, BC</text>
</svg>`
const lv = new Resvg(livery, { font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Quicksand' } }).render()
const LW = lv.width
const LH = lv.height
const lpx = lv.pixels // RGBA, premultiplied? resvg returns straight RGBA

// Homography mapping livery rect → side quad; we need the inverse (quad → livery).
function homography(srcPts, dstPts) {
  const A = []
  const b = []
  for (let i = 0; i < 4; i++) {
    const [x, y] = srcPts[i]
    const [u, v] = dstPts[i]
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u)
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v)
  }
  // Gaussian elimination
  for (let c = 0; c < 8; c++) {
    let p = c
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r
    ;[A[c], A[p]] = [A[p], A[c]];[b[c], b[p]] = [b[p], b[c]]
    for (let r = 0; r < 8; r++) {
      if (r === c) continue
      const f = A[r][c] / A[c][c]
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k]
      b[r] -= f * b[c]
    }
  }
  const h = b.map((v, i) => v / A[i][i])
  return [...h, 1]
}
// Inset so the livery stays clear of the top rail, corner posts and bottom rail.
const inset = (t, s) => [quad.tl[0] + (quad.tr[0] - quad.tl[0]) * t + ((quad.bl[0] - quad.tl[0]) + ((quad.br[0] - quad.tr[0]) - (quad.bl[0] - quad.tl[0])) * t) * s,
  quad.tl[1] + (quad.tr[1] - quad.tl[1]) * t + ((quad.bl[1] - quad.tl[1]) + ((quad.br[1] - quad.tr[1]) - (quad.bl[1] - quad.tl[1])) * t) * s]
const dst = [inset(0.06, 0.1), inset(0.94, 0.1), inset(0.94, 0.9), inset(0.06, 0.9)]
const Hinv = homography(dst, [[0, 0], [LW, 0], [LW, LH], [0, LH]])
const minX = Math.floor(Math.min(...dst.map((p) => p[0])))
const maxX = Math.ceil(Math.max(...dst.map((p) => p[0])))
const minY = Math.floor(Math.min(...dst.map((p) => p[1])))
const maxY = Math.ceil(Math.max(...dst.map((p) => p[1])))
const SS = 3 // supersampling per output pixel
for (let y = minY; y <= maxY; y++)
  for (let x = minX; x <= maxX; x++) {
    let cr = 0, cg = 0, cb = 0, ca = 0
    for (let sy = 0; sy < SS; sy++)
      for (let sx = 0; sx < SS; sx++) {
        const px = x + (sx + 0.5) / SS
        const py = y + (sy + 0.5) / SS
        const wq = Hinv[6] * px + Hinv[7] * py + 1
        const u = (Hinv[0] * px + Hinv[1] * py + Hinv[2]) / wq
        const v = (Hinv[3] * px + Hinv[4] * py + Hinv[5]) / wq
        if (u < 0 || v < 0 || u >= LW || v >= LH) continue
        const i = ((v | 0) * LW + (u | 0)) * 4
        const a = lpx[i + 3] / 255
        cr += lpx[i] * a; cg += lpx[i + 1] * a; cb += lpx[i + 2] * a; ca += a
      }
    if (!ca) continue
    const n = SS * SS
    const a = ca / n
    const o = (y * OW + x) * 4
    // Painted-on look: livery colour × the panel's own light (panel is ~240 at its brightest).
    const shade = Math.min(1.04, ((out[o] + out[o + 1] + out[o + 2]) / 3) / 238)
    const lr = (cr / ca) * shade, lg = (cg / ca) * shade, lb = (cb / ca) * shade
    out[o] = out[o] * (1 - a) + lr * a
    out[o + 1] = out[o + 1] * (1 - a) + lg * a
    out[o + 2] = out[o + 2] * (1 - a) + lb * a
  }

// 5. Crop to content and write.
let cx0 = OW, cx1 = 0, cy0 = OH, cy1 = 0
for (let y = 0; y < OH; y++)
  for (let x = 0; x < OW; x++)
    if (out[(y * OW + x) * 4 + 3] > 8) {
      cx0 = Math.min(cx0, x); cx1 = Math.max(cx1, x); cy0 = Math.min(cy0, y); cy1 = Math.max(cy1, y)
    }
const CW = cx1 - cx0 + 1
const CH = cy1 - cy0 + 1
const png = new PNG({ width: CW, height: CH })
for (let y = 0; y < CH; y++)
  for (let x = 0; x < CW; x++) {
    const s = ((y + cy0) * OW + x + cx0) * 4
    const d = (y * CW + x) * 4
    for (let k = 0; k < 4; k++) png.data[d + k] = Math.max(0, Math.min(255, Math.round(out[s + k])))
  }
writeFileSync(at('public/truck.png'), PNG.sync.write(png, { colorType: 6 }))

// Measurements the site uses to sit the tyres on the road (fractions of the image height).
const rearContact = (302 * SCALE - cy0) / CH // far/rear tyres touch the ground here
const frontContact = (329 * SCALE - cy0) / CH // near front tyre (lowest point)
writeFileSync(
  at('src/data/truck.js'),
  `/* Generated by scripts/make-truck.mjs — do not edit by hand. */
export const TRUCK_SRC = '/truck.png'
export const TRUCK_W = ${CW}
export const TRUCK_H = ${CH}
/** Where the tyres meet the ground, as a fraction of the image height. */
export const TRUCK_REAR_CONTACT = ${rearContact.toFixed(4)}
export const TRUCK_FRONT_CONTACT = ${frontContact.toFixed(4)}
`,
)
console.log(`truck.png ${CW}×${CH}, ${(readFileSync(at('public/truck.png')).length / 1024).toFixed(0)} KB; rear contact ${rearContact.toFixed(3)}, front ${frontContact.toFixed(3)}`)
