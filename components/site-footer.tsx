import Link from 'next/link'
import { Instagram, Linkedin, Mail } from 'lucide-react'

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
    <footer className="mt-24 bg-[#060606] text-white">
      <div className="h-px w-full bg-red-600" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:items-center">
        <div>
          <p className="font-brand text-5xl uppercase tracking-wide">FRC KAIZEN</p>
          <p className="mt-1 font-body text-sm text-zinc-500">© 2025</p>
        </div>

        <nav className="flex flex-wrap items-center justify-start gap-4 font-body text-sm uppercase tracking-[0.2em] text-zinc-400 md:justify-center">
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
              <Link
                key={item.label}
                href={item.href}
                className="text-zinc-400 transition-colors hover:text-red-500"
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="size-5" />
              </Link>
            )
          })}
        </div>
      </div>
      <p className="border-t border-white/5 py-4 text-center font-display text-lg tracking-[0.25em] text-red-500">
        THE PADDOCK IS ALIVE. 🏁
      </p>
    </footer>
  )
}
