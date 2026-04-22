'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { lineDraw } from '@/lib/variants'

export function RedLine({ className }: { className?: string }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className={`h-px w-full bg-red-600 ${className ?? ''}`}
      variants={shouldReduce ? undefined : lineDraw}
      initial={shouldReduce ? { opacity: 0 } : 'hidden'}
      whileInView={shouldReduce ? { opacity: 1, transition: { duration: 0.2 } } : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
    />
  )
}
