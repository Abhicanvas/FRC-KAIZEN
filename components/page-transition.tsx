'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'

import { pageCurtain } from '@/lib/variants'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-dvh">{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="min-h-dvh"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] origin-top bg-black"
          variants={shouldReduce ? undefined : pageCurtain}
          initial={shouldReduce ? { opacity: 1 } : 'initial'}
          animate={shouldReduce ? { opacity: 0, transition: { duration: 0.2 } } : 'animate'}
          exit={shouldReduce ? { opacity: 1, transition: { duration: 0.2 } } : 'exit'}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
