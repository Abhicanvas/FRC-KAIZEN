'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function RedCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })
  const shouldReduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (shouldReduce) {
      return
    }

    const mediaQuery = window.matchMedia('(pointer: fine)')
    const updateMode = () => setEnabled(mediaQuery.matches)
    const move = (event: MouseEvent) => {
      x.set(event.clientX - 6)
      y.set(event.clientY - 6)
    }

    updateMode()
    mediaQuery.addEventListener('change', updateMode)
    window.addEventListener('mousemove', move)

    return () => {
      mediaQuery.removeEventListener('change', updateMode)
      window.removeEventListener('mousemove', move)
    }
  }, [shouldReduce, x, y])

  if (!enabled || shouldReduce) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-red-600 mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  )
}
