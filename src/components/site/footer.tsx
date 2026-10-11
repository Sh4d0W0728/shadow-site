"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { Download } from "lucide-react"
import { useRef } from "react"
import { buttonVariants } from "@/components/ui/button"
import { DOWNLOAD_URL, RELEASES_URL, REPO_URL, VERSION } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Logo } from "./primitives"

const credits = [
  ["导演", "你"],
  ["剪辑助理", "shadow"],
  ["执行", "Codex"],
  ["精修与交付", "Premiere Pro"],
  ["补充素材", "包图网 · 你的会员会话"],
  ["字幕识别", "faster-whisper（本地）"],
]

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const fade = useTransform(scrollYProgress, [0.35, 1], [1, 0.25])
  const spacing = useTransform(scrollYProgress, [0.2, 1], ["-0.02em", "0.12em"])

  return (
    <footer ref={ref} className="relative overflow-hidden px-4 pt-28 pb-10 sm:px-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{ background: "radial-gradient(60% 70% at 50% 100%, rgba(124,107,242,0.22), transparent 70%)" }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] tracking-[0.35em] text-dim">END CREDITS</p>
          <dl className="mt-8 space-y-3">
            {credits.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-2 gap-6 text-sm sm:text-base"
              >
                <dt className="text-right text-dim">{k}</dt>
                <dd className="text-left font-serif font-bold text-cream">{v}</dd>
              </motion.div>
            ))}
          </dl>

          <h2 className="mt-20 font-serif text-[clamp(1.8rem,5vw,3.5rem)] leading-tight font-bold text-balance">
            下一条片子，
            <br />
            从一句 <span className="font-mono text-violet">$shadow</span> 开始。
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={DOWNLOAD_URL}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2 bg-cream px-6 text-[15px] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(182,162,247,0.7)] hover:bg-white"
              )}
            >
              <Download className="size-4" /> 下载 shadow.zip
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/15 bg-white/[0.03] px-6 text-[15px] text-cream hover:bg-white/[0.06]"
              )}
            >
              在 GitHub 上查看
            </a>
          </div>
        </div>

        <motion.div
          style={{ opacity: fade, letterSpacing: spacing }}
          className="text-outline mt-24 text-center text-[clamp(4rem,17vw,15rem)] leading-none font-bold whitespace-nowrap select-none"
          aria-hidden
        >
          FADE OUT
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-dim sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="size-5" />
            <span>
              shadow<span className="text-violet">.</span> · {VERSION} · MIT License
            </span>
          </div>
          <div className="flex gap-5">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-cream">
              GitHub
            </a>
            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="hover:text-cream">
              版本记录
            </a>
            <a href="#top" className="hover:text-cream">
              回到片头 ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
