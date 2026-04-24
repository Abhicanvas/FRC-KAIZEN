'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { CSSProperties } from 'react'

import type { SystemData } from '@/lib/systems-data'
import { cn } from '@/lib/utils'

type CardPlacement = {
  left: string
  top: string
  width: number
  height: number
  rotate?: number
}

export type DesktopSystemLayout = {
  primary: CardPlacement
  secondary: CardPlacement
  text: {
    left: string
    top: string
  }
  waypoint: {
    left: string
    top: string
  }
}

type SystemCardProps = {
  system: SystemData
  layout: DesktopSystemLayout
  dotIndex: number
  isMobile: boolean
}

type CardImageProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  category: string
}

function CardImage({ src, alt, sizes, priority = false, category }: CardImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover brightness-[0.75] contrast-110 saturate-90 transition-[filter] duration-500 group-hover:brightness-90 group-hover:saturate-100"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#111_0%,#0a0a0a_100%)] p-4">
          <span className="text-xs uppercase tracking-[0.2em] text-white/20">{category} · Image pending</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(220,38,38,0.08)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-red-600 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
    </>
  )
}

function toDesktopStyle(placement: CardPlacement): CSSProperties {
  return {
    left: placement.left,
    top: placement.top,
    width: placement.width,
    height: placement.height,
  }
}

export function SystemCard({ system, layout, dotIndex, isMobile }: SystemCardProps) {
  if (isMobile) {
    return (
      <article className="system-mobile-item relative ml-6 border border-white/10 bg-[#0f0f0f]/80 p-4 shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute -left-6 top-16 z-20 h-2 w-2 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.2),0_0_12px_rgba(220,38,38,0.4)]" />

        <div className="group relative h-[240px] w-full overflow-hidden border border-white/10 bg-[#111111]">
          <CardImage
            src={system.primaryImage}
            alt={system.headline}
            sizes="(max-width: 768px) 100vw, 420px"
            priority={system.index === '01'}
            category={system.category}
          />
        </div>

        <div className="mt-5 max-w-[26ch]">
          <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
            {system.index}&nbsp;&nbsp;{system.category}
          </p>
          <h3 className="font-display text-[clamp(1.45rem,6vw,2.1rem)] uppercase leading-[1.05] text-white">
            {system.headline}
          </h3>
          <div className="my-3 h-px w-full bg-red-600/75" />
          <p className="text-sm leading-relaxed text-white/55">{system.description}</p>
        </div>

        <div className="group relative ml-auto mt-5 h-[170px] w-[68%] overflow-hidden border border-white/10 bg-[#111111]">
          <CardImage
            src={system.secondaryImage}
            alt={`${system.category} detail`}
            sizes="(max-width: 768px) 68vw, 280px"
            category={system.category}
          />
        </div>
      </article>
    )
  }

  return (
    <>
      <motion.div
        className={cn(
          'system-card group absolute overflow-hidden border border-white/[0.06] bg-[#0f0f0f] shadow-[0_4px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]',
          `card-${system.id}-primary`,
        )}
        style={toDesktopStyle(layout.primary)}
        whileHover={{
          scale: 1.025,
          zIndex: 26,
          boxShadow: '0 8px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(220,38,38,0.4)',
          transition: { type: 'spring', stiffness: 280, damping: 22 },
        }}
      >
        <CardImage
          src={system.primaryImage}
          alt={system.headline}
          sizes="(max-width: 1280px) 32vw, 420px"
          priority={system.index === '01'}
          category={system.category}
        />
      </motion.div>

      <motion.div
        className={cn(
          'system-card group absolute overflow-hidden border border-white/[0.06] bg-[#0f0f0f] shadow-[0_4px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]',
          `card-${system.id}-secondary`,
        )}
        style={toDesktopStyle(layout.secondary)}
        initial={{ rotate: layout.secondary.rotate ?? 0 }}
        whileHover={{
          rotate: 0,
          scale: 1.03,
          zIndex: 28,
          transition: { type: 'spring', stiffness: 250, damping: 20 },
        }}
      >
        <CardImage
          src={system.secondaryImage}
          alt={`${system.category} detail`}
          sizes="(max-width: 1280px) 24vw, 280px"
          category={system.category}
        />
      </motion.div>

      <motion.div className={cn('absolute z-20 max-w-[22ch]', `text-${system.id}`)} style={layout.text}>
        <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
          {system.index}&nbsp;&nbsp;{system.category}
        </p>
        <h3 className="font-display text-[clamp(1.7rem,2.8vw,2.55rem)] uppercase leading-[1.05] text-white">
          {system.headline}
        </h3>
        <motion.div
          className="my-3 h-px w-full bg-red-600/80"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.p
          className="text-sm leading-relaxed text-white/50"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {system.description}
        </motion.p>
      </motion.div>

      <div
        className={cn(
          'waypoint-dot absolute z-20 h-2 w-2 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.2),0_0_12px_rgba(220,38,38,0.4)]',
          `dot-${dotIndex}`,
        )}
        style={layout.waypoint}
      />
    </>
  )
}
