"use client"

import { Copy, Download, Terminal } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { DOWNLOAD_URL, INSTALL_CMD } from "@/lib/content"
import { cn } from "@/lib/utils"
import { copyText, Eyebrow, Reveal, SectionTitle } from "./primitives"

const UPDATE_CMD = `codex plugin marketplace upgrade shadow
codex plugin add shadow@shadow`

const steps = [
  { n: "1", title: "下载并完整解压", body: "从 GitHub Release 获取最新版 shadow.zip。" },
  { n: "2", title: "双击 安装shadow.cmd", body: "自动注册插件市场并安装，之后用 更新shadow.cmd 升级。" },
  { n: "3", title: "在 Codex 新开对话", body: "输入 $shadow 加上你的需求，开始剪辑。" },
]

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0b10]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[11px] text-dim">
          <Terminal className="size-3.5" /> {title}
        </span>
        <button
          type="button"
          onClick={() => copyText(code)}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-dim transition-colors hover:bg-white/5 hover:text-cream"
        >
          <Copy className="size-3" /> 复制
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-cream/90 sm:text-[13px]">
        {code.split("\n").map((line) => (
          <div key={line}>
            <span className="text-violet select-none">PS&gt; </span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

export function Install() {
  return (
    <section id="install" className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow index="07">INSTALL · 快速开始</Eyebrow>
            <SectionTitle className="mt-5">
              下载、解压、
              <br />
              双击。
            </SectionTitle>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-dim">
                Windows 优先。需要支持 <code className="font-mono text-cream">codex plugin</code> 的 Codex 与 Git；实际剪辑还需要 Python 3.10+、FFmpeg / ffprobe。ASR、字体与 Premiere 按任务准备——skill 会先跑一遍 <code className="font-mono text-cream">doctor</code> 检查环境。
              </p>
              <a
                href={DOWNLOAD_URL}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 h-12 gap-2 bg-cream px-6 text-[15px] font-semibold text-ink hover:bg-white"
                )}
              >
                <Download className="size-4" /> 下载 shadow.zip
              </a>
            </Reveal>
          </div>

          <div className="min-w-0 space-y-6 lg:col-span-7">
            <ol className="grid gap-3 sm:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <li className="relative h-full overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <span className="text-outline absolute -top-3 -right-1 font-mono text-7xl font-bold">{s.n}</span>
                    <h3 className="relative mt-8 font-medium text-cream">{s.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-dim">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.1}>
              <CodeBlock title="用终端安装" code={INSTALL_CMD} />
            </Reveal>
            <Reveal delay={0.15}>
              <CodeBlock title="更新到最新版" code={UPDATE_CMD} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
