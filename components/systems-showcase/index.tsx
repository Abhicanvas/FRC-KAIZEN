'use client'

import { useRef } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { useSystemsAnimation } from '@/hooks/use-systems-animation'
import type { SystemId } from '@/lib/systems-data'
import { systems } from '@/lib/systems-data'
import { cn } from '@/lib/utils'

import { AccentDots } from './accent-dots'
import { PathTraveler } from './path-traveler'
import { SectionLabel } from './section-label'
import { type DesktopSystemLayout, SystemCard } from './system-card'
import { SVGConnector } from './svg-connector'

const desktopLayouts: Record<SystemId, DesktopSystemLayout> = {
  powertrain: {
    primary: { left: '2vw', top: '22vh', width: 420, height: 320 },
    secondary: { left: '14vw', top: '52vh', width: 280, height: 200, rotate: 1.5 },
    text: { left: '2vw', top: '58vh' },
    waypoint: { left: '20vw', top: '48vh' },
  },
  aerodynamics: {
    primary: { left: '30vw', top: '8vh', width: 380, height: 280 },
    secondary: { left: '36vw', top: '44vh', width: 240, height: 180, rotate: -1.2 },
    text: { left: '30vw', top: '66vh' },
    waypoint: { left: '58vw', top: '62vh' },
  },
  electronics: {
    primary: { left: '63vw', top: '16vh', width: 400, height: 310 },
    secondary: { left: '76vw', top: '2vh', width: 260, height: 190, rotate: 0.8 },
    text: { left: '63vw', top: '60vh' },
    waypoint: { left: '88vw', top: '50vh' },
  },
}

export function SystemsShowcase() {
  const showcaseRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const travelerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useSystemsAnimation({
    showcaseRef,
    pathRef,
    travelerRef,
    isMobile,
  })

  return (
    <section
      id="systems-showcase"
      ref={showcaseRef}
      className={cn('relative w-full', isMobile ? 'py-20' : 'h-[400vh]')}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-[#080808]',
          isMobile ? 'mx-auto max-w-6xl px-6' : 'sticky top-0 h-screen',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_5%_10%,rgba(220,38,38,0.07),transparent),radial-gradient(ellipse_30%_40%_at_95%_80%,rgba(220,38,38,0.05),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:80px_80px]" />

        <SectionLabel isMobile={isMobile} />

        {!isMobile && <SVGConnector pathRef={pathRef} />}
        {!isMobile && <PathTraveler travelerRef={travelerRef} />}
        {!isMobile && <AccentDots />}

        {isMobile && (
          <div className="pointer-events-none absolute bottom-12 left-6 top-24 z-[1] w-px border-l border-dashed border-red-500/40" />
        )}

        <div className={cn('relative z-10 w-full', isMobile ? 'space-y-14' : 'h-full')}>
          {systems.map((system, index) => (
            <SystemCard
              key={system.id}
              system={system}
              layout={desktopLayouts[system.id]}
              dotIndex={index + 1}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
