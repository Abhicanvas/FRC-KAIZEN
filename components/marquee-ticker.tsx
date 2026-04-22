'use client'

interface MarqueeTickerProps {
  items: string[]
  className?: string
}

export function MarqueeTicker({ items, className }: MarqueeTickerProps) {
  return (
    <div className={`overflow-hidden border-y border-red-600/25 bg-black ${className ?? ''}`}>
      <div className="marquee-track flex min-w-max items-center gap-5 py-5 font-display text-4xl uppercase tracking-[0.14em] text-red-600 md:text-6xl">
        {Array.from({ length: 3 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center gap-5 pr-5">
            {items.map((item, index) => (
              <span key={`${loopIndex}-${item}-${index}`} className="flex items-center gap-5">
                <span>{item}</span>
                <span className="separator-pulse text-red-700">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
