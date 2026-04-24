import type { RefObject } from 'react'

type SVGConnectorProps = {
  pathRef: RefObject<SVGPathElement | null>
}

export function SVGConnector({ pathRef }: SVGConnectorProps) {
  const pathDefinition = `
    M 260,430
    C 320,430 340,560 480,560
    C 620,560 600,440 760,540
    C 860,600 880,560 960,560
    C 1040,560 1100,480 1220,480
    C 1300,480 1360,500 1440,500
  `

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id="systems-path-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={pathDefinition}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1"
        strokeDasharray="6 6"
        filter="url(#systems-path-glow)"
      />

      <path
        ref={pathRef}
        id="systems-path-animated"
        d={pathDefinition}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeDasharray="2000"
        strokeDashoffset="2000"
      />
    </svg>
  )
}
