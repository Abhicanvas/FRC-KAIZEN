'use client'

import { motion } from 'framer-motion'

import { ValueCard } from '@/components/sections/ValueCard'

const cards = [
  { id: '01', title: 'Engineering Precision', subtitle: 'Every system designed with intent' },
  { id: '02', title: 'Performance First', subtitle: 'Data-driven decisions, always' },
  { id: '03', title: 'Iteration & Growth', subtitle: 'Kaizen - constant refinement' },
  { id: '04', title: 'Racing Spirit', subtitle: 'Built for the grid, ready to compete' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export function RightColumn() {
  return (
    <div className="lg:pl-14">
      <div className="mb-6 mt-10 text-right font-display text-xs tracking-[0.3em] text-red-600 uppercase lg:mt-0">
        WHAT WE STAND FOR
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-0"
      >
        {cards.map((card) => (
          <ValueCard key={card.id} {...card} />
        ))}
      </motion.div>
    </div>
  )
}
