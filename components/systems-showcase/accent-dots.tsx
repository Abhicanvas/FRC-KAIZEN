import { motion } from 'framer-motion'

const accentDotPositions = [
  { top: '8vh', left: '6vw', delay: 0 },
  { top: '12vh', left: '8vw', delay: 0.3 },
  { top: '75vh', left: '57vw', delay: 0.6 },
  { top: '80vh', left: '88vw', delay: 0.9 },
]

export function AccentDots() {
  return (
    <>
      {accentDotPositions.map((dot, index) => (
        <motion.div
          key={`${dot.left}-${dot.top}-${index}`}
          className="accent-dot pointer-events-none absolute z-10 h-1.5 w-1.5 bg-red-600"
          style={{ top: dot.top, left: dot.left }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}
