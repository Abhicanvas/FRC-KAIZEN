'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

type UseSystemsAnimationArgs = {
  showcaseRef: RefObject<HTMLElement | null>
  pathRef: RefObject<SVGPathElement | null>
  travelerRef: RefObject<HTMLDivElement | null>
  isMobile: boolean
}

export function useSystemsAnimation({ showcaseRef, pathRef, travelerRef, isMobile }: UseSystemsAnimationArgs) {
  useEffect(() => {
    const showcase = showcaseRef.current

    if (!showcase) {
      return
    }

    const context = gsap.context(() => {
      if (isMobile) {
        gsap.set(travelerRef.current, { autoAlpha: 0 })

        gsap.utils.toArray<HTMLElement>('.system-mobile-item').forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              once: true,
            },
          })
        })

        return
      }

      const animatedPath = pathRef.current

      if (animatedPath) {
        const pathLength = animatedPath.getTotalLength()
        gsap.set(animatedPath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })
      }

      gsap.set(travelerRef.current, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      timeline
        .from(
          '.card-powertrain-primary',
          { x: -120, opacity: 0, duration: 1, ease: 'power3.out' },
          0,
        )
        .from(
          '.card-powertrain-secondary',
          { x: -60, y: 40, opacity: 0, duration: 1, ease: 'power2.out' },
          0.15,
        )
        .from('.text-powertrain', { x: -40, opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.3)
        .from('.dot-1', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, 0.5)
        .from(
          '.card-aerodynamics-primary',
          { y: -100, opacity: 0, duration: 1, ease: 'power3.out' },
          1,
        )
        .from(
          '.card-aerodynamics-secondary',
          { y: -50, x: 30, opacity: 0, duration: 0.9, ease: 'power2.out' },
          1.15,
        )
        .from('.text-aerodynamics', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, 1.3)
        .from('.dot-2', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, 1.5)
        .from(
          '.card-electronics-primary',
          { x: 120, opacity: 0, duration: 1, ease: 'power3.out' },
          2,
        )
        .from(
          '.card-electronics-secondary',
          { x: 60, y: -60, opacity: 0, duration: 0.9, ease: 'power2.out' },
          2.15,
        )
        .from('.text-electronics', { x: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, 2.3)
        .from('.dot-3', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, 2.5)
        .from(
          '.accent-dot',
          { scale: 0, opacity: 0, stagger: 0.1, duration: 0.3, ease: 'back.out(3)' },
          0.2,
        )

      if (animatedPath) {
        const pathLength = animatedPath.getTotalLength()

        timeline.to(animatedPath, { strokeDashoffset: pathLength * 0.5, duration: 1.2, ease: 'none' }, 0.4)
        timeline.to(animatedPath, { strokeDashoffset: 0, duration: 1.2, ease: 'none' }, 1.2)
      }

      if (animatedPath && travelerRef.current) {
        gsap.to(travelerRef.current, {
          motionPath: {
            path: animatedPath,
            align: animatedPath,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
          scrollTrigger: {
            trigger: showcase,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
      }
    }, showcase)

    return () => context.revert()
  }, [isMobile, pathRef, showcaseRef, travelerRef])
}
