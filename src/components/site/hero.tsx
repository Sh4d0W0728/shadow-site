"use client"

import { animate, motion, useInView, useReducedMotion } from "motion/react"
import { ArrowDown, Copy, Download } from "lucide-react"
import { useEffect, useRef } from "react"
import { buttonVariants } from "@/components/ui/button"
import { DOWNLOAD_URL, INSTALL_CMD, stats, VERSION } from "@/lib/content"
import { cn } from "@/lib/utils"
import { copyText, formatTimecode } from "./primitives"

const LAYERS = 34

function buildShadow(ux: number, uy: number, length: number) {
  const step = length / LAYERS
  const parts: string[] = []
  for (let i = 1; i <= LAYERS; i++) {
    const t = i / LAYERS
    const a = 0.62 * Math.pow(1 - t, 1.6)
    const r = Math.round(124 - 80 * t)
    const g = Math.round(107 - 75 * t)
    const b = Math.round(242 - 150 * t)
    parts.push(`${(ux * step * i).toFixed(1)}px ${(uy * step * i).toFixed(1)}px 0 rgba(${r},${g},${b},${a.toFixed(3)})`)
  }
  return parts.join(",")
}

function useCastShadow() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLHeadingElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const word = wordRef.current
    const light = lightRef.current
    if (!section || !word || !light) return

    if (reduce) {
      word.style.textShadow = buildShadow(0.6, 0.8, 70)
      return
    }

    const mouse = { x: 0, y: 0, at: -Infinity }
    const pos = { x: section.clientWidth * 0.25, y: section.clientHeight * 0.15 }
    let raf = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = section.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.at = performance.now()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(section)

    function tick(now: number) {
      raf = 0
      if (!visible || !section || !word || !light) return
      const sr = section.getBoundingClientRect()
      const wr = word.getBoundingClientRect()
      const cx = wr.left - sr.left + wr.width / 2
      const cy = wr.top - sr.top + wr.height / 2

      let tx: number
      let ty: number
      if (now - mouse.at < 2500) {
        tx = mouse.x
        ty = mouse.y
      } else {
        const t = now / 2600
        tx = cx + Math.cos(t) * wr.width * 0.62
        ty = cy - wr.height * 1.1 + Math.sin(t * 1.3) * wr.height * 0.45
      }
      pos.x += (tx - pos.x) * 0.08
      pos.y += (ty - pos.y) * 0.08

      const dx = cx - pos.x
      const dy = cy - pos.y
      const dist = Math.hypot(dx, dy) || 1
      const length = Math.min(140, 30 + dist * 0.16)
      word.style.textShadow = buildShadow(dx / dist, dy / dist, length)
      light.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`

      raf = requestAnimationFrame(tick)
    }

    section.addEventListener("pointermove", onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      section.removeEventListener("pointermove", onMove)
    }
  }, [reduce])

  return { sectionRef, wordRef, lightRef }
}

function RunningTimecode() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      if (ref.current) ref.current.textContent = formatTimecode(((performance.now() - start) / 1000) * 25)
    }, 40)
    return () => clearInterval(id)
  }, [])
  return (
    <span ref={ref} className="tabular-nums">
      00:00:00:00
    </span>
  )
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      delay: 0.2,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString()
      },
    })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  )
}

function Corner({ className }: { className: string }) {
  return <span className={cn("absolute size-6 border-cream/50 sm:size-9", className)} />
}

const letters = "shadow".split("")

export function Hero() {
  const { sectionRef, wordRef, lightRef } = useCastShadow()

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16"
    >
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(133,112,206,0.22), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(182,234,168,0.06), transparent 70%), linear-gradient(180deg, #0b0e15 0%, #07080c 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        ref={lightRef}
        className="pointer-events-none absolute top-0 left-0 -z-10 size-[620px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,244,222,0.16) 0%, rgba(182,162,247,0.08) 35%, transparent 68%)",
        }}
      />

      <div className="pointer-events-none absolute inset-3 hidden font-mono text-[10px] tracking-[0.2em] text-cream/60 sm:inset-6 sm:block md:inset-8">
        <Corner className="top-0 left-0 border-t border-l" />
        <Corner className="top-0 right-0 border-t border-r" />
        <Corner className="bottom-0 left-0 border-b border-l" />
        <Corner className="right-0 bottom-0 border-r border-b" />
        <div className="absolute top-16 left-6 flex items-center gap-2 md:top-14">
          <span className="size-2 animate-blink rounded-full bg-rec shadow-[0_0_12px_#ff4d4d]" />
          REC
        </div>
        <div className="absolute top-16 right-6 md:top-14">4K · 25P · 16:9</div>
        <div className="absolute bottom-5 left-6">
          TC <RunningTimecode />
        </div>
        <div className="absolute right-6 bottom-5">CODEX × PREMIERE PRO</div>
        <div className="absolute top-1/2 left-1/2 size-5 -translate-1/2">
          <span className="absolute top-1/2 left-0 h-px w-full bg-cream/20" />
          <span className="absolute top-0 left-1/2 h-full w-px bg-cream/20" />
        </div>
      </div>

      <motion.a
        href="#install"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-3 pl-1 text-xs text-dim backdrop-blur transition-colors hover:border-violet/40 hover:text-cream"
      >
        <span className="rounded-full bg-violet/15 px-2 py-0.5 font-mono text-[10px] text-violet">
          {VERSION}
        </span>
        Codex Skill · 新增参考成片分析器
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </motion.a>

      <h1
        ref={wordRef}
        aria-label="shadow."
        className="relative text-center text-[clamp(5.5rem,22vw,19rem)] leading-[0.82] font-bold tracking-[-0.065em] text-cream select-none"
      >
        {letters.map((l, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {l}
          </motion.span>
        ))}
        <motion.span
          aria-hidden
          className="inline-block text-violet"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: "spring", stiffness: 300, damping: 14 }}
        >
          .
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="mt-8 text-center font-serif text-[clamp(1.6rem,4.4vw,3.2rem)] font-bold tracking-[0.06em] text-cream"
      >
        让素材，成为故事。
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.02, duration: 0.9 }}
        className="mt-4 max-w-xl text-center text-[15px] leading-relaxed text-dim sm:text-base"
      >
        一个让 Codex 真正“看过素材再动刀”的剪辑 skill。
        <br className="hidden sm:block" />
        从第一帧整理，到最后一帧交付 Premiere。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.9 }}
        className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
      >
        <a
          href={DOWNLOAD_URL}
          className={cn(
            buttonVariants({ size: "lg" }),
            "group relative h-12 gap-2 overflow-hidden bg-cream px-6 text-[15px] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(182,162,247,0.7)] hover:bg-white"
          )}
        >
          <Download className="size-4" />
          下载 shadow.zip
          <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/60 opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
        </a>
        <button
          type="button"
          onClick={() => copyText(INSTALL_CMD, "安装命令已复制，粘贴到终端即可")}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-12 gap-2.5 border-white/15 bg-white/[0.03] px-5 font-mono text-[13px] text-cream backdrop-blur hover:border-violet/50 hover:bg-white/[0.06]"
          )}
        >
          <span className="text-violet">$</span> codex plugin add shadow
          <Copy className="size-3.5 text-dim" />
        </button>
      </motion.div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-ink/80 px-5 py-4 backdrop-blur">
            <dd className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
              <CountUp to={s.value} />
            </dd>
            <dt className="mt-1 text-sm text-cream/80">{s.label}</dt>
            <dt className="mt-0.5 text-xs text-dim">{s.hint}</dt>
          </div>
        ))}
      </motion.dl>

      <motion.a
        href="#organize"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-10 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-dim hover:text-cream"
      >
        SCROLL TO PLAY
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
