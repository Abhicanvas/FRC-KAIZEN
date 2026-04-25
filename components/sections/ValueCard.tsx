'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface ValueCardProps {
  id: string
  title: string
  subtitle: string
}

const cardVariants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function ValueCard({ id, title, subtitle }: ValueCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flex h-[88px] cursor-default items-center justify-between border border-l-2 bg-[#111111] px-6 transition-all duration-300 ease-out ${
        hovered ? 'translate-x-1 border-red-600' : 'border-[#1f1f1f] border-l-red-600'
      }`}
    >
      <div className="flex items-center gap-5">
        <span
          className={`font-display text-3xl leading-none text-red-600 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-30'}`}
        >
          {id}
        </span>
        <div className="h-8 w-px bg-white/10" />
        <div>
          <p className="font-display text-sm leading-tight tracking-wide text-white uppercase">{title}</p>
          <p className="mt-0.5 font-body text-xs text-[#6b7280]">{subtitle}</p>
        </div>
      </div>

      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.2 }}
        className="text-red-600"
      >
        <ChevronRight size={16} />
      </motion.span>
    </motion.div>
  )
}
