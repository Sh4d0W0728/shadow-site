import { domainFamilies } from "@/lib/content"
import { cn } from "@/lib/utils"

const names = domainFamilies.flatMap((f) => f.domains.map((d) => d.name))

export function FilmStrip({ reverse = false, className }: { reverse?: boolean; className?: string }) {
  const row = [...names, ...names]
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-white/[0.06] bg-[#0f1017] py-1",
        className
      )}
      aria-hidden
    >
      <div className="sprockets h-3 bg-[#1b1c26]" />
      <div className="mask-fade-x overflow-hidden py-3">
        <div
          className="flex w-max animate-marquee gap-10 whitespace-nowrap"
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
        >
          {row.map((n, i) => (
            <span key={i} className="flex items-center gap-10 text-sm text-cream/70">
              <span className="font-serif text-base">{n}</span>
              <span className="font-mono text-[10px] text-violet/70">
                {String((i % names.length) + 1).padStart(2, "0")}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="sprockets h-3 bg-[#1b1c26]" />
    </div>
  )
}
