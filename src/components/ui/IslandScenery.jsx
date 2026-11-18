/**
 * Layered Vancouver Island backdrop for the moving truck:
 *   far  — Island mountain range (Vancouver Island Ranges) with snow caps
 *   mid  — Victoria skyline (incl. a BC Parliament Buildings–style dome),
 *          then the evergreen forest of the mid/north Island
 * Each layer is a wide strip; the parent shifts them at different speeds
 * (parallax) as the page scrolls.
 */

const W = 2600

// deterministic pseudo-random so the scene is identical on every render
const rnd = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function mountainsPath(height, seed, step = 140) {
  let d = `M0 ${height}`
  for (let x = 0, i = 0; x <= W; x += step, i++) {
    const peak = height * (0.15 + rnd(i + seed) * 0.55)
    d += ` L${x + step / 2} ${peak.toFixed(1)} L${x + step} ${(height * (0.55 + rnd(i + seed + 50) * 0.3)).toFixed(1)}`
  }
  return `${d} L${W} ${height} Z`
}

function snowCaps(height, seed, step = 140) {
  const caps = []
  for (let x = 0, i = 0; x <= W; x += step, i++) {
    const peakY = height * (0.15 + rnd(i + seed) * 0.55)
    if (peakY < height * 0.38) {
      const cx = x + step / 2
      caps.push(`M${cx - 16} ${peakY + 16} L${cx} ${peakY} L${cx + 16} ${peakY + 16} L${cx + 6} ${peakY + 12} L${cx} ${peakY + 18} L${cx - 7} ${peakY + 11} Z`)
    }
  }
  return caps.join(' ')
}

/** Far mountain layer. */
export function Mountains({ className = '', style }) {
  const H = 150
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMax slice" className={className} style={style} aria-hidden="true">
      <path d={mountainsPath(H, 7, 180)} fill="#e7eaee" />
      <path d={mountainsPath(H, 3)} fill="#d6dbe1" />
      <path d={snowCaps(H, 3)} fill="#ffffff" opacity="0.9" />
    </svg>
  )
}

function Tree({ x, h, fill }) {
  const w = h * 0.42
  return (
    <g fill={fill}>
      <rect x={x - 2} y={-8} width="4" height="10" />
      <path d={`M${x} ${-h} L${x + w * 0.55} ${-h * 0.55} L${x + w * 0.3} ${-h * 0.55} L${x + w * 0.75} ${-h * 0.18} L${x + w * 0.4} ${-h * 0.18} L${x + w} ${-6} L${x - w} ${-6} L${x - w * 0.4} ${-h * 0.18} L${x - w * 0.75} ${-h * 0.18} L${x - w * 0.3} ${-h * 0.55} L${x - w * 0.55} ${-h * 0.55} Z`} />
    </g>
  )
}

/** Mid layer: Victoria skyline, legislature dome, then forest. */
export function CityToForest({ className = '', style }) {
  const H = 130
  const ground = H
  const city = '#b9c1ca'
  const dome = '#a7b0ba'
  const trees = []
  for (let x = 820, i = 0; x < W; i++) {
    const h = 46 + rnd(i + 11) * 52
    trees.push({ x, h, fill: rnd(i + 99) > 0.5 ? '#9aa6b1' : '#8996a2' })
    x += 16 + rnd(i + 31) * 22
  }
  const buildings = [
    [20, 48, 58], [74, 36, 82], [116, 52, 46], [174, 30, 96], [210, 44, 64], [262, 34, 74],
    [620, 40, 70], [666, 30, 94], [702, 46, 58], [754, 34, 40],
  ]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMax slice" className={className} style={style} aria-hidden="true">
      <g transform={`translate(0 ${ground})`}>
        {/* downtown blocks with window rows */}
        {buildings.map(([x, w, h]) => (
          <g key={x}>
            <rect x={x} y={-h} width={w} height={h} fill={city} />
            {Array.from({ length: Math.floor(h / 14) }, (_, r) => (
              <rect key={r} x={x + 5} y={-h + 7 + r * 14} width={w - 10} height="3" fill="#ffffff" opacity="0.35" />
            ))}
          </g>
        ))}
        {/* Parliament-style building: long façade, central drum + dome, end towers */}
        <g fill={dome}>
          <rect x="320" y="-42" width="280" height="42" />
          <rect x="314" y="-58" width="34" height="58" />
          <rect x="572" y="-58" width="34" height="58" />
          <path d="M314 -58 L331 -72 L348 -58 Z M572 -58 L589 -72 L606 -58 Z" />
          <rect x="420" y="-66" width="80" height="24" />
          <rect x="430" y="-80" width="60" height="16" />
          <path d="M428 -80 A32 30 0 0 1 492 -80 Z" />
          <rect x="454" y="-120" width="12" height="14" />
          <path d="M460 -134 L464 -120 L456 -120 Z" />
          {Array.from({ length: 13 }, (_, i) => (
            <rect key={i} x={330 + i * 20} y="-34" width="8" height="18" fill="#ffffff" opacity="0.4" />
          ))}
        </g>
        {/* forest */}
        {trees.map((t, i) => (
          <Tree key={i} {...t} />
        ))}
      </g>
    </svg>
  )
}
