"use client"

import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

const text =
  "整理文件、找补充镜头、对齐字幕、准备交接——这些重复步骤，都有章可循。把它们交给 shadow，把时间留给故事本身。"

const emphasis = new Set(["shadow", "故事本身"])

function tokenize(s: string) {
  const out: string[] = []
  let i = 0
  while (i < s.length) {
    const hit = [...emphasis].find((w) => s.startsWith(w, i))
    if (hit) {
      out.push(hit)
      i += hit.length
    } else {
      out.push(s[i])
      i++
    }
  }
  return out
}

const tokens = tokenize(text)

function Char({ t, i, p }: { t: string; i: number; p: MotionValue<number> }) {
  const start = i / tokens.length
  const opacity = useTransform(p, [start - 0.04, start + 0.02], [0.12, 1])
  const isEm = emphasis.has(t)
  return (
    <motion.span style={{ opacity }} className={isEm ? "text-violet" : undefined}>
      {t}
    </motion.span>
  )
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })

  return (
    <section className="relative px-4 py-32 sm:px-6 sm:py-44">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] tracking-[0.35em] text-dim">SCENE 00 · 为什么是 shadow</p>
        <p className="mt-8 font-serif text-[clamp(1.6rem,4.2vw,3.6rem)] leading-[1.45] font-bold tracking-wide text-cream">
          {tokens.map((t, i) => (
            <Char key={i} t={t} i={i} p={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  )
}
