'use client'

import Link from 'next/link'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Instagram, Linkedin, Mail } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const phaseCards = [
  {
    number: '01',
    title: 'Design',
    detail: 'Engineering analysis, system integration, and validation',
  },
  {
    number: '02',
    title: 'Build',
    detail: 'Manufacturing, fabrication, and assembly',
  },
  {
    number: '03',
    title: 'Test',
    detail: 'Performance evaluation, tuning, and iteration',
  },
  {
    number: '04',
    title: 'Race',
    detail: 'Competing on national and international circuits',
  },
]

const tickerItems = ['DESIGN', 'BUILD', 'TEST', 'RACE', 'DESIGN', 'BUILD', 'TEST', 'RACE']

const contactItems = [
  {
    label: 'Email',
    value: 'teamfrckaizen@gmail.com',
    href: 'mailto:teamfrckaizen@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/company/frc-kaizen',
    href: 'https://www.linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    value: '@frc_kaizen',
    href: 'https://www.instagram.com',
    icon: Instagram,
  },
]

const headingContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const headingWord = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export function HomeSections() {
  const aboutRef = useRef<HTMLElement | null>(null)
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.25 })
  const [memberCount, setMemberCount] = useState(0)
  const [carCount, setCarCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!aboutInView) {
      return
    }

    const memberAnimation = animate(0, 40, {
      duration: 1.4,
      onUpdate: (value) => setMemberCount(Math.round(value)),
    })

    const carAnimation = animate(0, 1, {
      duration: 0.9,
      onUpdate: (value) => setCarCount(Math.round(value)),
    })

    return () => {
      memberAnimation.stop()
      carAnimation.stop()
    }
  }, [aboutInView])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <>
      <motion.section
        ref={aboutRef}
        id="about"
        className="relative overflow-hidden border-y border-white/5 py-24"
        initial={{ opacity: 0, y: 40 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="editorial-grid-45 pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex items-end gap-6">
            <span className="font-display text-[clamp(6rem,13vw,12rem)] leading-none text-white/90">40+</span>
            <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.35em] text-red-600/80">
              Team Strength
            </span>
          </div>

          <div className="space-y-7">
            <p className="section-eyebrow">ABOUT US</p>
            <motion.h2
              className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-white md:text-6xl"
              variants={headingContainer}
              initial="hidden"
              animate={aboutInView ? 'visible' : 'hidden'}
            >
              {"FRC KAIZEN is a student-led Formula Student team driven by performance and execution, bringing together an interdisciplinary team of over forty members."
                .split(' ')
                .map((word, index) => (
                  <motion.span key={`${word}-${index}`} className="mr-3 inline-block" variants={headingWord}>
                    {word}
                  </motion.span>
                ))}
            </motion.h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-300">
              <p>
                From concept to validation, every system is engineered, built, and refined with intent. Design,
                manufacturing, and testing operate as a continuous cycle—guided by data and iteration.
              </p>
              <p>
                We compete on national and international circuits, focused on delivering performance on and off the
                track.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 pt-2">
              <div>
                <p className="font-display text-4xl text-white">{memberCount}+</p>
                <p className="font-body text-xs uppercase tracking-[0.24em] text-zinc-500">Members</p>
              </div>
              <div>
                <p className="font-display text-4xl text-white">{carCount.toString().padStart(2, '0')}</p>
                <p className="font-body text-xs uppercase tracking-[0.24em] text-zinc-500">Active Car</p>
              </div>
              <div>
                <p className="font-display text-4xl text-white">∞</p>
                <p className="font-body text-xs uppercase tracking-[0.24em] text-zinc-500">Iterations</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-24">
        <div className="mb-16 overflow-hidden border-y border-red-600/40 bg-black">
          <div className="flex w-max animate-[marquee_12s_linear_infinite] py-4 will-change-transform">
            {[0, 1].map((loop) => (
              <div key={loop} aria-hidden={loop === 1} className="flex shrink-0 items-center whitespace-nowrap">
                {tickerItems.map((item, index) => (
                  <span
                    key={`${loop}-${item}-${index}`}
                    className="font-display px-8 text-5xl tracking-wide text-red-600 md:text-6xl"
                  >
                    {item} <span className="text-red-500">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex justify-start">
            <p className="section-eyebrow">WHAT WE DO</p>
          </div>
          <p className="mb-10 max-w-4xl text-base leading-relaxed text-zinc-300">
            At FRC KAIZEN, we follow a complete vehicle development cycle—covering design, manufacturing, testing, and
            on-track performance. Each phase is executed with precision and intent, driven by data, iteration, and
            attention to detail. From the garage to the grid, every system is developed to deliver performance.
          </p>
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {phaseCards.map((card) => (
              <motion.div
                key={card.number}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                  <Card className="h-full rounded-none border border-white/10 border-t-red-600 bg-[#111111] p-6 transition-all duration-300 group-hover:border-red-600/80 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    <p className="font-display text-5xl text-red-900">{card.number}</p>
                    <h3 className="font-display text-4xl uppercase text-white transition-colors group-hover:text-white">{card.title}</h3>
                    <Badge
                      variant="outline"
                      className="mt-4 rounded-none border-red-600/40 bg-red-950/20 font-body text-sm text-zinc-200"
                    >
                      {card.detail}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute left-[-10%] top-1/2 h-px w-[140%] -rotate-12 bg-red-600/20" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[20vw] leading-none text-white/[0.03]">
          改善
        </span>

        <motion.div
          className="relative z-10 mx-auto max-w-4xl space-y-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.p variants={headingWord} className="section-eyebrow">
            KAIZEN
          </motion.p>
          <motion.h2 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl">
            {'Constant refinement. Continuous evolution.'.split(' ').map((word, index) => (
              <motion.span key={`${word}-${index}`} variants={headingWord} className="mr-3 inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p variants={headingWord} className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Every system is developed through iteration, every detail improved with intent. From design to track,
            progress is built step by step.
          </motion.p>
          <motion.p variants={headingWord} className="text-lg italic text-red-500 md:text-xl">
            Performance is not achieved — it is refined.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="py-24"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <p className="section-eyebrow">OUR PARTNERS</p>
          </div>
          <h2 className="font-display text-5xl uppercase text-white md:text-7xl">Powered by Partnership</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
            FRC KAIZEN is driven by performance—and powered by partnership. We work with organizations that value
            engineering, innovation, and visibility. From car livery to digital platforms, we ensure meaningful brand
            presence at national and international Formula Student competitions.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`h-24 rounded border border-white/10 bg-white/5 ${
                  index % 2 === 0 ? 'animate-pulse' : ''
                }`}
              />
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-10 rounded-none border-red-600 text-red-500 hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            <Link href="/sponsorship">
              BECOME A PARTNER <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="section-eyebrow">ESTABLISH CONTACT</p>
          <div className="mt-8 space-y-5">
            {contactItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href} className="group flex items-start gap-4">
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-red-600/60 bg-red-600/10 text-red-500">
                    <Icon className="size-4" />
                  </span>
                  <span className="space-y-1">
                    <span className="block text-xs uppercase tracking-[0.24em] text-zinc-500">{item.label}</span>
                    <span className="text-base text-white transition-colors group-hover:text-red-400 group-hover:underline group-hover:decoration-red-500">
                      {item.value}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <Card className="rounded-none border border-white/10 bg-[#111111] p-8">
          <AnimatePresence mode="wait" initial={false}>
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-body text-xs uppercase tracking-[0.22em] text-zinc-400">
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="rounded-none border-white/15 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:border-red-600 focus-visible:ring-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-body text-xs uppercase tracking-[0.22em] text-zinc-400">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="rounded-none border-white/15 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:border-red-600 focus-visible:ring-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-body text-xs uppercase tracking-[0.22em] text-zinc-400">
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your idea or partnership inquiry."
                    required
                    className="min-h-32 rounded-none border-white/15 bg-black/30 text-white placeholder:text-zinc-500 focus-visible:border-red-600 focus-visible:ring-red-600"
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full rounded-none bg-red-600 font-display text-lg uppercase tracking-[0.2em] text-white hover:bg-red-500"
                >
                  SEND IT
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex min-h-52 flex-col items-center justify-center gap-3 text-center"
              >
                <CheckCircle2 className="size-10 text-red-500" />
                <p className="text-lg text-white">Message received. We&apos;ll be in touch.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </section>
    </>
  )
}
