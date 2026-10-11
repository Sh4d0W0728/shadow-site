"use client"

import { motion } from "motion/react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function formatTimecode(totalFrames: number, fps = 25) {
  const f = Math.max(0, Math.floor(totalFrames))
  const frames = f % fps
  const s = Math.floor(f / fps)
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames)}`
}

export async function copyText(text: string, label = "已复制到剪贴板") {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(label)
  } catch {
    toast.error("复制失败，请手动选择文本")
  }
}

export function Eyebrow({
  index,
  children,
  className,
}: {
  index: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-dim uppercase",
        className
      )}
    >
      <span className="text-violet">{index}</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{children}</span>
    </div>
  )
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "font-serif text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] font-bold tracking-tight text-balance text-cream",
        className
      )}
    >
      {children}
    </motion.h2>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden>
      <rect width="128" height="128" rx="28" fill="#171522" />
      <path
        d="M91 32H47c-24 0-30 35-5 40l36 7c9 2 9 17-2 17H32"
        fill="none"
        stroke="#a79bff"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="m56 45 27 16-27 16z" fill="#fff" />
    </svg>
  )
}
