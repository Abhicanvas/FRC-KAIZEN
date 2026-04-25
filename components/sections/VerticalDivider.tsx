'use client'

import { motion } from 'framer-motion'

export function VerticalDivider() {
  return (
    <div className="relative hidden lg:flex lg:flex-col lg:items-center" aria-hidden>
      <div className="w-px flex-1 bg-[#1f1f1f]" />
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-red-600"
      />
    </div>
  )
}
