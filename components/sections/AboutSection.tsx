'use client'

import { LeftColumn } from '@/components/sections/LeftColumn'
import { RightColumn } from '@/components/sections/RightColumn'
import { VerticalDivider } from '@/components/sections/VerticalDivider'

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(45deg,#ffffff08_0px,#ffffff08_1px,transparent_1px,transparent_40px)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-screen-xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-[1fr_1px_1fr]">
        <LeftColumn />
        <VerticalDivider />
        <RightColumn />
      </div>
    </section>
  )
}
