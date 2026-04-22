'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react'
import { FormEvent, ReactNode, useState } from 'react'

import { AnimatedHeadline } from '@/components/animated-headline'
import { MarqueeTicker } from '@/components/marquee-ticker'
import { MotionWrapper } from '@/components/motion-wrapper'
import { RedLine } from '@/components/red-line'
import { StatCounter } from '@/components/stat-counter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cardEntry, clipReveal, fadeLeft, fadeRight, fadeUp, scalePulse, staggerContainer } from '@/lib/variants'

const stats = [
  { value: 42, suffix: '+', label: 'Members' },
  { value: 1, suffix: '', label: 'Active Car' },
  { value: 120, suffix: '+', label: 'Iterations' },
]

const phases = [
  {
    number: '01',
    title: 'Design',
    detail: 'Engineering analysis, system integration, and validation.',
  },
  {
    number: '02',
    title: 'Build',
    detail: 'Manufacturing, fabrication, and assembly across every subsystem.',
  },
  {
    number: '03',
    title: 'Test',
    detail: 'Performance evaluation, tuning, and iterative refinement.',
  },
  {
    number: '04',
    title: 'Race',
    detail: 'Competing on national and international Formula Student circuits.',
  },
]

const partners = ['Powertrain', 'Composite', 'Telemetry', 'Manufacturing', 'Aero', 'Media']

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
    href: 'https://www.linkedin.com/company/frc-kaizen',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    value: '@frc_kaizen',
    href: 'https://www.instagram.com/frc_kaizen',
    icon: Instagram,
  },
]

function SectionEyebrow({ children }: { children: ReactNode }) {
  return <span className="section-eyebrow">{children}</span>
}

function AnimatedSuccessMark() {
  return (
    <motion.svg
      viewBox="0 0 52 52"
      className="size-16"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="rgba(220,38,38,0.35)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <motion.path
        d="M15 27l7 7 15-17"
        fill="none"
        stroke="#DC2626"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

type ContactFieldProps = {
  id: 'name' | 'email' | 'message'
  label: string
  value: string
  onChange: (value: string) => void
  focusedField: string | null
  setFocusedField: (value: string | null) => void
  type?: string
  textarea?: boolean
}

function ContactField({
  id,
  label,
  value,
  onChange,
  focusedField,
  setFocusedField,
  type = 'text',
  textarea = false,
}: ContactFieldProps) {
  const active = focusedField === id || value.length > 0

  return (
    <motion.div
      layout
      animate={{
        scale: focusedField === id ? 1.005 : 1,
        borderColor: focusedField === id ? 'rgba(220,38,38,0.6)' : 'rgba(255,255,255,0.1)',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="relative border bg-black/45 px-4 pb-3 pt-6"
    >
      <motion.label
        layout
        htmlFor={id}
        animate={{
          y: active ? -10 : 2,
          scale: active ? 0.8 : 1,
          color: active ? '#DC2626' : '#6b7280',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="pointer-events-none absolute left-4 top-4 origin-left text-xs uppercase tracking-[0.22em]"
      >
        {label}
      </motion.label>

      {textarea ? (
        <Textarea
          id={id}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className="min-h-36 rounded-none border-0 bg-transparent px-0 pb-0 pt-2 text-base text-white placeholder:text-transparent focus-visible:ring-0"
          placeholder={label}
        />
      ) : (
        <Input
          id={id}
          type={type}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          className="h-11 rounded-none border-0 bg-transparent px-0 pb-0 pt-2 text-base text-white placeholder:text-transparent focus-visible:ring-0"
          placeholder={label}
        />
      )}
    </motion.div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [fields, setFields] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      <Card className="overflow-hidden rounded-none border-white/10 bg-white/[0.03] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="flex min-h-[420px] flex-col items-center justify-center px-8 text-center"
            >
              <AnimatedSuccessMark />
              <p className="mt-8 font-display text-3xl uppercase tracking-[0.05em] text-white md:text-4xl">Message received.</p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
                We&apos;ll be in touch after the next engineering stand-up.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
              className="space-y-4 p-6 md:p-8"
            >
              <ContactField
                id="name"
                label="Name"
                value={fields.name}
                onChange={(value) => setFields((current) => ({ ...current, name: value }))}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              <ContactField
                id="email"
                label="Email"
                type="email"
                value={fields.email}
                onChange={(value) => setFields((current) => ({ ...current, email: value }))}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              <ContactField
                id="message"
                label="Message"
                value={fields.message}
                onChange={(value) => setFields((current) => ({ ...current, message: value }))}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                textarea
              />

              <motion.div whileHover={{ backgroundColor: '#b91c1c', letterSpacing: '0.08em' }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="h-12 w-full rounded-none bg-red-600 font-display text-sm uppercase tracking-[0.18em] text-white hover:bg-red-700">
                  Send It
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export function HomeSections() {
  return (
    <>
      <section id="about" className="grain red-breath relative overflow-hidden border-t border-white/5">
        <div className="editorial-grid-45 absolute inset-0 opacity-70" />
        <div className="absolute inset-y-10 left-[7%] w-px bg-gradient-to-b from-transparent via-red-600/40 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 lg:grid-cols-[0.56fr_1.44fr] lg:gap-16 lg:py-32">
          <MotionWrapper variants={fadeRight} className="flex flex-col justify-between gap-10">
            <div className="relative">
              <span className="font-display text-[clamp(5.5rem,14vw,9.5rem)] leading-none text-white">40+</span>
              <span className="absolute bottom-4 left-[calc(100%-0.5rem)] text-xs uppercase tracking-[0.42em] text-zinc-500 [writing-mode:vertical-rl]">
                Team System
              </span>
            </div>
            <p className="max-w-sm text-sm uppercase tracking-[0.28em] text-zinc-500">
              Interdisciplinary engineering / continuous validation / relentless iteration
            </p>
          </MotionWrapper>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            <RedLine className="max-w-[18rem]" />
            <motion.div variants={clipReveal}>
              <SectionEyebrow>About Us</SectionEyebrow>
            </motion.div>
            <AnimatedHeadline
              text="FRC KAIZEN is a student-led Formula Student team driven by performance and execution, bringing together an interdisciplinary team of over forty members."
              className="max-w-none font-display text-[clamp(1.8rem,3.45vw,3.25rem)] uppercase leading-[1.03] tracking-[0.02em] text-white"
            />
            <motion.div variants={staggerContainer} className="grid gap-6 text-base leading-relaxed text-zinc-300 md:grid-cols-2 xl:max-w-[58rem]">
              <motion.p variants={fadeUp}>
                From concept to validation, every system is engineered, built, and refined with intent. Design, manufacturing,
                and testing operate as a continuous cycle guided by data and iteration.
              </motion.p>
              <motion.p variants={fadeUp}>
                We compete on national and international circuits, focused on delivering performance on and off the track.
                Every season sharpens the team, the car, and the decision-making behind both.
              </motion.p>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scalePulse}
                  whileHover={{ scale: 1.05, color: '#DC2626' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0"
                >
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="what-we-do" className="relative overflow-hidden border-t border-white/5 bg-[#090909] py-24 lg:py-32">
        <div className="engineering-grid absolute inset-0 opacity-70" />
        <div className="relative">
          <MarqueeTicker items={['Design', 'Build', 'Test', 'Race']} />

          <div className="mx-auto mt-14 max-w-7xl px-6 md:px-10">
            <motion.div variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <SectionEyebrow>What We Do</SectionEyebrow>
            </motion.div>
            <MotionWrapper variants={fadeUp} className="mt-6 max-w-4xl text-base leading-relaxed text-zinc-300 md:text-lg">
              <p>
                At FRC KAIZEN, we follow a complete vehicle development cycle covering design, manufacturing, testing, and
                on-track performance. Each phase is executed with precision and intent, driven by data, iteration, and
                attention to detail. From the garage to the grid, every system is developed to deliver performance.
              </p>
            </MotionWrapper>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-12 grid gap-px bg-white/10 md:grid-cols-2"
            >
              {phases.map((phase, index) => (
                <motion.div key={phase.number} variants={index % 2 === 0 ? fadeRight : fadeLeft}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    className="h-full border-t border-red-600/60 bg-[rgba(17,17,17,0.95)] p-8"
                    variants={{
                      rest: {},
                      hover: {
                        scale: 1.02,
                        boxShadow: '0 0 0 1px #DC2626, 0 8px 32px rgba(220,38,38,0.2)',
                        transition: { duration: 0.25, ease: 'easeOut' },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        rest: { y: 0, opacity: 0.3 },
                        hover: { y: -4, opacity: 1 },
                      }}
                      className="font-display text-5xl leading-none text-red-700"
                    >
                      {phase.number}
                    </motion.div>
                    <h3 className="mt-7 font-display text-3xl uppercase tracking-[0.04em] text-white md:text-[2rem]">{phase.title}</h3>
                    <Badge className="mt-5 rounded-none border border-red-600/40 bg-red-600/10 px-3 py-2 font-body text-[11px] uppercase tracking-[0.18em] text-zinc-200">
                      {phase.detail}
                    </Badge>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="slash-field grain relative isolate overflow-hidden border-t border-white/5 px-6 py-28 md:px-10 lg:min-h-[88vh] lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.03, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 2, ease: 'easeOut' },
            scale: { duration: 2, ease: 'easeOut' },
            y: { duration: 8, ease: 'easeInOut', repeat: Infinity },
          }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[28vw] leading-none text-white"
        >
          改善
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <SectionEyebrow>Kaizen</SectionEyebrow>
          </motion.div>
          <motion.div variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mt-10">
            <div className="h-px w-full rotate-[-12deg] bg-red-600/20" />
          </motion.div>
          <AnimatedHeadline
            text="Constant refinement."
            className="mt-14 font-display text-[clamp(2.35rem,5.6vw,4.85rem)] uppercase leading-[0.92] tracking-[0.04em] text-white"
          />
          <AnimatedHeadline
            text="Continuous evolution."
            delay={0.2}
            className="font-display text-[clamp(2.35rem,5.6vw,4.85rem)] uppercase leading-[0.92] tracking-[0.04em] text-white"
          />
          <MotionWrapper variants={fadeUp} className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            <p>
              Every system is developed through iteration, every detail improved with intent. From design to track, progress is
              built step by step.
            </p>
          </MotionWrapper>
          <motion.p
            initial={{ opacity: 0, y: 28, x: 20, color: '#6b7280' }}
            whileInView={{ opacity: 1, y: 0, x: 0, color: '#DC2626' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="mt-8 text-lg italic tracking-[0.14em]"
          >
            Performance is not achieved. It is refined.
          </motion.p>
        </div>
      </section>

      <section className="grain relative overflow-hidden border-t border-white/5 bg-[#090909] px-6 py-24 md:px-10 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <RedLine className="max-w-[14rem]" />
            <motion.div variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mt-6">
              <SectionEyebrow>Our Partners</SectionEyebrow>
            </motion.div>
            <AnimatedHeadline
              text="Powered by Partnership"
              className="mt-8 max-w-[58rem] font-display text-[clamp(2.35rem,5.4vw,4.75rem)] uppercase leading-[0.92] tracking-[0.04em] text-white"
            />
            <MotionWrapper variants={fadeUp} className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              <p>
                FRC KAIZEN is driven by performance and powered by partnership. We work with organizations that value
                engineering, innovation, and visibility. From car livery to digital platforms, we ensure strong brand presence
                at national and international Formula Student competitions.
              </p>
            </MotionWrapper>

            <motion.div initial="rest" whileHover="hover" whileTap={{ scale: 0.97 }} className="mt-10 inline-block">
              <motion.div whileHover={{ boxShadow: '0 0 24px rgba(220,38,38,0.5)', x: 4 }}>
                <Link
                  href="/sponsorship"
                  className="inline-flex h-12 items-center border border-red-600 px-6 font-display text-sm uppercase tracking-[0.2em] text-red-500 transition-colors hover:bg-red-600 hover:text-white"
                >
                  Become a Partner
                  <motion.span variants={{ rest: { x: 0 }, hover: { x: 6 } }} className="ml-2 inline-flex">
                    <ArrowRight className="size-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                variants={cardEntry}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.07 + (index % 2 === 0 ? 0.3 : 0) }}
                whileHover={{
                  borderColor: 'rgba(220,38,38,0.6)',
                  backgroundColor: 'rgba(220,38,38,0.05)',
                  scale: 1.04,
                }}
                className="group relative flex min-h-28 flex-col justify-between border border-white/10 bg-white/[0.04] p-4 sm:min-h-32"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.22em] text-red-500/70">
                  P-0{index + 1}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <span className="font-display text-[0.95rem] uppercase leading-none tracking-[0.04em] text-zinc-200 whitespace-nowrap xl:text-[0.82rem] 2xl:text-[0.95rem]">
                    {partner}
                  </span>
                  <span className="font-display text-xl leading-none text-white/15 transition-colors group-hover:text-red-500/40">
                    /
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative border-t border-white/5 px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={clipReveal}>
              <SectionEyebrow>Establish Contact</SectionEyebrow>
            </motion.div>
            <AnimatedHeadline
              text="Start a conversation with the team."
              className="mt-8 max-w-[42rem] font-display text-[clamp(2.25rem,4.8vw,4.4rem)] uppercase leading-[0.96] tracking-[0.04em] text-white"
            />
            <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300 md:text-lg">
              Sponsorships, technical collaboration, media, and student outreach all start here. If the work is serious, we
              want to hear it.
            </motion.p>
            <motion.div variants={staggerContainer} className="mt-10 space-y-5">
              {contactItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.a
                    key={item.label}
                    variants={fadeRight}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-start gap-4 border-b border-white/10 pb-5"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 }}
                      className="mt-1 flex size-9 items-center justify-center rounded-full bg-red-600/10 text-red-500"
                    >
                      <Icon className="size-4" />
                    </motion.span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.24em] text-zinc-500">{item.label}</span>
                      <span className="mt-1 block text-lg text-white transition-colors group-hover:text-red-400">{item.value}</span>
                    </span>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
