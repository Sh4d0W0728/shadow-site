import { cn } from "@/lib/utils"

export type SceneKind = "person" | "venue" | "product" | "crowd" | "unknown" | "landscape" | "screen"

const palettes: Record<SceneKind, [string, string, string]> = {
  person: ["#3b2f63", "#8a74d6", "#f4dec1"],
  venue: ["#14324a", "#4f8fb8", "#cfe7f5"],
  product: ["#3d2a14", "#c48a3f", "#ffe8c2"],
  crowd: ["#123a2a", "#4fae7d", "#d8f5c9"],
  unknown: ["#222430", "#4a4d5c", "#9aa0b1"],
  landscape: ["#67619c", "#aaa2ba", "#d7c8bd"],
  screen: ["#181a26", "#3d4466", "#b6a2f7"],
}

export function SceneThumb({
  kind,
  seed = 0,
  className,
}: {
  kind: SceneKind
  seed?: number
  className?: string
}) {
  const [a, b, c] = palettes[kind]
  const id = `g-${kind}-${seed}`
  const o = (seed * 37) % 30
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className={cn("block", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="160" height="90" fill={`url(#${id})`} />
      {kind === "person" && (
        <g>
          <circle cx={118 - o} cy="26" r="40" fill={c} opacity="0.12" />
          <circle cx={70 + o} cy="38" r="13" fill="#141022" />
          <path d={`M${44 + o} 90c2-24 13-34 26-34s24 10 26 34z`} fill="#141022" />
          <path d={`M${83 + o} 30a13 13 0 0 1 0 16`} stroke={c} strokeWidth="2" fill="none" opacity="0.7" />
        </g>
      )}
      {kind === "venue" && (
        <g>
          <rect x="0" y="58" width="160" height="32" fill="#0b1c2a" opacity="0.7" />
          <rect x={20 + o} y="30" width="26" height="34" fill="#0d2233" />
          <rect x={52 + o} y="18" width="18" height="46" fill="#102a3e" />
          <rect x={76 + o} y="36" width="40" height="28" fill="#0d2233" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={56 + o} y={24 + i * 9} width="10" height="3" fill={c} opacity="0.5" />
          ))}
          <circle cx="132" cy="20" r="8" fill={c} opacity="0.5" />
        </g>
      )}
      {kind === "product" && (
        <g>
          <ellipse cx="80" cy="76" rx="44" ry="6" fill="#000" opacity="0.35" />
          <rect x={58 + o / 3} y="16" width="44" height="58" rx="8" fill="#1d140a" />
          <rect x={62 + o / 3} y="20" width="36" height="46" rx="4" fill={b} opacity="0.55" />
          <path d={`M${64 + o / 3} 22l18 0-14 40z`} fill={c} opacity="0.25" />
        </g>
      )}
      {kind === "crowd" && (
        <g>
          <path d="M60 0 30 70h20L70 0zM100 0l20 70h20L110 0z" fill={c} opacity="0.12" />
          <rect x="40" y="38" width="80" height="6" fill="#0a2016" />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={6 + i * 11.5 + ((i * 7 + o) % 5)} cy={72 + ((i * 13) % 6)} r="7" fill="#0a2016" />
          ))}
          <circle cx={80 + o / 2} cy="30" r="5" fill="#0a2016" />
        </g>
      )}
      {kind === "unknown" && (
        <g>
          <circle cx={50 + o} cy="40" r="26" fill={c} opacity="0.18" />
          <circle cx={110 - o} cy="55" r="20" fill={c} opacity="0.12" />
          <text x="80" y="56" textAnchor="middle" fontSize="28" fill={c} opacity="0.55" fontFamily="monospace">
            ?
          </text>
        </g>
      )}
      {kind === "landscape" && (
        <g>
          <circle cx={118 - o} cy="28" r="12" fill="#f4dec1" opacity="0.7" />
          <path d="M0 56l30-17 28 11 26-27 31 37 29-13 16 10v33H0z" fill="#64617b" />
          <path d="M0 74l35-22 33 15 41-20 30 19 21-12v36H0z" fill="#2a3349" />
          <path d="M0 82l37-10 22 5 27-7 25 7 24-9 25 7v15H0z" fill="#182033" />
        </g>
      )}
      {kind === "screen" && (
        <g>
          <rect x="16" y="12" width="128" height="66" rx="4" fill="#0e1018" />
          <rect x="16" y="12" width="128" height="8" rx="2" fill="#262a3d" />
          <rect x="22" y="26" width="30" height="46" rx="2" fill="#1c2030" />
          <rect x="58" y="26" width="80" height="28" rx="2" fill={c} opacity="0.25" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="58" y={58 + i * 5} width={70 - i * 18} height="2.5" fill="#4a5070" />
          ))}
          <path d={`M${96 + o / 2} 44l6 14 2-6 6-2z`} fill="#fff" />
        </g>
      )}
    </svg>
  )
}
