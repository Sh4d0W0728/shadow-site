"use client"

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { Download } from "lucide-react"
import { useRef, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { DOWNLOAD_URL, REPO_URL } from "@/lib/content"
import { cn } from "@/lib/utils"
import { formatTimecode, Logo } from "./primitives"

const links = [
  { href: "#organize", label: "整理" },
  { href: "#pipeline", label: "流程" },
  { href: "#domains", label: "领域" },
  { href: "#demo", label: "演示" },
  { href: "#principles", label: "原则" },
  { href: "#install", label: "安装" },
]

const RUNTIME_FRAMES = 90 * 25

export function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const tcRef = useRef<HTMLSpanElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (tcRef.current) tcRef.current.textContent = formatTimecode(v * RUNTIME_FRAMES)
    setScrolled(v > 0.01)
  })

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="shadow 首页">
          <Logo className="size-7" />
          <span className="text-[17px] font-semibold tracking-tight">
            shadow<span className="text-violet">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="页面导航">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-dim transition-colors hover:bg-white/5 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-dim lg:flex">
            <span className="size-1.5 animate-blink rounded-full bg-rec" />
            <span ref={tcRef} className="tabular-nums">
              00:00:00:00
            </span>
            <span className="text-white/25">/ 00:01:30:00</span>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden text-dim sm:inline-flex")}
          >
            GitHub
          </a>
          <a
            href={DOWNLOAD_URL}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-8 gap-1.5 bg-cream px-3 text-ink hover:bg-white"
            )}
          >
            <Download className="size-3.5" />
            下载
          </a>
        </div>
      </div>
      <motion.div
        className="h-px origin-left bg-gradient-to-r from-violet-deep via-violet to-lime"
        style={{ scaleX: progress }}
      />
    </header>
  )
}
