"use client"

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { Check, FileText, Film, Search } from "lucide-react"
import { useRef, useState } from "react"
import { stages } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Eyebrow, formatTimecode } from "./primitives"
import { SceneThumb, type SceneKind } from "./scene-thumb"

const TOTAL_FRAMES = 90 * 25

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const wave = Array.from({ length: 140 }, (_, i) => {
  const env = 0.35 + 0.65 * Math.abs(Math.sin(i / 9))
  return Math.max(0.12, rand(i) * env)
})

function StageVisual({ id }: { id: string }) {
  if (id === "organize") {
    const kinds: SceneKind[] = ["person", "venue", "product", "crowd", "landscape", "unknown"]
    return (
      <div className="grid grid-cols-3 gap-2">
        {kinds.map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="relative overflow-hidden rounded-md ring-1 ring-white/10"
          >
            <SceneThumb kind={k} seed={i + 3} className="aspect-video w-full" />
            <span
              className={cn(
                "absolute right-1 bottom-1 rounded px-1 font-mono text-[8px] sm:text-[9px]",
                k === "unknown" ? "bg-white/20 text-cream" : "bg-lime text-ink"
              )}
            >
              {k === "unknown" ? "待复核" : `0${i + 1}`}
            </span>
          </motion.div>
        ))}
      </div>
    )
  }
  if (id === "source") {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-cream/90">
          <Search className="size-3.5 text-violet" />
          <span className="truncate">清晨 · 园区全景 · 航拍推进 · 冷色 · 16:9 · 10s+</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["landscape", "venue", "landscape"] as SceneKind[]).map((k, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="overflow-hidden rounded-md ring-1 ring-white/10"
            >
              <SceneThumb kind={k} seed={i * 5 + 1} className="aspect-video w-full" />
              <div className="flex justify-between bg-black/60 px-1.5 py-1 font-mono text-[8px] text-dim sm:text-[9px]">
                <span>{i === 1 ? "预览·水印" : "原片"}</span>
                <span className="text-lime">{i === 1 ? "" : "✓ 授权"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  if (id === "cut") {
    const rows = [
      ["C0042", "00:12–00:18", "抛出主张", "硬切"],
      ["DJI_0007", "00:03–00:09", "建立空间", "硬切"],
      ["C0055", "00:21–00:24", "能力证据", "动作接"],
      ["A7S_1290", "00:40–00:46", "情绪收束", "叠化 0.5s"],
    ]
    return (
      <div className="overflow-hidden rounded-md border border-white/10 font-mono text-[9px] sm:text-[11px]">
        <div className="grid grid-cols-[1fr_1.2fr_1fr_0.9fr] bg-white/[0.05] px-2.5 py-1.5 text-dim">
          <span>素材</span>
          <span>源时间</span>
          <span>作用</span>
          <span>转场</span>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={r[0]}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="grid grid-cols-[1fr_1.2fr_1fr_0.9fr] border-t border-white/[0.06] px-2.5 py-1.5 text-cream/85"
          >
            <span className="truncate">{r[0]}</span>
            <span className="text-dim">{r[1]}</span>
            <span className="truncate text-violet">{r[2]}</span>
            <span className="truncate">{r[3]}</span>
          </motion.div>
        ))}
      </div>
    )
  }
  if (id === "subtitle") {
    return (
      <div className="relative overflow-hidden rounded-md ring-1 ring-white/10">
        <SceneThumb kind="person" seed={8} className="aspect-video w-full" />
        <div className="absolute inset-x-0 bottom-[12%] text-center">
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, ease: "linear" }}
            className="inline-block rounded bg-black/55 px-2 py-0.5 text-[11px] text-cream sm:text-sm"
          >
            我们做的，是让每一帧都有理由。
          </motion.span>
        </div>
        <div className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-lime">
          00:00:41,200 → 00:00:43,880
        </div>
      </div>
    )
  }
  const files = [
    { name: "企业宣传片_v1.mp4", icon: Film },
    { name: "企业宣传片.xml", icon: FileText },
    { name: "企业宣传片.srt", icon: FileText },
    { name: "核验报告.md", icon: Check },
  ]
  return (
    <div className="space-y-1.5">
      {files.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs"
        >
          <span className="flex items-center gap-2 text-cream/90">
            <f.icon className="size-3.5 text-violet" />
            {f.name}
          </span>
          <span className="font-mono text-[10px] text-lime">✓ verified</span>
        </motion.div>
      ))}
    </div>
  )
}

export function Pipeline() {
  const ref = useRef<HTMLElement>(null)
  const tcRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [active, setActive] = useState(0)
  const playhead = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(stages.length - 1, Math.floor(v * stages.length)))
    if (tcRef.current) tcRef.current.textContent = formatTimecode(v * TOTAL_FRAMES)
  })

  const jumpTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.offsetTop + ((i + 0.5) / stages.length) * (el.offsetHeight - window.innerHeight)
    window.scrollTo({ top, behavior: "smooth" })
  }

  const stage = stages[active]

  return (
    <section id="pipeline" ref={ref} className="relative h-[520vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-3 pt-16 pb-3 sm:px-6 sm:pb-6">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-3 sm:gap-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <Eyebrow index="02">PIPELINE · 五个阶段</Eyebrow>
              <h2 className="mt-2 font-serif text-[clamp(1.4rem,3vw,2.6rem)] leading-tight font-bold">
                一句话进去，一条时间线出来。
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-dim md:block">
              滚动即拖动播放头。每一步都留下可续做的文件：brief、素材库、edit-plan、timeline 与验证结果。
            </p>
          </div>

          {/* Program monitor */}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0c12]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-1.5 font-mono text-[10px] text-dim sm:text-[11px]">
              <span>Program: shadow_sequence_01</span>
              <span className="flex items-center gap-3">
                <span className="hidden sm:inline">25 fps · 1920×1080</span>
                <span ref={tcRef} className="text-cream tabular-nums">
                  00:00:00:00
                </span>
              </span>
            </div>
            <div className="relative grid min-h-0 flex-1 items-center gap-4 p-4 sm:p-6 md:grid-cols-2 md:gap-10 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-[background] duration-700"
                style={{
                  background: `radial-gradient(60% 80% at 20% 50%, hsla(${stage.hue}, 70%, 60%, 0.12), transparent 70%)`,
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`v-${stage.id}`}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.35 }}
                  className="relative order-2 md:order-1"
                >
                  <StageVisual id={stage.id} />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`t-${stage.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                  className="relative order-1 md:order-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-outline font-mono text-5xl font-bold sm:text-7xl md:text-8xl">
                      {stage.index}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.3em] text-violet">{stage.en}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-bold sm:text-4xl">{stage.title}</h3>
                  <p className="mt-2 text-sm text-cream/90 sm:text-base">{stage.summary}</p>
                  <p className="mt-2 hidden text-sm leading-relaxed text-dim sm:block">{stage.detail}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
                    {stage.outputs.map((o) => (
                      <span
                        key={o}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-cream/80 sm:text-[11px]"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Timeline panel */}
          <div className="relative shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0e15] font-mono text-[9px] text-dim select-none sm:text-[10px]">
            <div className="flex">
              <div className="w-9 shrink-0 border-r border-white/[0.06] sm:w-12">
                <div className="h-5 border-b border-white/[0.06]" />
                {["V2", "V1", "A1", "A2", "ST"].map((t) => (
                  <div
                    key={t}
                    className={cn(
                      "flex items-center justify-center border-b border-white/[0.04] last:border-b-0",
                      t === "V1" ? "h-9 sm:h-11" : "h-5 sm:h-6"
                    )}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="relative h-5 border-b border-white/[0.06]">
                  {Array.from({ length: 19 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute top-0 h-full border-l border-white/10"
                      style={{ left: `${(i / 18) * 100}%` }}
                    >
                      {i % 3 === 0 && i < 18 && <span className="ml-1 hidden sm:inline">{`00:${String(i * 5).padStart(2, "0")}`}</span>}
                    </span>
                  ))}
                </div>
                {/* V2 titles */}
                <div className="relative h-5 border-b border-white/[0.04] sm:h-6">
                  {[
                    [2, 10, "片头"],
                    [41, 8, "章节字"],
                    [62, 9, "人物条"],
                    [90, 9, "Logo"],
                  ].map(([l, w, n]) => (
                    <span
                      key={n as string}
                      className="absolute top-1 bottom-1 truncate rounded-sm bg-violet/25 px-1 leading-[1.6] text-violet ring-1 ring-violet/40"
                      style={{ left: `${l}%`, width: `${w}%` }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                {/* V1 stages */}
                <div className="relative flex h-9 gap-[2px] border-b border-white/[0.04] p-[3px] sm:h-11">
                  {stages.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      className={cn(
                        "relative flex-1 overflow-hidden rounded-sm text-left transition-all duration-300",
                        i === active ? "opacity-100" : "opacity-45 hover:opacity-75"
                      )}
                      style={{
                        background: `linear-gradient(180deg, hsla(${s.hue},55%,55%,0.55), hsla(${s.hue},45%,35%,0.55))`,
                        boxShadow: i === active ? `inset 0 0 0 1px hsla(${s.hue},80%,75%,0.9)` : undefined,
                      }}
                    >
                      <span className="absolute top-1 left-1.5 truncate text-[9px] text-white sm:text-[11px]">
                        <span className="hidden sm:inline">{s.index} </span>
                        {s.title}
                      </span>
                    </button>
                  ))}
                </div>
                {/* A1 waveform */}
                <div className="relative flex h-5 items-center gap-[1px] border-b border-white/[0.04] px-[3px] sm:h-6">
                  {wave.map((h, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex-1 rounded-full",
                        i / wave.length < (active + 1) / stages.length ? "bg-lime/70" : "bg-lime/25"
                      )}
                      style={{ height: `${h * 85}%` }}
                    />
                  ))}
                </div>
                {/* A2 music */}
                <div className="relative h-5 border-b border-white/[0.04] sm:h-6">
                  <span className="absolute top-1 bottom-1 left-[1%] w-[97%] truncate rounded-sm bg-emerald-400/15 px-1 leading-[1.6] text-emerald-300/80 ring-1 ring-emerald-400/30">
                    ♪ 配乐 · -18 dB · 对白处闪避
                  </span>
                </div>
                {/* Subtitles */}
                <div className="relative h-5 sm:h-6">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute top-1.5 bottom-1.5 rounded-sm bg-amber-200/30"
                      style={{ left: `${3 + i * 6}%`, width: `${3 + rand(i + 9) * 2.4}%` }}
                    />
                  ))}
                </div>

                <motion.div
                  className="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-rec"
                  style={{ left: playhead }}
                >
                  <span className="absolute -top-px -left-[5px] h-2.5 w-[11px] rounded-b-sm bg-rec" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
