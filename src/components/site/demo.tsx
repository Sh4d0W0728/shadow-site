"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { Copy, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { sessions, type Session } from "@/lib/content"
import { cn } from "@/lib/utils"
import { copyText, Eyebrow, Reveal, SectionTitle } from "./primitives"

const glyph: Record<Session["steps"][number]["kind"], { mark: string; cls: string }> = {
  run: { mark: "›", cls: "text-cream/85" },
  ok: { mark: "✓", cls: "text-cream/85" },
  note: { mark: "·", cls: "text-dim" },
  file: { mark: "↳", cls: "text-violet" },
}

const markColor: Record<Session["steps"][number]["kind"], string> = {
  run: "text-violet",
  ok: "text-lime",
  note: "text-amber-200/80",
  file: "text-violet",
}

function useSessionPlayer(session: Session, play: boolean, nonce: number) {
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)
  const [thinking, setThinking] = useState(false)

  useEffect(() => {
    if (!play || reduce) return
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => {
        setTyped(0)
        setShown(0)
        setThinking(false)
      }, 0),
    ]
    let t = 250
    for (let i = 1; i <= session.prompt.length; i++) {
      timers.push(setTimeout(() => setTyped(i), t))
      t += 16 + (session.prompt[i - 1] === "，" || session.prompt[i - 1] === "。" ? 140 : 0)
    }
    t += 250
    timers.push(setTimeout(() => setThinking(true), t))
    t += 900
    timers.push(setTimeout(() => setThinking(false), t))
    session.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(i + 1), t + i * 520))
    })
    return () => timers.forEach(clearTimeout)
  }, [session, play, nonce, reduce])

  if (reduce) {
    return { typed: session.prompt.length, shown: session.steps.length, thinking: false, done: true }
  }
  const done = shown >= session.steps.length
  return { typed, shown, thinking, done }
}

export function Demo() {
  const [idx, setIdx] = useState(0)
  const [nonce, setNonce] = useState(0)
  const [touched, setTouched] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boxRef, { once: true, margin: "-120px" })
  const session = sessions[idx]
  const { typed, shown, thinking, done } = useSessionPlayer(session, inView, nonce)

  useEffect(() => {
    if (!done || touched) return
    const id = setTimeout(() => setIdx((i) => (i + 1) % sessions.length), 4200)
    return () => clearTimeout(id)
  }, [done, touched])

  const select = (i: number) => {
    setTouched(true)
    setIdx(i)
    setNonce((n) => n + 1)
  }

  return (
    <section id="demo" className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 40% at 70% 50%, rgba(124,107,242,0.12), transparent 70%)" }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Eyebrow index="04">DEMO · 在 Codex 里</Eyebrow>
          <SectionTitle className="mt-5">
            一句话，
            <br />
            开始下一条片子。
          </SectionTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-dim">
              用 <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-violet">$shadow</code> 召唤。它只追问会改变结果的缺项，其余给出合理起点并写明。
            </p>
          </Reveal>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible">
            {sessions.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => select(i)}
                className={cn(
                  "group relative shrink-0 rounded-lg border px-3 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:px-5 lg:py-3.5",
                  i === idx
                    ? "border-violet bg-violet/10 lg:bg-transparent"
                    : "border-white/10 hover:border-white/30"
                )}
              >
                <span className={cn("text-sm font-medium", i === idx ? "text-cream" : "text-dim group-hover:text-cream")}>
                  {s.label}
                </span>
                <span className="mt-1 hidden text-xs leading-relaxed text-dim lg:line-clamp-2">
                  {s.prompt.replace("$shadow ", "")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div
            ref={boxRef}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b10]/95 shadow-[0_40px_120px_-30px_rgba(124,107,242,0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="flex-1 truncate text-center font-mono text-[11px] text-dim">
                codex — ~/项目/{session.label}
              </span>
              <button
                type="button"
                onClick={() => copyText(session.prompt, "指令已复制，在 Codex 中粘贴即可")}
                className="rounded p-1 text-dim transition-colors hover:bg-white/5 hover:text-cream"
                aria-label="复制指令"
              >
                <Copy className="size-3.5" />
              </button>
            </div>

            <div className="min-h-[440px] p-4 font-mono text-[12.5px] leading-[1.75] sm:min-h-[460px] sm:p-6 sm:text-[13.5px]">
              <div className="flex gap-3">
                <span className="shrink-0 text-violet">❯</span>
                <p className="text-cream">
                  {session.prompt.slice(0, typed)}
                  {typed < session.prompt.length && (
                    <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-cream" />
                  )}
                </p>
              </div>

              <div className="mt-4 space-y-1.5 border-l border-white/[0.07] pl-4">
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-r from-dim via-cream to-dim bg-[length:200%_100%] bg-clip-text text-transparent"
                    style={{ animation: "shimmer 1.6s linear infinite" }}
                  >
                    读取 skill · 检查环境 · 选择领域…
                  </motion.div>
                )}
                {session.steps.slice(0, shown).map((s, i) => (
                  <motion.div
                    key={`${session.id}-${nonce}-${i}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3"
                  >
                    <span className={cn("w-3 shrink-0 text-center", markColor[s.kind])}>{glyph[s.kind].mark}</span>
                    <span className={cn("min-w-0 break-words", glyph[s.kind].cls)}>{s.text}</span>
                  </motion.div>
                ))}
              </div>

              {done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4"
                >
                  <span className="text-xs text-dim">
                    <span className="text-lime">●</span> 完成范围与待人工审美复核之处已写入报告
                  </span>
                  <button
                    type="button"
                    onClick={() => select(idx)}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-dim hover:bg-white/5 hover:text-cream"
                  >
                    <RotateCcw className="size-3" /> 重播
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-dim/70">演示为示意流程，实际输出取决于你的素材与环境。</p>
        </Reveal>
      </div>
    </section>
  )
}
