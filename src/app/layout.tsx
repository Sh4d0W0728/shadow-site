import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const serif = Noto_Serif_SC({
  variable: "--font-serif-sc",
  weight: ["500", "700", "900"],
  preload: false,
})

export const metadata: Metadata = {
  title: "shadow — 让素材，成为故事。",
  description:
    "面向 Codex 与 Premiere Pro 的影视剪辑 skill：素材整理、包图网补材、时间线、字幕与标题、Premiere 交付。20 个领域、12 套配方、56 张技巧卡。",
  openGraph: {
    title: "shadow — 让素材，成为故事。",
    description: "从第一帧整理，到最后一帧交付。Codex × Premiere Pro 剪辑工作流。",
  },
}

export const viewport: Viewport = {
  themeColor: "#07080c",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${serif.variable} antialiased`}
    >
      <body className="min-h-full bg-ink text-cream">
        {children}
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  )
}
