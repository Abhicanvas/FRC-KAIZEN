'use client'

import { motion } from 'framer-motion'

import { TabNav } from '@/components/sections/TabNav'

const lineVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const headlineLines = ['Built for', 'the Grid.', 'Engineered to Win.']

export function LeftColumn() {
  return (
    <div className="pb-14 lg:pr-14 lg:pb-0">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-8 border-l-2 border-red-600 pl-3 font-display text-xs tracking-[0.3em] text-red-600 uppercase"
      >
        ABOUT US
      </motion.div>

      <div className="space-y-1">
        {headlineLines.map((line, index) => (
          <motion.h2
            key={line}
            custom={index}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="block font-display text-4xl font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {line}
          </motion.h2>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 max-w-md font-body text-[0.98rem] leading-relaxed text-[#9ca3af] sm:text-base"
      >
        FRC KAIZEN is a student-led Formula Student team from Kerala, India - driven by performance, precision, and a
        relentless pursuit of improvement. Over forty members. One car. Infinite iterations.
      </motion.p>

      <TabNav />
    </div>
  )
}
