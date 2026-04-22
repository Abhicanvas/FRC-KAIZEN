'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { staggerContainer, wordReveal } from '@/lib/variants'

interface AnimatedHeadlineProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedHeadline({ text, className, delay = 0 }: AnimatedHeadlineProps) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')
  const headlineWordVariants = shouldReduce
    ? {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.22, ease: 'easeOut' },
        },
      }
    : wordReveal
  const safeVariants = shouldReduce
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2, staggerChildren: 0.03, delayChildren: delay },
        },
      }
    : {
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            ...staggerContainer.visible?.transition,
            delayChildren: delay,
          },
        },
      }

  return (
    <motion.h2
      className={className}
      variants={safeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{ perspective: 800 }}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={headlineWordVariants} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  )
}
