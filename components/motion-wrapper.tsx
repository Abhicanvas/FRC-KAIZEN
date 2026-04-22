'use client'

import { motion, type Variants, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type MotionTag = 'article' | 'div' | 'footer' | 'h2' | 'nav' | 'p' | 'section' | 'span'

const componentMap = {
  article: motion.article,
  div: motion.div,
  footer: motion.footer,
  h2: motion.h2,
  nav: motion.nav,
  p: motion.p,
  section: motion.section,
  span: motion.span,
}

interface MotionWrapperProps {
  as?: MotionTag
  children: ReactNode
  className?: string
  variants: Variants
  amount?: number
}

export function MotionWrapper({
  as = 'div',
  children,
  className,
  variants,
  amount = 0.2,
}: MotionWrapperProps) {
  const shouldReduce = useReducedMotion()
  const safeVariants = shouldReduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : variants
  const Component = componentMap[as]

  return (
    <Component
      className={className}
      variants={safeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px', amount }}
    >
      {children}
    </Component>
  )
}
