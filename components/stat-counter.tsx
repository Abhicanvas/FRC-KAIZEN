'use client'

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function StatCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    if (!inView) {
      return
    }

    if (shouldReduce) {
      count.set(value)
      return
    }

    const controls = animate(count, value, { duration: 2, ease: 'easeOut' })
    return () => controls.stop()
  }, [count, inView, shouldReduce, value])

  return (
    <span ref={ref} className="font-display text-7xl tabular-nums text-white">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
