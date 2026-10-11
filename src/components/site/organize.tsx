"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./primitives"
import { SceneThumb, type SceneKind } from "./scene-thumb"

const columns: { name: string; short: string; kind: SceneKind }[] = [
  { name: "01_人物", short: "人物", kind: "person" },
  { name: "02_场地", short: "场地", kind: "venue" },
  { name: "03_产品", short: "产品", kind: "product" },
  { name: "04_活动", short: "活动", kind: "crowd" },
  { name: "99_待复核", short: "复核", kind: "unknown" },
]

const clips = [
  { from: "C0042.MP4", to: "01-001_访谈正面", tag: "主讲人 · 正面", col: 0 },
  { from: "A7S_1183.MOV", to: "01-002_侧脸反应", tag: "嘉宾 · 侧脸", col: 0 },
  { from: "IMG_7781.MOV", to: "01-003_走位跟拍", tag: "人物 · 跟拍", col: 0 },
  { from: "DJI_0007.MP4", to: "02-001_园区航拍", tag: "园区 · 清晨", col: 1 },
  { from: "C0118.MP4", to: "02-002_展厅全景", tag: "展厅 · 全景", col: 1 },
  { from: "GH5_0291.MOV", to: "02-003_门头夜景", tag: "门头 · 夜", col: 1 },
  { from: "C0055.MP4", to: "03-001_样机特写", tag: "样机 · 手持", col: 2 },
  { from: "MVI_4410.MP4", to: "03-002_接口细节", tag: "细节 · 微距", col: 2 },
  { from: "C0061.MP4", to: "03-003_包装开箱", tag: "开箱 · 俯拍", col: 2 },
  { from: "IMG_8012.MOV", to: "04-001_开场灯光", tag: "开场 · 舞台", col: 3 },
  { from: "C0203.MP4", to: "04-002_观众鼓掌", tag: "观众 · 反应", col: 3 },
  { from: "A7S_1290.MOV", to: "04-003_颁奖合影", tag: "颁奖 · 合影", col: 3 },
  { from: "VID_0001.MP4", to: "99-001_失焦片段", tag: "无法判断", col: 4 },
  { from: "C0300.MP4", to: "99-002_遮挡镜头", tag: "画面遮挡", col: 4 },
]

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const COL_W = 17.6
const CARD_H = 14.4

const layout = clips.map((c, i) => {
  const row = clips.slice(0, i).filter((x) => x.col === c.col).length
  const sx = 2 + rand(i + 1) * 78
  const sy = 4 + rand(i + 31) * 66
  return {
    ...c,
    kind: columns[c.col].kind,
    sx,
    sy,
    rot: (rand(i + 77) - 0.5) * 34,
    tx: 1.6 + c.col * 19.6,
    ty: 17 + row * 18.5,
    scanAt: 0.14 + 0.34 * ((sy + CARD_H / 2) / 85),
    moveStart: 0.52 + c.col * 0.035 + row * 0.018,
  }
})

const steps = [
  { title: "读入与去重", body: "递归读取视频、记录技术信息；相同内容只整理一份，保留全部来源。" },
  { title: "查看与识别", body: "带时间点的真实抽帧，由 Codex 看图写下内容摘要与标签，而不是猜文件名。" },
  { title: "分类与编号", body: "10 个默认内容分类，也可按你的目录规则。原片保留，副本带编号与短标题。" },
  { title: "核验与查找", body: "SHA-256 校验、CSV 原名对照、可点开视频的 HTML 素材目录。" },
]

function Card({ item, index, p }: { item: (typeof layout)[number]; index: number; p: MotionValue<number> }) {
  const m0 = item.moveStart
  const m1 = m0 + 0.17
  const left = useTransform(p, [m0, m1], [`${item.sx}%`, `${item.tx}%`])
  const top = useTransform(p, [m0, m1], [`${item.sy}%`, `${item.ty}%`])
  const rotate = useTransform(p, [m0, m1], [item.rot, 0])
  const scale = useTransform(p, [0, 0.1, m0, m1], [1.18, 1.05, 1.05, 1])
  const tagOpacity = useTransform(p, [item.scanAt - 0.01, item.scanAt + 0.02, m0, m0 + 0.05], [0, 1, 1, 0])
  const glow = useTransform(p, [item.scanAt - 0.015, item.scanAt, item.scanAt + 0.05], [0, 1, 0])
  const oldName = useTransform(p, [m0 + 0.08, m0 + 0.14], [1, 0])
  const newName = useTransform(p, [m0 + 0.1, m0 + 0.16], [0, 1])
  const boxShadow = useTransform(glow, (g) => `0 0 0 1px rgba(182,162,247,${0.15 + g * 0.85}), 0 0 ${g * 28}px rgba(182,162,247,${g * 0.6})`)

  return (
    <motion.div
      className="absolute overflow-hidden rounded-[4px] bg-black will-change-transform sm:rounded-md"
      style={{ left, top, rotate, scale, width: `${COL_W}%`, height: `${CARD_H}%`, boxShadow, zIndex: index }}
    >
      <SceneThumb kind={item.kind} seed={index} className="size-full" />
      <motion.span
        style={{ opacity: tagOpacity }}
        className="absolute top-1 left-1 hidden rounded bg-violet px-1.5 py-0.5 text-[9px] font-medium text-ink sm:block lg:text-[10px]"
      >
        {item.tag}
      </motion.span>
      <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/85 to-transparent px-1.5 pt-3 pb-1 font-mono text-[8px] leading-none text-cream/90 sm:block lg:text-[9.5px]">
        <motion.span style={{ opacity: oldName }} className="absolute bottom-1 left-1.5">
          {item.from}
        </motion.span>
        <motion.span style={{ opacity: newName }} className="block truncate text-lime">
          {item.to}
        </motion.span>
      </div>
    </motion.div>
  )
}

function ColumnHeaders({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.5, 0.58], [0, 1])
  const footer = useTransform(p, [0.86, 0.92], [0, 1])
  return (
    <>
      {columns.map((c, i) => (
        <motion.div
          key={c.name}
          style={{ opacity, left: `${1.6 + i * 19.6}%`, width: `${COL_W}%` }}
          className="absolute top-[5%] flex items-center gap-1 border-b border-white/10 pb-1 font-mono text-[9px] text-cream/80 sm:gap-1.5 sm:text-[11px]"
        >
          <span className={cn("size-1.5 shrink-0 rounded-sm", i === 4 ? "bg-dim" : "bg-violet")} />
          <span className="hidden truncate sm:inline">{c.name}</span>
          <span className="sm:hidden">{c.short}</span>
        </motion.div>
      ))}
      {columns.map((c, i) => (
        <motion.div
          key={`f-${c.name}`}
          style={{ opacity: footer, left: `${1.6 + i * 19.6}%`, width: `${COL_W}%` }}
          className="absolute top-[74%] font-mono text-[8px] text-lime sm:text-[10px]"
        >
          ✓ sha256
          <span className="hidden text-dim sm:inline"> · 3 / 3</span>
        </motion.div>
      ))}
    </>
  )
}

export function Organize() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [active, setActive] = useState(0)
  const scanTop = useTransform(scrollYProgress, [0.12, 0.48], ["0%", "100%"])
  const scanOpacity = useTransform(scrollYProgress, [0.1, 0.13, 0.47, 0.5], [0, 1, 1, 0])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.12 ? 0 : v < 0.5 ? 1 : v < 0.84 ? 2 : 3)
  })

  return (
    <section id="organize" ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Eyebrow index="01">INGEST · 原片整理</Eyebrow>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,3.4rem)] leading-[1.1] font-bold text-balance">
              把原片交进来，
              <br />
              把秩序带回去。
            </h2>
            <p className="mt-4 hidden max-w-md text-[15px] leading-relaxed text-dim sm:block">
              给一个原始视频文件夹，再指定存放位置。shadow 递归扫描、提取真实画面供 Codex 识别，按内容分类编号、复制到目标目录。
            </p>
            <ol className="mt-5 grid grid-cols-4 gap-2 lg:mt-8 lg:grid-cols-1 lg:gap-0">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "relative border-t-2 pt-2 transition-colors duration-500 lg:border-t-0 lg:border-l-2 lg:py-3 lg:pt-3 lg:pl-5",
                    i === active ? "border-violet" : "border-white/10"
                  )}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="hidden font-mono text-[11px] text-violet lg:inline">0{i + 1}</span>
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors sm:text-sm lg:text-base",
                        i === active ? "text-cream" : "text-dim"
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                  <motion.p
                    initial={false}
                    animate={{ height: i === active ? "auto" : 0, opacity: i === active ? 1 : 0 }}
                    className="hidden overflow-hidden text-sm leading-relaxed text-dim lg:block"
                  >
                    <span className="block pt-1.5">{s.body}</span>
                  </motion.p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0c12] shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2 font-mono text-[10px] text-dim sm:text-[11px]">
                <span className="truncate">
                  D:\拍摄原片 <span className="text-violet">→</span> E:\项目\整理素材
                </span>
                <span className="hidden shrink-0 sm:inline">186 files · 3 dup merged</span>
              </div>
              <div className="relative aspect-[16/11] w-full">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <ColumnHeaders p={scrollYProgress} />
                {layout.map((item, i) => (
                  <Card key={item.from} item={item} index={i} p={scrollYProgress} />
                ))}
                <motion.div
                  style={{ top: scanTop, opacity: scanOpacity }}
                  className="pointer-events-none absolute inset-x-0 z-40 h-px bg-violet shadow-[0_0_24px_4px_rgba(182,162,247,0.55)]"
                >
                  <span className="absolute -top-5 right-2 font-mono text-[9px] text-violet">
                    VIEWING FRAMES…
                  </span>
                </motion.div>
              </div>
              <div className="grid grid-cols-3 border-t border-white/[0.06] font-mono text-[9px] text-dim sm:text-[11px]">
                {["原名对照.csv", "素材目录.html", "98_无法读取 · 99_待复核"].map((f) => (
                  <span key={f} className="truncate border-r border-white/[0.06] px-3 py-2 last:border-r-0">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
