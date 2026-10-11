"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

type Phase = 3 | 2 | 1 | "open" | "done"

export function Intro() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(3)

  useEffect(() => {
    if (reduce) return
    const seq: [Phase, number][] = [
      [2, 520],
      [1, 1040],
      ["open", 1560],
      ["done", 2600],
    ]
    const timers = seq.map(([p, t]) => setTimeout(() => setPhase(p), t))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  useEffect(() => {
    document.documentElement.style.overflow = !reduce && typeof phase === "number" ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [phase, reduce])

  if (reduce || phase === "done") return null

  return (
    <div
      className="intro-failsafe fixed inset-0 z-[100] cursor-pointer"
      onClick={() => setPhase("done")}
      role="presentation"
    >
      <AnimatePresence>
        {typeof phase === "number" && (
          <motion.div
            key="leader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10 grid place-items-center bg-[#0d0d0f]"
          >
            <div className="scanlines absolute inset-0 opacity-60" />
            <div className="relative grid size-[min(70vw,420px)] place-items-center">
              <div className="absolute inset-0 rounded-full border border-white/25" />
              <div className="absolute inset-[9%] rounded-full border border-white/15" />
              <div className="absolute inset-x-[-30%] top-1/2 h-px bg-white/20" />
              <div className="absolute inset-y-[-30%] left-1/2 w-px bg-white/20" />
              <motion.div
                key={`sweep-${phase}`}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.52, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(182,162,247,0.38) 0deg, rgba(182,162,247,0.0) 90deg, transparent 360deg)",
                }}
              />
              <motion.span
                key={phase}
                initial={{ scale: 1.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="relative font-mono text-[min(36vw,220px)] leading-none font-light text-cream"
              >
                {phase}
              </motion.span>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-white/40">
              SHADOW · REEL 01 · 点击跳过
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 top-0 bg-black"
        initial={{ height: "50%" }}
        animate={{ height: phase === "open" ? "0%" : "50%" }}
        transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black"
        initial={{ height: "50%" }}
        animate={{ height: phase === "open" ? "0%" : "50%" }}
        transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
      />
    </div>
  )
}
