'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Who We Are', 'Our Car', 'Our Team', 'Our Story'] as const
type Tab = (typeof tabs)[number]

const tabContentVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
}

export function TabNav() {
  const [activeTab, setActiveTab] = useState<Tab>('Who We Are')

  return (
    <div className="mt-10">
      <div className="border-b border-white/10">
        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative min-h-11 whitespace-nowrap pb-3 font-body text-sm uppercase tracking-wider transition-colors duration-200 sm:min-h-0 ${
                activeTab === tab ? 'text-white' : 'text-[#6b7280] hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-underline" className="absolute right-0 bottom-0 left-0 h-[2px] bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-6"
        >
          {activeTab === 'Who We Are' && (
            <div className="space-y-3">
              <div className="flex aspect-video w-full items-center justify-center rounded-none border border-white/10 bg-[#1a1a1a]">
                <span className="font-body text-xs uppercase tracking-widest text-[#6b7280]">Team Image</span>
              </div>
              <p className="font-body text-sm leading-relaxed text-[#9ca3af]">
                Team photograph placeholder for the complete FRC KAIZEN roster.
              </p>
            </div>
          )}

          {activeTab === 'Our Car' && (
            <div className="space-y-3">
              <div className="flex aspect-video w-full items-center justify-center rounded-none border border-white/10 bg-[#1a1a1a]">
                <span className="font-body text-xs uppercase tracking-widest text-[#6b7280]">Car Render</span>
              </div>
              <p className="font-body text-sm leading-relaxed text-[#9ca3af]">
                Technical car render placeholder for the latest KAIZEN platform.
              </p>
            </div>
          )}

          {activeTab === 'Our Team' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {['Aero', 'Powertrain', 'Electronics', 'Operations'].map((department) => (
                  <div
                    key={department}
                    className="flex h-20 items-center justify-center rounded-none border border-white/10 bg-[#1a1a1a] font-body text-xs tracking-widest text-[#6b7280] uppercase"
                  >
                    {department}
                  </div>
                ))}
              </div>
              <p className="font-body text-sm leading-relaxed text-[#9ca3af]">
                Department breakdown placeholder with key leads and responsibilities.
              </p>
            </div>
          )}

          {activeTab === 'Our Story' && (
            <div className="rounded-none border border-white/10 bg-[#1a1a1a] p-5">
              <p className="font-body text-sm leading-relaxed text-[#9ca3af]">
                Founded to compete at the highest student motorsport level, FRC KAIZEN continues to evolve through
                constant iteration, data-backed decisions, and disciplined execution.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
