'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { type CSSProperties } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Tier = {
  badge: string
  title: string
  benefits: string[]
  enterFrom: number
  cardClassName: string
  badgeClassName: string
  cardStyle?: CSSProperties
}

const tiers: Tier[] = [
  {
    badge: 'PLATINUM',
    title: 'Platinum Partner',
    benefits: [
      'Primary logo placement on car (high-visibility zones)',
      'Branding on team apparel (race suits, team wear)',
      'Featured across all social media platforms',
      'Logo on official website with top-tier positioning',
      'Direct technical collaboration opportunities',
      'Priority visibility at competitions and events',
    ],
    enterFrom: 100,
    cardClassName: 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.2)]',
    badgeClassName: 'border border-red-500/70 bg-red-950/50 text-red-200',
    cardStyle: {
      backgroundImage: 'linear-gradient(135deg, #1a0000, #0a0a0a)',
    },
  },
  {
    badge: 'GOLD',
    title: 'Gold Partner',
    benefits: [
      'Prominent logo placement on car',
      'Branding on team apparel',
      'Regular mentions on social media',
      'Logo on website',
      'Visibility during competitions and team activities',
    ],
    enterFrom: -100,
    cardClassName: 'border-yellow-600/40 bg-[#0f0f0f]',
    badgeClassName: 'border border-amber-500/50 bg-amber-500/10 text-amber-300',
  },
  {
    badge: 'SILVER',
    title: 'Silver Partner',
    benefits: [
      'Logo placement on car (secondary areas)',
      'Mentions on social media',
      'Logo on website',
      'Recognition during events',
    ],
    enterFrom: 100,
    cardClassName: 'border-white/20 bg-[#0f0f0f]',
    badgeClassName: 'border border-white/30 bg-white/10 text-white',
  },
  {
    badge: 'ASSOCIATE',
    title: 'Associate Partner',
    benefits: [
      'Logo on website',
      'Social media mentions',
      'Acknowledgment in team communications',
    ],
    enterFrom: -100,
    cardClassName: 'border-white/10 bg-[#0f0f0f]',
    badgeClassName: 'border border-zinc-600 bg-zinc-700/30 text-zinc-200',
  },
]

const ctaLetterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const ctaLetter = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export function SponsorshipSections() {
  const ctaHeadline = 'Partner with us. Build performance. Share the grid.'

  return (
    <>
      <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(220,38,38,0.15),transparent_60%)]" />
        <div className="absolute left-0 right-0 top-0 h-px animate-[scan_4s_linear_infinite] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />

        <div className="relative mx-auto w-full max-w-6xl">
          <Badge
            variant="destructive"
            className="rounded-none border border-red-500/60 bg-red-600/20 px-4 py-1 uppercase tracking-[0.25em] text-red-200"
          >
            SPONSORSHIP
          </Badge>
          <div className="mt-6 space-y-1">
            <motion.h1
              className="font-display text-4xl uppercase leading-none text-white sm:text-5xl md:text-7xl lg:text-9xl"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Powering Performance.
            </motion.h1>
            <motion.h1
              className="font-display text-4xl uppercase leading-none text-white sm:text-5xl md:text-7xl lg:text-9xl"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
            >
              Driving Innovation.
            </motion.h1>
          </div>
          <motion.p
            className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.7 }}
          >
            We offer structured partnership opportunities built for visibility, collaboration, and shared performance
            outcomes across the Formula Student season.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">INTRO</p>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            FRC KAIZEN offers structured partnership opportunities designed to deliver strong brand visibility,
            technical collaboration, and real-world engineering impact. Our partners gain exposure across national and
            international Formula Student circuits—through the car, the team, and our digital presence.
          </p>
        </motion.div>
        <motion.blockquote
          className="border-l-4 border-red-600 pl-5 text-2xl font-display leading-tight text-white sm:pl-6 sm:text-3xl md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          From car to circuit — your brand goes where we go.
        </motion.blockquote>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-4 sm:px-6">
        <p className="section-eyebrow">PARTNERSHIP TIERS</p>

        {tiers.map((tier) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, x: tier.enterFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
          >
            <Card
              className={`rounded-none border p-0 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(220,38,38,0.2)] ${tier.cardClassName}`}
              style={tier.cardStyle}
            >
              <div className="grid md:grid-cols-[minmax(0,30%)_minmax(0,70%)]">
                <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
                  <Badge className={`rounded-none px-3 py-1 text-xs uppercase tracking-[0.24em] ${tier.badgeClassName}`}>
                    {tier.badge}
                  </Badge>
                  <h3 className="mt-4 font-display text-4xl uppercase text-white sm:text-5xl">{tier.title}</h3>
                </div>

                <div className="p-6">
                  {tier.benefits.map((benefit, index) => (
                    <div key={benefit}>
                      <div className="flex items-start gap-3 text-zinc-200">
                        <span className="mt-1 text-red-500">◆</span>
                        <p className="leading-relaxed">{benefit}</p>
                      </div>
                      {index < tier.benefits.length - 1 && <Separator className="my-4 bg-white/10" />}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <motion.section
        className="relative mt-24 overflow-hidden bg-red-600 px-4 py-16 text-black sm:px-6 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={ctaLetterContainer}
      >
        <span className="pointer-events-none absolute right-4 top-4 animate-spin text-5xl opacity-35 [animation-duration:20s] sm:right-6 sm:top-5 sm:text-7xl">
          🏁
        </span>
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="max-w-5xl font-display text-4xl uppercase leading-[0.92] sm:text-5xl md:text-7xl">
            {ctaHeadline.split('').map((letter, index) => (
              <motion.span key={`${letter}-${index}`} variants={ctaLetter} className="inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h2>
          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-none border-black bg-transparent text-black hover:bg-black hover:text-white"
          >
            <Link href="/#contact">
              ESTABLISH CONTACT <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </>
  )
}
