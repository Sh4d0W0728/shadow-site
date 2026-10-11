"use client"

import { motion } from "motion/react"
import { principles } from "@/lib/content"
import { Eyebrow, Reveal, SectionTitle } from "./primitives"

const stripes =
  "repeating-linear-gradient(-45deg, #f3f0e9 0 14px, #0b0b0f 14px 28px)"

function Slate({ p, i }: { p: (typeof principles)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
      whileHover="clap"
      className="group relative pt-5"
    >
      <motion.div
        variants={{ clap: { rotate: [0, -14, 0], transition: { duration: 0.35, times: [0, 0.6, 1] } } }}
        className="absolute top-0 left-0 h-5 w-full origin-bottom-left rounded-t-md"
        style={{ background: stripes }}
      />
      <div className="relative overflow-hidden rounded-b-xl border border-t-0 border-white/10 bg-[#0e0f15]">
        <div className="h-3" style={{ background: stripes, opacity: 0.9 }} />
        <div className="grid grid-cols-3 border-b border-white/10 font-mono text-[9px] tracking-[0.2em] text-dim">
          <div className="border-r border-white/10 px-3 py-1.5">
            ROLL <span className="text-cream">A0{Math.floor(i / 3) + 1}</span>
          </div>
          <div className="border-r border-white/10 px-3 py-1.5">
            SCENE <span className="text-cream">SH</span>
          </div>
          <div className="px-3 py-1.5">
            TAKE <span className="text-violet">{p.take}</span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-serif text-xl leading-snug font-bold text-cream">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-dim">{p.body}</p>
        </div>
      </div>
    </motion.article>
  )
}

export function Principles() {
  return (
    <section id="principles" className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow index="06" className="justify-center">
            PRINCIPLES · 不冒充
          </Eyebrow>
          <SectionTitle className="mt-5">
            它不会假装
            <br />
            看过你的素材。
          </SectionTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-dim">
              好的剪辑师从不糊弄画面。shadow 把“没做到的就说没做到”写进了每一个流程，给出实际完成范围，也列出仍需你用审美判断的地方。
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Slate key={p.take} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
