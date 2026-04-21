import { SiteFooter } from '@/components/site-footer'
import { SponsorshipSections } from '@/components/sponsorship-sections'

export default function SponsorshipPage() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-white)]">
      <SponsorshipSections />
      <SiteFooter />
    </main>
  )
}
