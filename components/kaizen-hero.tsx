"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface KaizenHeroProps {
  videoSrc?: string
}

// Team Logo Component
function TeamLogo() {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="relative">
        <svg
          width="48"
          height="56"
          viewBox="0 0 48 56"
          fill="none"
          className="drop-shadow-[0_0_10px_rgba(232,0,13,0.3)]"
        >
          {/* Shield shape */}
          <path
            d="M24 0L48 12V32C48 44 36 52 24 56C12 52 0 44 0 32V12L24 0Z"
            fill="#0A0A0A"
            stroke="#E8000D"
            strokeWidth="2"
          />
          {/* Inner diamond */}
          <path
            d="M24 8L40 18V30C40 38 32 44 24 48C16 44 8 38 8 30V18L24 8Z"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* K letter stylized */}
          <path
            d="M18 20V36M18 28L30 20M18 28L30 36"
            stroke="#E8000D"
            strokeWidth="3"
            strokeLinecap="square"
          />
        </svg>
      </div>
      <span className="font-brand text-lg tracking-wider text-white">
        KAIZEN
      </span>
      <span className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase">
        Formula Student · Est. 2024
      </span>
    </div>
  )
}

// Full-screen background video
function BackgroundVideo({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || video.currentTime < 5) {
      return
    }

    video.currentTime = 0
    void video.play()
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          const video = videoRef.current

          if (video) {
            video.currentTime = 0
          }
        }}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90" />
      {/* Extra vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A0A0A]/50 to-transparent" />
      {/* Red tint overlay */}
      <div className="absolute inset-0 bg-[#E8000D]/[0.03] mix-blend-overlay" />
    </div>
  )
}

// Headline with clip-path animation
function AnimatedHeadline() {
  const lines = [
    { text: "BUILT", color: "text-white" },
    { text: "TO", color: "text-[#E8000D]" },
    { text: "DOMINATE", color: "text-white" },
  ]

  return (
    <div className="flex flex-col">
      {lines.map((line, index) => (
        <motion.div
          key={line.text}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
          <span
            className={`font-display text-6xl md:text-7xl lg:text-[88px] leading-[0.85] ${line.color} block`}
          >
            {line.text}
          </span>
        </motion.div>
      ))}
    </div>
  )
}



// Social icons
function SocialIcons() {
  const icons = [
    {
      name: "Instagram",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "LinkedIn",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "YouTube",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ]

  return (
    <div className="flex items-center gap-4">
      {icons.map((icon) => (
        <a
          key={icon.name}
          href="#"
          className="text-white/40 hover:text-[#E8000D] transition-colors duration-300"
          aria-label={icon.name}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d={icon.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}

// Telemetry bar
function TelemetryBar() {
  const [telemetry, setTelemetry] = useState({
    rpm: 8500,
    speed: 180,
    gForce: 2.1,
    throttle: 75,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        rpm: Math.floor(Math.random() * (11000 - 7000) + 7000),
        speed: Math.floor(Math.random() * (240 - 160) + 160),
        gForce: parseFloat((Math.random() * (4.5 - 1.0) + 1.0).toFixed(1)),
        throttle: Math.floor(Math.random() * (100 - 50) + 50),
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const items = [
    { label: "RPM", value: telemetry.rpm.toLocaleString() },
    { label: "SPEED", value: `${telemetry.speed} km/h` },
    { label: "G-FORCE", value: `${telemetry.gForce}G` },
    { label: "THROTTLE", value: `${telemetry.throttle}%` },
    { label: "TEAM", value: "KAIZEN", static: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="absolute bottom-0 left-0 right-0 h-11 bg-black/90 border-t border-[rgba(232,0,13,0.25)] z-20"
    >
      <div className="h-full flex items-center justify-between overflow-x-auto">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex-1 flex flex-col items-center justify-center px-4 h-full ${
              index < items.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <span className="font-body text-[9px] text-white/35 tracking-wider">
              {item.label}
            </span>
            <span
              className={`font-body text-[13px] font-bold ${
                item.static ? "text-white" : "text-[#E8000D]"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}



// Blinking live indicator
function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8000D] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8000D]" />
      </span>
      <span className="font-body text-[10px] text-white/40 tracking-[0.2em]">
        LIVE · SEASON 2025
      </span>
    </div>
  )
}

// Main Hero Component
export default function KaizenHero({ videoSrc = "/kaizen-car.mp4" }: KaizenHeroProps) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes gridDrift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
        @keyframes scanLine {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>

      {/* Background Video */}
      <BackgroundVideo videoSrc={videoSrc} />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,0,13,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,0,13,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "gridDrift 10s linear infinite",
        }}
      />

      {/* Large "14" watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[1]">
        <span className="font-display text-[300px] md:text-[450px] text-white/[0.02] select-none">
          14
        </span>
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-[2]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 49%, rgba(232,0,13,0.06) 50%, transparent 51%, transparent 100%)",
          backgroundSize: "100% 200%",
          animation: "scanLine 6s linear infinite",
        }}
      />

      {/* Left red stripe accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8000D] z-[3]" />

      {/* Main content grid */}
      <div className="relative z-10 h-full pb-11">
        {/* Desktop layout - Two columns since video is now background */}
        <div className="hidden lg:grid lg:grid-cols-2 h-full items-center px-12 xl:px-20 py-10 xl:py-12">
          {/* Left Column */}
          <div className="flex flex-col justify-center gap-10">
            <TeamLogo />
            <AnimatedHeadline />
            <div className="flex flex-col gap-4">
              <p className="font-body text-[13px] text-white/50 uppercase tracking-[0.1em]">
                Engineering speed. Racing excellence.
              </p>
              <p className="font-body text-sm text-white/60 leading-relaxed max-w-[380px]">
                A student-built, competition-grade Formula car engineered for
                precision, speed, and race-day glory.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-[#E8000D] text-white font-body font-bold text-xs tracking-[0.15em] uppercase py-3 px-6 hover:bg-[#ff1a1a] transition-colors">
                  Join The Team
                </button>
                <button className="bg-transparent border border-white/50 text-white font-body font-bold text-xs tracking-[0.15em] uppercase py-3 px-6 hover:bg-white hover:text-[#0A0A0A] transition-colors">
                  {"Our Story →"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center items-end gap-8">
            <div className="flex flex-col gap-6 items-end">
              <LiveIndicator />
              <div className="flex gap-8">
                {[
                  { value: "#14", label: "Car Number" },
                  { value: "4.2 G", label: "Peak G-Force" },
                  { value: "220+", label: "Top Speed km/h" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-[1px] h-10 bg-[#E8000D]" />
                    <div className="flex flex-col">
                      <span className="font-display text-3xl lg:text-4xl text-white">
                        {stat.value}
                      </span>
                      <span className="font-body text-[11px] text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 items-end">
              <SocialIcons />
              <div className="flex flex-col gap-2 items-end">
                <span className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase">
                  Powered By
                </span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-[60px] h-[20px] border border-dashed border-white/30 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex h-full flex-col items-center justify-center gap-6 px-6 py-10 sm:py-12">
          {/* Logo + Season */}
          <div className="flex flex-col items-center text-center">
            <TeamLogo />
          </div>

          {/* Headline */}
          <div className="text-center">
            <AnimatedHeadline />
          </div>

          {/* Stats row - horizontal on mobile */}
          <div className="flex items-center justify-center gap-6 w-full">
            {[
              { value: "#14", label: "Car" },
              { value: "4.2G", label: "G-Force" },
              { value: "220+", label: "km/h" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="font-display text-2xl text-white">
                  {stat.value}
                </span>
                <span className="font-body text-[10px] text-white/40 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <button className="w-full bg-[#E8000D] text-white font-body font-bold text-xs tracking-[0.15em] uppercase py-3 px-6 hover:bg-[#ff1a1a] transition-colors">
              Join The Team
            </button>
            <button className="w-full bg-transparent border border-white/50 text-white font-body font-bold text-xs tracking-[0.15em] uppercase py-3 px-6 hover:bg-white hover:text-[#0A0A0A] transition-colors">
              {"Our Story →"}
            </button>
          </div>

          {/* Social icons */}
          <SocialIcons />
        </div>
      </div>

      {/* Telemetry bar */}
      <TelemetryBar />
    </section>
  )
}
