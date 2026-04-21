import KaizenHero from "@/components/kaizen-hero"
import { HomeSections } from "@/components/home-sections"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-white)]">
      <KaizenHero videoSrc="/kaizen-car.mp4" />
      <HomeSections />
      <SiteFooter />
    </main>
  )
}
