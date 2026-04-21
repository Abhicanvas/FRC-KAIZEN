'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function RedCursorDot() {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 460, damping: 42, mass: 0.25 })
  const y = useSpring(pointerY, { stiffness: 460, damping: 42, mass: 0.25 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')

    const updateMode = () => {
      setEnabled(mediaQuery.matches)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - 6)
      pointerY.set(event.clientY - 6)
    }

    updateMode()
    mediaQuery.addEventListener('change', updateMode)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      mediaQuery.removeEventListener('change', updateMode)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [pointerX, pointerY])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] h-3 w-3 rounded-full bg-red-500 mix-blend-difference"
      style={{ x, y }}
    />
  )
}
