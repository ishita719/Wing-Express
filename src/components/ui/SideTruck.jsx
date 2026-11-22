import { useId } from 'react'
import { MARK_SRC, MARK_W, MARK_H } from '../../data/brand'
import { company } from '../../data/site'

/**
 * EagleWing Express box truck, straight side view (faces right).
 * Conventional cab with hood, big windshield, tall mirrors, chrome bumper and
 * fuel tank; aluminium-framed box with amber marker lights, red stripe and the
 * EagleWing livery; dual rear wheels. Wheels spin (`spinning`) or follow
 * `wheelAngle`.
 */
const VB_W = 900
const VB_H = 360
const GROUND = 334 // where the tyres touch the road
const R_TYRE = 40
const FRONT_X = 752
const REAR_X = 168

/** Where the road's far edge sits (fraction of the drawing's height): just above the
 *  tyre contact line, so the wheels roll on the road surface. */
export const SIDE_ROAD_EDGE = (GROUND - 34) / VB_H

function Wheel({ x, ids, dual = false, spinning, angle }) {
  const cy = GROUND - R_TYRE
  const spin = spinning ? 'wheel-spin animate-wheel' : 'wheel-spin'
  return (
    <g>
      {/* tyre */}
      <circle cx={x} cy={cy} r={R_TYRE} fill="#16171b" />
      <circle cx={x} cy={cy} r={R_TYRE - 3} fill="none" stroke="#2c2e34" strokeWidth="3" />
      {/* tread blocks on the outer edge (turn with the wheel) */}
      <g className={spin} style={angle !== undefined ? { transform: `rotate(${angle}deg)` } : undefined}>
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i * 18 * Math.PI) / 180
          return (
            <line
              key={i}
              x1={x + Math.cos(a) * (R_TYRE - 1)}
              y1={cy + Math.sin(a) * (R_TYRE - 1)}
              x2={x + Math.cos(a) * (R_TYRE - 6)}
              y2={cy + Math.sin(a) * (R_TYRE - 6)}
              stroke="#0b0c0e"
              strokeWidth="3"
            />
          )
        })}
        {/* rim */}
        <circle cx={x} cy={cy} r="24" fill={`url(#${ids.rim})`} />
        <circle cx={x} cy={cy} r="24" fill="none" stroke="#8d939b" strokeWidth="1.5" />
        {dual && <circle cx={x} cy={cy} r="17" fill="#5d636b" opacity="0.55" />}
        <circle cx={x} cy={cy} r="15" fill="none" stroke="#c9ced4" strokeWidth="1.2" />
        {/* hand holes and wheel nuts */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = ((i * 45 + 22.5) * Math.PI) / 180
          return <circle key={`h${i}`} cx={x + Math.cos(a) * 19} cy={cy + Math.sin(a) * 19} r="3" fill="#3a3e45" />
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 * Math.PI) / 180
          return <circle key={`n${i}`} cx={x + Math.cos(a) * 11} cy={cy + Math.sin(a) * 11} r="1.9" fill="#eef1f4" stroke="#7d838b" strokeWidth="0.6" />
        })}
        <circle cx={x} cy={cy} r="6.5" fill={`url(#${ids.hub})`} stroke="#6c727a" strokeWidth="0.8" />
      </g>
    </g>
  )
}

export default function SideTruck({ className = 'w-full', spinning = false, wheelAngle }) {
  const uid = useId().replace(/:/g, '')
  const ids = {
    box: `box${uid}`, cab: `cab${uid}`, glass: `gl${uid}`, chrome: `ch${uid}`, alu: `al${uid}`,
    rim: `rim${uid}`, hub: `hub${uid}`, shade: `sh${uid}`, hood: `hd${uid}`,
  }
  const markW = 250
  const markH = (markW * MARK_H) / MARK_W

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className={className} role="img" aria-label="EagleWing Express box truck">
      <defs>
        <linearGradient id={ids.box} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f3f5f7" />
          <stop offset="1" stopColor="#dfe3e8" />
        </linearGradient>
        <linearGradient id={ids.cab} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f4f6f8" />
          <stop offset="1" stopColor="#d6dbe1" />
        </linearGradient>
        <linearGradient id={ids.hood} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6f7f9" />
          <stop offset="1" stopColor="#e3e7ec" />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b5466" />
          <stop offset="0.5" stopColor="#1f2e3a" />
          <stop offset="1" stopColor="#121b23" />
        </linearGradient>
        <linearGradient id={ids.chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfcfd" />
          <stop offset="0.35" stopColor="#b9c0c8" />
          <stop offset="0.6" stopColor="#eef1f4" />
          <stop offset="1" stopColor="#8a929b" />
        </linearGradient>
        <linearGradient id={ids.alu} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c7cdd4" />
          <stop offset="0.5" stopColor="#eef1f4" />
          <stop offset="1" stopColor="#aab2bb" />
        </linearGradient>
        <radialGradient id={ids.rim} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#c8ced5" />
          <stop offset="1" stopColor="#8b929a" />
        </radialGradient>
        <radialGradient id={ids.hub} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#9aa1a9" />
        </radialGradient>
        <linearGradient id={ids.shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="455" cy={GROUND + 2} rx="430" ry="7" fill="#000" opacity="0.28" />

      {/* chassis frame + rear underride guard */}
      <rect x="40" y="262" width="790" height="20" fill="#1d2026" />
      <rect x="34" y="262" width="12" height="44" fill="#2a2d34" />
      <rect x="22" y="298" width="46" height="9" rx="2" fill="#2a2d34" />

      {/* ── BOX ── */}
      <rect x="30" y="34" width="560" height="232" rx="5" fill={`url(#${ids.box})`} />
      <rect x="30" y="34" width="560" height="232" rx="5" fill={`url(#${ids.shade})`} />
      {/* panel seams */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={100 + i * 70} y1="50" x2={100 + i * 70} y2="250" stroke="#cfd5dc" strokeWidth="1" opacity="0.6" />
      ))}
      {/* aluminium top + bottom rails and corner posts */}
      <rect x="30" y="34" width="560" height="14" rx="4" fill={`url(#${ids.chrome})`} />
      <rect x="30" y="250" width="560" height="16" fill={`url(#${ids.chrome})`} />
      <rect x="30" y="34" width="14" height="232" rx="3" fill={`url(#${ids.alu})`} />
      <rect x="576" y="34" width="14" height="232" rx="3" fill={`url(#${ids.alu})`} />
      {/* amber clearance lights on the top rail; red tail light low at the back */}
      {[110, 230, 350, 470].map((x) => (
        <rect key={x} x={x} y="38" width="16" height="6" rx="3" fill="#f59e0b" />
      ))}
      <rect x="31" y="214" width="12" height="24" rx="2" fill="#c1121f" />
      {/* red brand stripe */}
      <rect x="44" y="226" width="532" height="10" fill="#d7263d" />

      {/* livery */}
      <image href={MARK_SRC} x={310 - markW / 2} y="56" width={markW} height={markH} />
      <text x="310" y="180" textAnchor="middle" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="500" fontSize="54" fill="#1b1f27" letterSpacing="-0.5">
        EagleWing
      </text>
      <text x="316" y="203" textAnchor="middle" fontFamily="Quicksand, Public Sans, sans-serif" fontWeight="600" fontSize="15" letterSpacing="10" fill="#d7263d">
        EXPRESS
      </text>
      <text x="310" y="220" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="12.5" fill="#55606e">
        {company.phone} · Vancouver Island, BC
      </text>

      {/* fuel tank + battery box (chrome) between the axles */}
      <rect x="452" y="268" width="104" height="38" rx="17" fill={`url(#${ids.chrome})`} />
      {[476, 504, 532].map((x) => (
        <rect key={x} x={x} y="268" width="3" height="38" fill="#8a929b" opacity="0.7" />
      ))}
      <rect x="566" y="270" width="30" height="34" rx="3" fill="#2a2d34" />

      {/* gap between box and cab */}
      <rect x="590" y="110" width="14" height="156" fill="#16181d" />

      {/* ── CAB ── */}
      {/* cab body with hood and front wheel arch */}
      <path
        d={`M604 266 V108 Q604 96 616 96 H724 Q736 96 742 106 L782 176 Q786 182 796 183 L862 188 Q872 189 874 200 L876 252 Q876 266 864 266
            H${FRONT_X + 50} A50 50 0 0 0 ${FRONT_X - 50} 266 Z`}
        fill={`url(#${ids.cab})`}
        stroke="#c3c9cf"
        strokeWidth="1.2"
      />
      {/* hood top highlight */}
      <path d="M784 180 Q788 184 798 185 L862 190 Q868 191 870 196 L792 191 Z" fill={`url(#${ids.hood})`} opacity="0.9" />
      {/* windshield (seen edge-on) + door window */}
      <path d="M730 104 L776 178 L764 178 L722 108 Z" fill={`url(#${ids.glass})`} />
      <path d="M628 106 H716 Q722 106 726 112 L758 170 Q760 176 752 176 H628 Q622 176 622 170 V112 Q622 106 628 106 Z" fill={`url(#${ids.glass})`} />
      <path d="M640 110 H690 L650 170 H636 Z" fill="#ffffff" opacity="0.1" />
      {/* door outline, handle, step */}
      <path d="M616 100 H730 L770 172 V244 H616 Z" fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="1.4" />
      <rect x="636" y="192" width="26" height="5" rx="2.5" fill="#8f959d" />
      <rect x="626" y="270" width="78" height="7" rx="2" fill={`url(#${ids.chrome})`} />
      {/* brand stripe on cab */}
      <rect x="604" y="226" width={FRONT_X - 50 - 604 + 2} height="10" fill="#d7263d" />
      <rect x={FRONT_X + 48} y="226" width={874 - FRONT_X - 48} height="10" fill="#d7263d" />
      {/* tall west-coast mirror + arm */}
      <rect x="748" y="118" width="18" height="4" fill="#2a2d34" />
      <rect x="764" y="94" width="10" height="66" rx="3" fill="#1d2026" />
      <rect x="766" y="98" width="6" height="58" rx="2" fill="#6f7c88" opacity="0.6" />
      {/* roof marker lights */}
      {[640, 668, 696].map((x) => (
        <rect key={x} x={x} y="91" width="14" height="6" rx="3" fill="#f59e0b" />
      ))}
      {/* headlight + amber side marker */}
      <path d="M858 196 L875 198 L876 214 L856 212 Z" fill="#e8eef4" stroke="#9aa3ad" strokeWidth="1" />
      <rect x="830" y="208" width="12" height="6" rx="3" fill="#f59e0b" />
      {/* grille edge visible at the front */}
      {[222, 230, 238].map((y) => (
        <rect key={y} x="872" y={y} width="6" height="4" fill={`url(#${ids.chrome})`} />
      ))}
      {/* chrome front bumper */}
      <path d="M836 254 H880 Q886 254 886 262 V280 Q886 288 878 288 H836 Z" fill={`url(#${ids.chrome})`} stroke="#8a929b" strokeWidth="1" />
      {/* cab wheel-arch trim */}
      <path d={`M${FRONT_X - 50} 266 A50 50 0 0 1 ${FRONT_X + 50} 266`} fill="none" stroke="#1d2026" strokeWidth="5" />

      {/* mud flap behind rear wheels */}
      <rect x="222" y="266" width="9" height="58" rx="2" fill="#1d2026" />

      {/* wheels */}
      <Wheel x={REAR_X} ids={ids} dual spinning={spinning} angle={wheelAngle} />
      <Wheel x={FRONT_X} ids={ids} spinning={spinning} angle={wheelAngle} />
    </svg>
  )
}

/**
 * Side-view truck driving straight across a strip of road on a loop,
 * wheels turning. The road's far edge sits just above the tyres' contact
 * line, so the truck rolls on the road surface.
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
