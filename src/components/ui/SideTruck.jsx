import { useId } from 'react'
import { MARK_SRC, MARK_W, MARK_H } from '../../data/brand'
import { company } from '../../data/site'

/**
 * EagleWing Express box truck, straight side view (faces right), drawn with
 * realistic shading: conventional cab with hood and plastic wheel-arch flare,
 * tinted glass with reflections, west-coast mirror on arms, chrome bumper,
 * step and strapped fuel tank; aluminium-framed box with floor beams, rear-door
 * hinges, marker lights, red stripe and the EagleWing livery; dual rear wheels
 * with deep chrome rims. Wheels spin (`spinning`) or follow `wheelAngle`.
 */
const VB_W = 900
const VB_H = 360
const GROUND = 334 // where the tyres touch the road
const R_TYRE = 41
const FRONT_X = 752
const REAR_X = 170

/** Where the road's far edge sits (fraction of the drawing's height): above the
 *  tyre contact line, so the wheels roll on the road surface. */
export const SIDE_ROAD_EDGE = (GROUND - 34) / VB_H

const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]

function Wheel({ x, ids, dual = false, spinning, angle }) {
  const cy = GROUND - R_TYRE
  const spin = spinning ? 'wheel-spin animate-wheel' : 'wheel-spin'
  return (
    <g>
      {/* contact shadow */}
      <ellipse cx={x} cy={GROUND + 1} rx={R_TYRE * 0.95} ry="4" fill="#000" opacity="0.45" filter={`url(#${ids.blur2})`} />
      {/* tyre: rubber with sidewall shading */}
      <circle cx={x} cy={cy} r={R_TYRE} fill={`url(#${ids.tyre})`} />
      <circle cx={x} cy={cy} r={R_TYRE - 0.8} fill="none" stroke="#2f3238" strokeWidth="1.6" />
      <g className={spin} style={angle !== undefined ? { transform: `rotate(${angle}deg)` } : undefined}>
        {/* tread blocks */}
        {Array.from({ length: 28 }, (_, i) => {
          const [x1, y1] = polar(x, cy, R_TYRE - 0.5, i * (360 / 28))
          const [x2, y2] = polar(x, cy, R_TYRE - 4.5, i * (360 / 28))
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0a0b0d" strokeWidth="2.4" />
        })}
        {/* sidewall lettering hint */}
        <circle cx={x} cy={cy} r={R_TYRE - 9} fill="none" stroke="#3a3d44" strokeWidth="1" strokeDasharray="5 3 1 3" opacity="0.7" />
        {/* chrome rim with deep dish */}
        <circle cx={x} cy={cy} r="25" fill={`url(#${ids.rim})`} />
        <circle cx={x} cy={cy} r="25" fill="none" stroke="#6e757e" strokeWidth="1.4" />
        <circle cx={x} cy={cy} r="21.5" fill="none" stroke="#f7f9fb" strokeWidth="1.2" opacity="0.9" />
        {dual && <circle cx={x} cy={cy} r="18" fill={`url(#${ids.dish})`} />}
        {/* hand holes */}
        {Array.from({ length: 8 }, (_, i) => {
          const [hx, hy] = polar(x, cy, 17.5, i * 45 + 22.5)
          return <ellipse key={`h${i}`} cx={hx} cy={hy} rx="3.6" ry="2.6" transform={`rotate(${i * 45 + 22.5} ${hx} ${hy})`} fill="#2b2f35" />
        })}
        {/* hub with wheel nuts */}
        <circle cx={x} cy={cy} r="12" fill={`url(#${ids.hub})`} stroke="#7d848c" strokeWidth="0.8" />
        {Array.from({ length: 8 }, (_, i) => {
          const [nx, ny] = polar(x, cy, 9.2, i * 45)
          return <circle key={`n${i}`} cx={nx} cy={ny} r="1.7" fill="#f4f6f8" stroke="#6a7179" strokeWidth="0.6" />
        })}
        <circle cx={x} cy={cy} r="4.5" fill="#c9ced4" stroke="#6a7179" strokeWidth="0.8" />
      </g>
      {/* fixed light reflection on the rim (stays put while the wheel turns) */}
      <path d={`M${x - 18} ${cy - 10} A21 21 0 0 1 ${x - 4} ${cy - 20}`} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
    </g>
  )
}

export default function SideTruck({ className = 'w-full', spinning = false, wheelAngle }) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}${uid}`
  const ids = {
    tyre: id('ty'), rim: id('rm'), hub: id('hb'), dish: id('ds'), blur2: id('b2'),
  }
  const markW = 250
  const markH = (markW * MARK_H) / MARK_W
  const archL = FRONT_X - 52
  const archR = FRONT_X + 52

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        {/* soft blurs for shadows */}
        <filter id={id('b8')} x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id={ids.blur2} x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id={id('b1')}><feGaussianBlur stdDeviation="1" /></filter>

        {/* painted white panels: soft top light, darker toward the bottom */}
        <linearGradient id={id('box')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfdfe" />
          <stop offset="0.45" stopColor="#f6f8fa" />
          <stop offset="0.85" stopColor="#e9edf1" />
          <stop offset="1" stopColor="#d9dee4" />
        </linearGradient>
        <linearGradient id={id('boxX')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.06" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={id('cab')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f3f5f8" />
          <stop offset="0.8" stopColor="#e2e6eb" />
          <stop offset="1" stopColor="#c9cfd6" />
        </linearGradient>
        <linearGradient id={id('hood')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6eaee" />
        </linearGradient>
        {/* tinted glass with sky reflection */}
        <linearGradient id={id('glass')} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#5b7386" />
          <stop offset="0.35" stopColor="#2a3c4b" />
          <stop offset="1" stopColor="#0f171e" />
        </linearGradient>
        {/* polished aluminium / chrome */}
        <linearGradient id={id('chrome')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.3" stopColor="#c3c9d0" />
          <stop offset="0.5" stopColor="#f2f4f7" />
          <stop offset="0.75" stopColor="#9aa2ab" />
          <stop offset="1" stopColor="#dfe3e8" />
        </linearGradient>
        <linearGradient id={id('alu')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b5bcc4" />
          <stop offset="0.45" stopColor="#f1f3f6" />
          <stop offset="1" stopColor="#9da5ae" />
        </linearGradient>
        <linearGradient id={id('tank')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f98a1" />
          <stop offset="0.2" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#c6ccd3" />
          <stop offset="0.7" stopColor="#eef1f4" />
          <stop offset="1" stopColor="#7c858f" />
        </linearGradient>
        <linearGradient id={id('plastic')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3e45" />
          <stop offset="1" stopColor="#15171b" />
        </linearGradient>
        <radialGradient id={ids.tyre} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#2a2c31" />
          <stop offset="0.85" stopColor="#1b1c20" />
          <stop offset="1" stopColor="#0d0e10" />
        </radialGradient>
        <radialGradient id={ids.rim} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#d7dce1" />
          <stop offset="0.8" stopColor="#9aa1a9" />
          <stop offset="1" stopColor="#6f767e" />
        </radialGradient>
        <radialGradient id={ids.dish} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4a4f56" stopOpacity="0.15" />
          <stop offset="1" stopColor="#2c3036" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={ids.hub} cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#959ca4" />
        </radialGradient>
        <linearGradient id={id('lens')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c7d3de" />
        </linearGradient>
      </defs>

      {/* ── ground shadow (soft) ── */}
      <ellipse cx="455" cy={GROUND + 1} rx="440" ry="9" fill="#000" opacity="0.32" filter={`url(#${id('b8')})`} />

      {/* ── CHASSIS (under the box) ── */}
      <rect x="40" y="260" width="790" height="24" fill="#1a1c21" />
      {/* box floor cross-members */}
      {Array.from({ length: 23 }, (_, i) => (
        <rect key={i} x={46 + i * 24} y="262" width="7" height="12" fill="#2c2f36" />
      ))}
      <rect x="40" y="274" width="560" height="9" fill="#202329" />
      {/* rear underride guard */}
      <rect x="34" y="262" width="11" height="46" fill="#25282e" />
      <rect x="20" y="300" width="50" height="9" rx="2" fill="#2a2d34" />
      <rect x="20" y="300" width="50" height="2" fill="#c1121f" opacity="0.8" />

      {/* ── BOX ── */}
      <rect x="26" y="30" width="564" height="234" rx="5" fill={`url(#${id('box')})`} />
      <rect x="26" y="30" width="564" height="234" rx="5" fill={`url(#${id('boxX')})`} />
      {/* subtle panel seams */}
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <line x1={100 + i * 70} y1="48" x2={100 + i * 70} y2="248" stroke="#c9d0d7" strokeWidth="1" />
          <line x1={101 + i * 70} y1="48" x2={101 + i * 70} y2="248" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
        </g>
      ))}
      {/* top rail + its shadow */}
      <rect x="26" y="30" width="564" height="15" rx="4" fill={`url(#${id('chrome')})`} />
      <rect x="40" y="45" width="536" height="4" fill="#000" opacity="0.08" filter={`url(#${id('b1')})`} />
      {/* bottom rail (aluminium extrusion) */}
      <rect x="26" y="246" width="564" height="18" fill={`url(#${id('chrome')})`} />
      <rect x="26" y="246" width="564" height="1.5" fill="#8f979f" />
      {/* corner posts; rear door hinges */}
      <rect x="26" y="30" width="16" height="234" rx="3" fill={`url(#${id('alu')})`} />
      <rect x="576" y="30" width="14" height="234" rx="3" fill={`url(#${id('alu')})`} />
      {[62, 146, 224].map((y) => (
        <rect key={y} x="38" y={y} width="9" height="16" rx="1.5" fill="#8a929b" />
      ))}
      {/* clearance lights (top) and side markers (bottom rail) */}
      {[110, 232, 354, 476].map((x) => (
        <g key={x}>
          <rect x={x} y="35" width="16" height="6" rx="3" fill="#f59e0b" />
          <rect x={x + 3} y="36" width="6" height="2" rx="1" fill="#fde68a" />
        </g>
      ))}
      <rect x="300" y="251" width="14" height="6" rx="3" fill="#f59e0b" />
      <rect x="28" y="208" width="12" height="30" rx="2" fill="#b3121e" />
      <rect x="30" y="211" width="4" height="10" rx="1" fill="#ff8a8a" opacity="0.7" />
      {/* red brand stripe with a thin shadow */}
      <rect x="42" y="224" width="534" height="11" fill="#d7263d" />
      <rect x="42" y="235" width="534" height="1.5" fill="#8f1626" opacity="0.6" />

      {/* livery */}
      <image href={MARK_SRC} x={310 - markW / 2} y="54" width={markW} height={markH} />
      <text x="310" y="178" textAnchor="middle" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="500" fontSize="54" fill="#1b1f27" letterSpacing="-0.5">
        EagleWing
      </text>
      <text x="316" y="201" textAnchor="middle" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="600" fontSize="15" letterSpacing="10" fill="#d7263d">
        EXPRESS
      </text>
      <text x="310" y="217" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="12.5" fill="#55606e">
        {company.phone} · Vancouver Island, BC
      </text>

      {/* fuel tank with straps + battery box */}
      <rect x="448" y="268" width="110" height="40" rx="18" fill={`url(#${id('tank')})`} />
      {[470, 536].map((x) => (
        <rect key={x} x={x} y="267" width="7" height="42" rx="1.5" fill="#2a2d34" />
      ))}
      <circle cx="512" cy="274" r="4" fill="#5c636b" />
      <rect x="566" y="268" width="32" height="36" rx="3" fill={`url(#${id('plastic')})`} />

      {/* mud flap behind the rear wheels */}
      <rect x="224" y="264" width="10" height="60" rx="2" fill="#16181c" />
      <rect x="226" y="300" width="6" height="10" fill="#d7263d" opacity="0.7" />

      {/* gap between box and cab */}
      <rect x="590" y="104" width="14" height="160" fill="#111317" />

      {/* ── CAB ── */}
      <path
        d={`M604 264 V106 Q604 92 618 92 H728 Q740 92 746 102 L788 170 Q792 176 802 177 L866 183 Q878 184 880 196 L884 250 Q884 264 870 264
            H${archR} A52 52 0 0 0 ${archL} 264 Z`}
        fill={`url(#${id('cab')})`}
        stroke="#b8bfc7"
        strokeWidth="1.2"
      />
      {/* roof cap highlight */}
      <path d="M612 95 H728 Q736 95 740 100" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
      {/* hood with highlight */}
      <path d="M790 174 Q794 179 803 180 L866 186 Q876 187 878 196 L796 190 Q790 186 790 174 Z" fill={`url(#${id('hood')})`} />
      <path d="M800 183 L868 189" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
      {/* body crease along the cab */}
      <path d="M606 206 H872" stroke="#000" strokeOpacity="0.07" strokeWidth="2" />
      {/* windshield (edge view) */}
      <path d="M734 100 L782 172 L770 173 L726 104 Z" fill={`url(#${id('glass')})`} />
      {/* door glass with vent window and reflections */}
      <path d="M630 104 H720 Q727 104 731 110 L764 166 Q767 173 758 173 H630 Q623 173 623 166 V111 Q623 104 630 104 Z" fill={`url(#${id('glass')})`} />
      <path d="M716 104 L722 173" stroke="#cfd5dc" strokeWidth="3" />
      <path d="M646 108 H690 L652 170 H636 Z" fill="#ffffff" opacity="0.1" />
      <path d="M700 108 H712 L676 170 H664 Z" fill="#ffffff" opacity="0.06" />
      {/* door seams, hinge marks, handle */}
      <path d="M614 98 H734 L772 168 V250 H614 Z" fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="1.4" />
      <rect x="767" y="186" width="5" height="12" rx="1" fill="#000" opacity="0.12" />
      <rect x="767" y="226" width="5" height="12" rx="1" fill="#000" opacity="0.12" />
      <rect x="634" y="190" width="28" height="6" rx="3" fill={`url(#${id('chrome')})`} stroke="#8a929b" strokeWidth="0.6" />
      {/* cab side marker + fuel door */}
      <rect x="812" y="203" width="12" height="6" rx="3" fill="#f59e0b" />
      {/* brand stripe on cab (broken by the wheel arch) */}
      <rect x="604" y="224" width={archL - 604} height="11" fill="#d7263d" />
      <rect x={archR} y="224" width={882 - archR} height="11" fill="#d7263d" />
      {/* plastic wheel-arch flare */}
      <path d={`M${archL - 8} 264 A60 60 0 0 1 ${archR + 8} 264 L${archR} 264 A52 52 0 0 0 ${archL} 264 Z`} fill={`url(#${id('plastic')})`} />
      <path d={`M${archL} 264 A52 52 0 0 1 ${archR} 264 Z`} fill="#0b0c0e" opacity="0.55" />
      {/* steps */}
      <rect x="624" y="266" width="82" height="8" rx="2" fill={`url(#${id('chrome')})`} />
      <rect x="630" y="282" width="70" height="6" rx="2" fill="#2a2d34" />
      <rect x="640" y="264" width="4" height="22" fill="#2a2d34" />
      <rect x="686" y="264" width="4" height="22" fill="#2a2d34" />
      {/* west-coast mirror on two arms + spot mirror */}
      <path d="M760 112 L782 104 M760 152 L782 150" stroke="#2a2d34" strokeWidth="3" strokeLinecap="round" />
      <rect x="780" y="88" width="11" height="70" rx="3" fill="#1b1d22" />
      <rect x="782" y="92" width="7" height="62" rx="2" fill="#7f8c98" opacity="0.7" />
      <rect x="783" y="94" width="2" height="40" fill="#ffffff" opacity="0.35" />
      <circle cx="786" cy="166" r="6" fill="#1b1d22" />
      {/* roof marker lights */}
      {[640, 668, 696].map((x) => (
        <rect key={x} x={x} y="87" width="14" height="6" rx="3" fill="#f59e0b" />
      ))}
      {/* headlight + turn lamp at the front corner */}
      <path d="M862 194 L881 196 L882 214 L860 212 Q856 203 862 194 Z" fill={`url(#${id('lens')})`} stroke="#8a95a1" strokeWidth="1" />
      <path d="M866 199 L878 200" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
      <rect x="872" y="215" width="10" height="6" rx="2" fill="#f59e0b" />
      {/* chrome grille edge */}
      {[224, 232, 240].map((y) => (
        <rect key={y} x="880" y={y} width="6" height="4.5" rx="1" fill={`url(#${id('chrome')})`} />
      ))}
      {/* chrome front bumper with tow hook */}
      <path d="M842 252 H884 Q892 252 892 261 V280 Q892 290 882 290 H842 Z" fill={`url(#${id('chrome')})`} stroke="#7f8790" strokeWidth="1" />
      <rect x="868" y="290" width="10" height="6" rx="2" fill="#2a2d34" />

      {/* wheels */}
      <Wheel x={REAR_X} ids={ids} dual spinning={spinning} angle={wheelAngle} />
      <Wheel x={FRONT_X} ids={ids} spinning={spinning} angle={wheelAngle} />
    </svg>
  )
}

/**
 * Side-view truck driving straight across a strip of road on a loop,
 * wheels turning. The road's far edge sits above the tyres' contact line,
 * so the truck rolls on the road surface.
 */
export function TruckOnRoad({ duration = '9s', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-x-0 -bottom-4 bg-charcoal" style={{ top: `${SIDE_ROAD_EDGE * 100}%` }} aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson" />
        <div className="road-dash absolute inset-x-0 top-[45%] h-0.5 -translate-y-1/2" style={{ animation: 'none' }} />
      </div>
      <div className="truck-travel relative z-10 mx-auto w-[92%]" style={{ animationDuration: duration }}>
        <SideTruck spinning />
      </div>
    </div>
  )
}
