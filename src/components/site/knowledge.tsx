"use client"

import { motion } from "motion/react"
import { films, knowledge } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Eyebrow, formatTimecode, Reveal, SectionTitle } from "./primitives"
import { SceneThumb, type SceneKind } from "./scene-thumb"

function rand(seed: number) {
  const x = Math.sin(seed * 78.233 + 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const sheet: SceneKind[] = [
  "landscape", "landscape", "person", "person",
  "venue", "product", "product", "person",
  "crowd", "landscape", "person", "landscape",
]

const rms = Array.from({ length: 64 }, (_, i) => {
  const quiet = (i > 18 && i < 23) || (i > 47 && i < 51)
  const swell = 0.4 + 0.6 * Math.sin((i / 64) * Math.PI)
  return quiet ? 0.04 + rand(i) * 0.04 : Math.max(0.15, swell * (0.55 + rand(i + 4) * 0.45))
})

const cuts = [6, 14, 19, 27, 31, 38, 44, 52, 58]

function Analyzer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0c12]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 font-mono text-[10px] text-dim sm:text-[11px]">
        <span>
          <span className="text-violet">$</span> analyze_reference.py reference.mp4 --mute
        </span>
        <span className="hidden sm:inline">F04 · 冰岛旅行片</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-3 sm:gap-2 sm:p-4">
        {sheet.map((k, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="relative overflow-hidden rounded ring-1 ring-white/10"
          >
            <SceneThumb kind={k} seed={i + 11} className="aspect-video w-full" />
            <span className="absolute bottom-0.5 left-1 font-mono text-[7px] text-cream/80 sm:text-[9px]">
              {formatTimecode(i * 25 * 38).slice(3, 8)}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="space-y-2 border-t border-white/[0.06] p-3 sm:p-4">
        <div className="flex items-center justify-between font-mono text-[10px] text-dim">
          <span>场景变化候选</span>
          <span className="text-amber-200/80">候选 ≠ 剪点</span>
        </div>
        <div className="relative h-3 rounded-sm bg-white/[0.04]">
          {cuts.map((c) => (
            <span
              key={c}
              className="absolute top-0 h-full w-[2px] bg-amber-200/80"
              style={{ left: `${((c / 64) * 100).toFixed(2)}%` }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-dim">
          <span>逐秒 RMS · 近静音区间</span>
          <span className="text-amber-200/80">测量 ≠ 听感</span>
        </div>
        <div className="flex h-14 items-end gap-[2px]">
          {rms.map((v, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.008, duration: 0.4 }}
              className={cn("flex-1 origin-bottom rounded-t-[1px]", v < 0.1 ? "bg-violet" : "bg-lime/60")}
              style={{ height: `${(v * 100).toFixed(2)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Knowledge() {
  return (
    <section className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow index="05">CRAFT · 方法库</Eyebrow>
            <SectionTitle className="mt-5">
              从公开教学，
              <br />
              走到每一个剪辑决定。
            </SectionTitle>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg leading-relaxed text-dim">
                来源涵盖影视飓风公开教学、Frame.io 剪辑师访谈、EditMentor 与 Adobe 官方文档。每项保留来源与实际阅读范围，按
                <span className="text-cream">「何时使用 → 怎样执行 → 怎样检查」</span>整理成卡片。
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {knowledge.map((k, gi) => (
                <Reveal key={k.group} delay={0.1 + gi * 0.08}>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-lg font-bold">{k.group}</h3>
                      <span className="font-mono text-2xl text-violet">{String(k.count).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {k.items.map((it) => (
                        <span
                          key={it}
                          className="rounded-md border border-white/[0.08] bg-ink/60 px-2 py-1 text-xs text-cream/80"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-24">
            <Reveal>
              <h3 className="font-serif text-2xl font-bold sm:text-3xl">从高播放成片，学到可以落地的剪法。</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                新增静音参考片分析器：全片采样接触表 → 场景变化候选 → 逐秒音轨电平。Codex 实际看图后，把方法对应到你素材的入出点，渲染小样再检查。
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <Analyzer />
            </Reveal>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-5 flex items-baseline justify-between">
            <span className="font-mono text-[11px] tracking-[0.3em] text-dim">5 部已检查成片案例</span>
            <span className="hidden font-mono text-[11px] text-dim sm:inline">带时间点的画面观察 · 实际音轨测量</span>
          </div>
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {films.map((f, i) => (
              <motion.article
                key={f.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative flex w-[68vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#161827] to-[#0c0d14] p-4 sm:w-auto sm:p-5"
                style={{ aspectRatio: "2 / 3" }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(80% 60% at 50% 0%, hsla(${250 + i * 25},70%,60%,0.22), transparent)` }}
                />
                <div className="relative flex items-center justify-between font-mono text-[10px] text-dim">
                  <span className="text-violet">{f.code}</span>
                  <span>{f.author}</span>
                </div>
                <div className="relative">
                  <h4 className="font-serif text-3xl leading-none font-black text-cream sm:text-[2.1rem]">{f.title}</h4>
                  <p className="mt-3 text-[13px] leading-relaxed text-dim">{f.note}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-dim/70">
            方法整理与软件操作建议不代表任何作者合作或认证。公共安装包只含代码与原创笔记，不含研究影片、画面截图、完整字幕或登录信息。
          </p>
        </div>
      </div>
    </section>
  )
}
