import { Demo } from "@/components/site/demo"
import { Domains } from "@/components/site/domains"
import { FilmStrip } from "@/components/site/film-strip"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { Install } from "@/components/site/install"
import { Intro } from "@/components/site/intro"
import { Knowledge } from "@/components/site/knowledge"
import { Nav } from "@/components/site/nav"
import { Organize } from "@/components/site/organize"
import { Pipeline } from "@/components/site/pipeline"
import { Principles } from "@/components/site/principles"
import { Statement } from "@/components/site/statement"

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <FilmStrip />
        <Statement />
        <Organize />
        <Pipeline />
        <Domains />
        <FilmStrip reverse />
        <Demo />
        <Knowledge />
        <Principles />
        <Install />
      </main>
      <Footer />
      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />
    </>
  )
}
