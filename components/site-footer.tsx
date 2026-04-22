'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail } from 'lucide-react'

import { letterReveal } from '@/lib/variants'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Sponsorship', href: '/sponsorship' },
  { label: 'Contact', href: '/#contact' },
]

const socialItems = [
  { label: 'Email', href: 'mailto:teamfrckaizen@gmail.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#060606] text-white">
      <div className="h-px w-full bg-red-600" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center md:px-10">
        <div>
          <p className="font-brand text-4xl uppercase tracking-[0.12em] md:text-5xl">FRC KAIZEN</p>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-zinc-500">© 2025</p>
        </div>

        <nav className="flex flex-wrap items-center justify-start gap-4 text-sm uppercase tracking-[0.22em] text-zinc-400 md:justify-center">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-red-500">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-start gap-4 md:justify-end">
          {socialItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-zinc-400 transition-colors hover:text-red-500"
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, color: '#DC2626', rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Icon className="size-5" />
              </motion.a>
            )
          })}
        </div>
      </div>
      <motion.p
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        initial="hidden"
        animate="visible"
        className="footer-pulse border-t border-white/5 py-4 text-center font-display text-lg tracking-[0.25em] text-red-500"
      >
        {Array.from('THE PADDOCK IS ALIVE. 🏁').map((char, index) => (
          <motion.span key={`${char}-${index}`} variants={letterReveal} className="inline-block whitespace-pre">
            {char}
          </motion.span>
        ))}
      </motion.p>
    </footer>
  )
}
