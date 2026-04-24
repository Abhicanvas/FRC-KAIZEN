import KaizenHero from "@/components/kaizen-hero"
import { HomeSections } from "@/components/home-sections"
import { SiteFooter } from "@/components/site-footer"
import { SystemsShowcase } from "@/components/systems-showcase"

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-white)]">
      <KaizenHero videoSrc="/kaizen-car.mp4" />
      <SystemsShowcase />
      <HomeSections />
      <SiteFooter />
    </main>
  )
}
