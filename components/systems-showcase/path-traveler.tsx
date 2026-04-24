import type { RefObject } from 'react'

type PathTravelerProps = {
  travelerRef: RefObject<HTMLDivElement | null>
}

export function PathTraveler({ travelerRef }: PathTravelerProps) {
  return (
    <div
      ref={travelerRef}
      className="path-traveler pointer-events-none absolute z-30 h-3 w-3 rounded-full bg-red-600 opacity-0 shadow-[0_0_0_4px_rgba(220,38,38,0.2),0_0_16px_rgba(220,38,38,0.6)]"
    />
  )
}
