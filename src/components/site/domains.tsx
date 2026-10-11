"use client"

import { AnimatePresence, motion } from "motion/react"
import { CornerDownLeft, Sparkles } from "lucide-react"
import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { domainFamilies, type Domain } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Eyebrow, Reveal, SectionTitle } from "./primitives"

const keywords: Record<string, { pos: string[]; neg?: string[] }> = {
  "promo-brand": { pos: ["品牌", "形象片", "品牌故事", "brand"] },
  "promo-corporate": { pos: ["企业", "公司", "机构", "工厂", "生产"] },
  "promo-product": { pos: ["产品", "新品", "卖点", "功能展示", "上市"] },
  "promo-tourism": { pos: ["文旅", "景区", "城市宣传", "目的地", "旅游宣传"], neg: ["vlog", "个人"] },
  "promo-service": { pos: ["招生", "服务", "报名"], neg: ["完整授课"] },
  "event-same-day": { pos: ["当天", "快剪", "即时", "当日", "现场发"], neg: ["完整", "全程"] },
  "event-recap": { pos: ["回顾", "纪念片", "年度", "庆典", "赛事"], neg: ["当天", "快剪"] },
  "conference-talk": { pos: ["会议", "演讲", "报告", "发布会", "讲者"], neg: ["快剪"] },
  "education-course": { pos: ["网课", "课程", "系列课", "章节"], neg: ["招生", "推广"] },
  "education-micro": { pos: ["微课", "知识点", "概念讲解"], neg: ["招生"] },
  "education-screen": { pos: ["录屏", "软件", "操作", "教程"], neg: ["招生"] },
  "interview-profile": { pos: ["采访", "访谈", "受访", "口述"] },
  "documentary-observational": { pos: ["纪录", "纪实", "真实事件"] },
  "mv-lyric-story": { pos: ["歌词", "抒情", "mv"], neg: ["卡点"] },
  "mv-beat-action": { pos: ["卡点", "燃", "动作", "踩点", "节奏"], neg: ["歌词"] },
  "character-fanedit": { pos: ["角色", "人物混剪", "影视混剪", "电影", "剧"] },
  "wedding-story": { pos: ["婚礼", "誓词", "新人", "婚"] },
  "social-info": { pos: ["短视频", "观点", "知识分享", "信息流"], neg: ["带货"] },
  "social-sales": { pos: ["带货", "卖货", "商品", "电商", "转化"] },
  "travel-personal": { pos: ["vlog", "旅行", "日常", "旅途"], neg: ["宣传", "推广"] },
}

const presets = [
  "活动当天交付 60 秒竖屏快剪，保留获奖者",
  "课程招生宣传片，面向家长",
  "把这套录屏剪成软件教程",
  "一首燃曲的卡点动作混剪",
  "婚礼誓词和家人反应",
  "冰岛自驾旅行 Vlog",
]

const allDomains = domainFamilies.flatMap((f) => f.domains.map((d) => ({ ...d, family: f })))

function route(query: string) {
  const q = query.toLowerCase()
  if (!q.trim()) return null
  const scored = allDomains
    .map((d) => {
      const k = keywords[d.id]
      const hits = k.pos.filter((w) => q.includes(w))
      const misses = (k.neg ?? []).filter((w) => q.includes(w))
      const score = hits.reduce((s, w) => s + w.length, 0) - misses.length * 3
      return { d, hits, score }
    })
    .filter((x) => x.hits.length > 0)
    .sort((a, b) => b.score - a.score)
  return scored
}

function pace(r: number[]) {
  const avg = r.reduce((a, b) => a + b, 0) / r.length
  if (avg < 2.6) return { label: "快切", tone: "text-rec" }
  if (avg < 6) return { label: "中速", tone: "text-amber-200" }
  return { label: "长镜头", tone: "text-lime" }
}

function Rhythm({ values, active }: { values: number[]; active?: boolean }) {
  return (
    <div className="group/r relative flex h-6 w-full gap-[2px] overflow-hidden rounded-sm">
      {values.map((v, i) => (
        <span
          key={i}
          className={cn("h-full rounded-[2px]", i % 2 ? "bg-white/[0.12]" : "bg-violet/45")}
          style={{ flexGrow: v }}
        />
      ))}
      <span
        className={cn(
          "absolute inset-y-0 w-px bg-rec shadow-[0_0_8px_#ff4d4d] transition-[left] ease-linear",
          active ? "left-full duration-[1600ms]" : "left-0 duration-0 group-hover/r:left-full group-hover/r:duration-[1600ms]"
        )}
      />
    </div>
  )
}

function DomainCard({ d, highlight }: { d: Domain; highlight: boolean }) {
  const p = pace(d.rhythm)
  return (
    <motion.article
      layout
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-white/[0.02] p-4 transition-colors duration-300 sm:p-5",
        highlight
          ? "border-violet/70 bg-violet/[0.07] shadow-[0_0_40px_-12px_rgba(182,162,247,0.7)]"
          : "border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      {highlight && (
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-violet px-2 py-0.5 text-[10px] font-semibold text-ink">
          <Sparkles className="size-3" /> 主领域
        </span>
      )}
      <div className="font-mono text-[10px] text-dim">{d.id}</div>
      <h4 className="pr-16 font-serif text-lg leading-snug font-bold text-cream">{d.name}</h4>
      <p className="flex-1 text-sm leading-relaxed text-dim">{d.focus}</p>
      <div>
        <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-dim">
          <span>剪辑节奏指纹</span>
          <span className={p.tone}>{p.label}</span>
        </div>
        <Rhythm values={d.rhythm} active={highlight} />
      </div>
    </motion.article>
  )
}

export function Domains() {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<string>(domainFamilies[0].id)
  const results = useMemo(() => route(query), [query])
  const top = results?.[0]

  const submit = (q: string) => {
    setQuery(q)
    const r = route(q)?.[0]
    if (r) setTab(r.d.family.id)
  }

  return (
    <section id="domains" className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="03">DOMAINS · 20 个细分领域</Eyebrow>
            <SectionTitle className="mt-5">
              同样是剪辑，
              <br />
              每种片子都有自己的逻辑。
            </SectionTitle>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-dim">
                按<strong className="font-medium text-cream">成片目的</strong>而非关键词选流程。课程招生宣传片按宣传处理，不会因为“课程”二字被套进教学模板。每个领域都有必要输入、结构起点、转场动机、字幕策略与质量关卡。
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 sm:p-6">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-dim">
                <span>
                  <span className="text-violet">$</span> profiles.py select
                </span>
                <span className="hidden sm:inline">试试看 · 本地演示</span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  submit(query)
                }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink/80 px-3 focus-within:border-violet/60"
              >
                <input
                  value={query}
                  onChange={(e) => submit(e.target.value)}
                  placeholder="描述你要剪的片子，例如：年会当天快剪"
                  className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-cream outline-none placeholder:text-dim/60"
                  aria-label="描述你要剪的片子"
                />
                <CornerDownLeft className="size-4 shrink-0 text-dim" />
              </form>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => submit(p)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs transition-colors",
                      query === p
                        ? "border-violet/60 bg-violet/15 text-cream"
                        : "border-white/10 text-dim hover:border-white/25 hover:text-cream"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="mt-5 min-h-[96px] rounded-xl border border-dashed border-white/10 p-4">
                <AnimatePresence mode="wait">
                  {!query.trim() ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-dim"
                    >
                      输入一句需求，或点一个示例，看看 shadow 会选哪条流程。
                    </motion.p>
                  ) : top ? (
                    <motion.div
                      key={top.d.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-serif text-xl font-bold text-cream">{top.d.name}</span>
                        <span className="font-mono text-xs text-violet">{top.d.id}</span>
                        <span className="text-xs text-dim">· {top.d.family.name}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-dim">
                        命中词
                        {top.hits.map((h) => (
                          <span key={h} className="rounded bg-lime/15 px-1.5 py-0.5 font-mono text-lime">
                            {h}
                          </span>
                        ))}
                        {results && results.length > 1 && (
                          <span className="ml-1">
                            · 备选 {results.slice(1, 3).map((r) => r.d.name).join("、")}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-dim"
                    >
                      没有命中领域关键词，退回 <span className="font-mono text-cream">general-story</span>{" "}
                      通用叙事流程；目的不明确且会改变交付时，shadow 会先问你。
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as string)} className="mt-16">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <TabsList variant="line" className="h-auto gap-1 sm:gap-2">
              {domainFamilies.map((f) => (
                <TabsTrigger
                  key={f.id}
                  value={f.id}
                  className="h-10 flex-none gap-2 px-3 text-sm data-active:text-cream sm:px-4"
                >
                  {f.name}
                  <span className="font-mono text-[10px] text-dim">{f.domains.length}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {domainFamilies.map((f) => (
            <TabsContent key={f.id} value={f.id} className="mt-6">
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.3em] text-violet">{f.en}</span>
                <span className="text-sm text-dim">{f.lead}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {f.domains.map((d) => (
                  <DomainCard key={d.id} d={d} highlight={top?.d.id === d.id} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
