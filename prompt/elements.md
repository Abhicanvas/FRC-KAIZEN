# FRC KAIZEN — Systems Showcase Section
## Design & Animation Prompt
### Reference Style: Scattered Card Gallery with SVG Path Connector + Scroll-Driven Reveal

> **Sections covered:** Powertrain · Aerodynamics · Electronics
> **Animation library:** GSAP (ScrollTrigger + MotionPath) + Framer Motion
> **Style:** Dark luxury automotive editorial — deep blacks, scattered asymmetric image cards,
> hand-drawn SVG connector path, floating dot markers, text overlays on cards

---

## 0. WHAT THIS SECTION IS

A full-page horizontal/vertical hybrid **"systems journey"** — the user scrolls through the car's
three primary engineering systems. Each system is represented by:

1. A **large dark image card** (car component photo — real or placeholder)
2. A **curved SVG connector line** that flows between cards like a circuit trace or racing line
3. **Small glowing dot markers** at connection points (like waypoints on a race map)
4. A **text block** beside or below each card — system number, system name, headline, description
5. A **subtle category label** in muted uppercase text

The overall composition feels like an **engineer's desk scattered with reference photos** connected
by a hand-drawn line — elegant chaos, intentional disorder.

---

## 1. DESIGN LANGUAGE

### Color Palette (inherit from KAIZEN system)

```css
:root {
  --bg:           #080808;      /* Near-pure black */
  --surface:      #0f0f0f;      /* Card backgrounds */
  --surface-mid:  #141414;      /* Slightly lifted elements */
  --red:          #DC2626;      /* Primary accent */
  --red-glow:     rgba(220, 38, 38, 0.3);
  --dot-glow:     rgba(220, 38, 38, 0.6);
  --white:        #FFFFFF;
  --white-dim:    rgba(255, 255, 255, 0.85);
  --muted:        rgba(255, 255, 255, 0.4);
  --path-stroke:  rgba(255, 255, 255, 0.55); /* SVG connector line */
  --dot-fill:     #DC2626;      /* Connector waypoint dots */
  --card-border:  rgba(255, 255, 255, 0.06);
}
```

### Typography

```css
/* System number (01, 02, 03) */
font-family: 'Bebas Neue', sans-serif;
font-size: clamp(0.7rem, 1.2vw, 0.9rem);
letter-spacing: 0.2em;
color: var(--muted);

/* System category label (Powertrain, Aerodynamics, Electronics) */
font-family: 'DM Sans', sans-serif;
font-size: clamp(0.65rem, 1vw, 0.8rem);
font-weight: 400;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--muted);

/* System headline */
font-family: 'Bebas Neue', sans-serif;
font-size: clamp(1.6rem, 3vw, 2.6rem);
color: var(--white);
letter-spacing: 0.03em;
line-height: 1.05;

/* Body description */
font-family: 'DM Sans', sans-serif;
font-size: clamp(0.78rem, 1.1vw, 0.9rem);
font-weight: 300;
line-height: 1.7;
color: rgba(255, 255, 255, 0.5);
max-width: 22ch;
```

### Card Design

Each image card is a **dark rectangle with no border radius** (sharp corners — `border-radius: 0`):

```css
.system-card {
  position: absolute;           /* Scattered across the canvas */
  background: var(--surface);
  border: 1px solid var(--card-border);
  overflow: hidden;
  box-shadow:
    0 4px 40px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.04);
  border-radius: 0;             /* HARD EDGES — no softness */
}

.system-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75) contrast(1.1);   /* Dark, moody, desaturated */
  mix-blend-mode: normal;
  transition: filter 0.6s ease;
}

.system-card:hover img {
  filter: brightness(0.9) contrast(1.1);
}

/* Red hairline top border on active/hovered card */
.system-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  z-index: 2;
}
.system-card:hover::before {
  transform: scaleX(1);
}
```

### Card Sizes (asymmetric, like the reference image)

```
Powertrain    — PRIMARY card:   420px × 320px   (large, dominant, leftish)
               SECONDARY card:  280px × 200px   (smaller, overlapping, lower-right offset)

Aerodynamics  — PRIMARY card:   380px × 300px
               SECONDARY card:  240px × 180px

Electronics   — PRIMARY card:   400px × 310px
               SECONDARY card:  260px × 195px
```

Cards from adjacent sections **partially overlap** each other — this is intentional.

### Waypoint Dots

```css
.waypoint-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dot-fill);
  position: absolute;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2), 0 0 12px rgba(220, 38, 38, 0.4);
  /* Placed at SVG path anchor points */
}

/* Large decorative corner dots (like the yellow squares in reference — but red for KAIZEN) */
.accent-dot {
  width: 6px;
  height: 6px;
  background: var(--red);
  position: absolute;
  opacity: 0.7;
}
```

---

## 2. LAYOUT STRUCTURE

### Canvas Setup

```tsx
// This section is a tall scroll-pinned canvas
// Height: 400vh (pin for 4 viewport heights of scroll)
// Width: 100vw

<section
  id="systems-showcase"
  className="relative w-full"
  style={{ height: "400vh" }}
>
  {/* Sticky inner canvas — stays fixed while user scrolls */}
  <div
    className="sticky top-0 h-screen w-full overflow-hidden"
    style={{ background: "var(--bg)" }}
  >
    {/* SVG connector path — behind all cards */}
    <SVGConnector />

    {/* Three system panels — positioned absolutely, revealed by scroll */}
    <SystemCard system="powertrain"    position="left"   index={1} />
    <SystemCard system="aerodynamics"  position="center" index={2} />
    <SystemCard system="electronics"   position="right"  index={3} />

    {/* Scattered accent dots */}
    <AccentDots />

    {/* Section label — top left, always visible */}
    <SectionLabel />
  </div>
</section>
```

### Absolute Positions of Each System (desktop, 1440px reference)

```
POWERTRAIN
  Primary card:    left: 2vw,   top: 22vh,  w: 420px, h: 320px
  Secondary card:  left: 14vw,  top: 52vh,  w: 280px, h: 200px
  Text block:      left: 2vw,   top: 58vh
  Waypoint dot 1:  left: 20vw,  top: 48vh   (start of curve to Aero)

AERODYNAMICS
  Primary card:    left: 30vw,  top: 8vh,   w: 380px, h: 280px
  Secondary card:  left: 36vw,  top: 44vh,  w: 240px, h: 180px
  Text block:      left: 30vw,  top: 66vh
  Waypoint dot 2:  left: 58vw,  top: 62vh   (end of curve from Powertrain, start to Electronics)

ELECTRONICS
  Primary card:    left: 63vw,  top: 16vh,  w: 400px, h: 310px
  Secondary card:  left: 76vw,  top: 2vh,   w: 260px, h: 190px   (bleeds off top edge)
  Text block:      left: 63vw,  top: 60vh
  Waypoint dot 3:  left: 88vw,  top: 50vh
```

---

## 3. SVG CONNECTOR PATH

The **most important design element** — a single continuous curved SVG path
that threads through all three systems like a racing line drawn by hand.

```tsx
// components/systems-svg-path.tsx
export function SVGConnector() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/*
        Path description:
        - Starts at left edge (Powertrain waypoint)
        - Sweeps down and curves toward center (Aerodynamics)
        - Then curves back up and right (Electronics)
        - Ends at right edge
        
        The path is an S-curve — like the racing line through a chicane.
        Use cubic bezier handles to create that hand-drawn organic feel.
      */}
      <path
        id="systems-path"
        d="
          M 260,430
          C 320,430 340,560 480,560
          C 620,560 600,440 760,540
          C 860,600 880,560 960,560
          C 1040,560 1100,480 1220,480
          C 1300,480 1360,500 1440,500
        "
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1"
        strokeDasharray="6 6"       /* Dashed — like a circuit trace */
        filter="url(#glow)"
      />

      {/* Solid portion that animates in (GSAP will animate stroke-dashoffset) */}
      <path
        id="systems-path-animated"
        d="
          M 260,430
          C 320,430 340,560 480,560
          C 620,560 600,440 760,540
          C 860,600 880,560 960,560
          C 1040,560 1100,480 1220,480
          C 1300,480 1360,500 1440,500
        "
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeDasharray="2000"
        strokeDashoffset="2000"     /* GSAP animates this to 0 on scroll */
      />
    </svg>
  );
}
```

---

## 4. SYSTEM CONTENT DATA

```ts
// lib/systems-data.ts

export const systems = [
  {
    id: "powertrain",
    index: "01",
    category: "Powertrain",
    headline: "Engine & Drivetrain",
    description:
      "High-output powertrain engineered for consistent delivery across all circuit conditions. Every component tuned for efficiency and peak torque response.",
    primaryImage: "/images/systems/powertrain-primary.jpg",   /* Engine bay / exhaust close-up */
    secondaryImage: "/images/systems/powertrain-secondary.jpg", /* Gearbox / chain detail */
  },
  {
    id: "aerodynamics",
    index: "02",
    category: "Aerodynamics",
    headline: "Downforce Architecture",
    description:
      "Computational fluid dynamics validated aero package. Front wing, undertray, and diffuser operating as a unified system to maximize grip at speed.",
    primaryImage: "/images/systems/aero-primary.jpg",         /* Front wing assembly */
    secondaryImage: "/images/systems/aero-secondary.jpg",    /* Diffuser / undertray detail */
  },
  {
    id: "electronics",
    index: "03",
    category: "Electronics",
    headline: "Control & Data Systems",
    description:
      "Integrated ECU, sensor array, and telemetry stack. Real-time data acquisition feeds iteration — every lap refines every parameter.",
    primaryImage: "/images/systems/electronics-primary.jpg",  /* PCB / wiring loom */
    secondaryImage: "/images/systems/electronics-secondary.jpg", /* Dashboard / sensor mount */
  },
];
```

---

## 5. GSAP ANIMATION — SCROLL-DRIVEN REVEAL

Install:
```bash
npm install gsap @gsap/react
# ScrollTrigger is included in GSAP core
```

### 5.1 Master Timeline Setup

```tsx
// hooks/useSystemsAnimation.ts
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function useSystemsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── PIN the sticky container
      ScrollTrigger.create({
        trigger: "#systems-showcase",
        start: "top top",
        end: "bottom bottom",
        pin: ".systems-sticky",
        pinSpacing: false,
      });

      // ── Master scroll progress (0 → 1 over 400vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#systems-showcase",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,           /* Smooth lag — feels physical */
        }
      });

      // ── PHASE 1 (scroll 0–33%): Powertrain enters
      tl
        .from(".card-powertrain-primary", {
          x: -120, opacity: 0, duration: 1, ease: "power3.out"
        }, 0)
        .from(".card-powertrain-secondary", {
          x: -60, y: 40, opacity: 0, duration: 1, ease: "power2.out"
        }, 0.15)
        .from(".text-powertrain", {
          x: -40, opacity: 0, duration: 0.8, ease: "power2.out"
        }, 0.3)
        .from(".dot-1", {
          scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)"
        }, 0.5);

      // ── PATH DRAW: Powertrain → Aerodynamics
      tl.to("#systems-path-animated", {
        strokeDashoffset: 1000,   /* Half the path */
        duration: 1.2,
        ease: "none"
      }, 0.4);

      // ── PHASE 2 (scroll 33–66%): Aerodynamics enters
      tl
        .from(".card-aero-primary", {
          y: -100, opacity: 0, duration: 1, ease: "power3.out"
        }, 1.0)
        .from(".card-aero-secondary", {
          y: -50, x: 30, opacity: 0, duration: 0.9, ease: "power2.out"
        }, 1.15)
        .from(".text-aero", {
          y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
        }, 1.3)
        .from(".dot-2", {
          scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)"
        }, 1.5);

      // ── PATH DRAW: Aerodynamics → Electronics
      tl.to("#systems-path-animated", {
        strokeDashoffset: 0,      /* Complete the path */
        duration: 1.2,
        ease: "none"
      }, 1.2);

      // ── PHASE 3 (scroll 66–100%): Electronics enters
      tl
        .from(".card-electronics-primary", {
          x: 120, opacity: 0, duration: 1, ease: "power3.out"
        }, 2.0)
        .from(".card-electronics-secondary", {
          x: 60, y: -60, opacity: 0, duration: 0.9, ease: "power2.out"
        }, 2.15)
        .from(".text-electronics", {
          x: 40, opacity: 0, duration: 0.8, ease: "power2.out"
        }, 2.3)
        .from(".dot-3", {
          scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)"
        }, 2.5);

      // ── ACCENT DOTS: scattered, staggered appearance
      tl.from(".accent-dot", {
        scale: 0, opacity: 0, stagger: 0.1, duration: 0.3, ease: "back.out(3)"
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
```

### 5.2 Dot Traveler — Red Dot Travels Along the Path

```tsx
// A red dot that rides the SVG path as the user scrolls
// Uses GSAP MotionPathPlugin

useEffect(() => {
  const traveler = document.querySelector(".path-traveler");

  gsap.to(traveler, {
    motionPath: {
      path: "#systems-path-animated",
      align: "#systems-path-animated",
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
    ease: "none",
    scrollTrigger: {
      trigger: "#systems-showcase",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  });
}, []);
```

```tsx
// The traveler element (absolute positioned)
<div
  className="path-traveler absolute w-3 h-3 rounded-full z-20 pointer-events-none"
  style={{
    background: "#DC2626",
    boxShadow: "0 0 0 4px rgba(220,38,38,0.2), 0 0 16px rgba(220,38,38,0.6)",
    top: 0, left: 0,   /* GSAP overrides these */
  }}
/>
```

---

## 6. FRAMER MOTION — CARD HOVER INTERACTIONS

While GSAP handles scroll choreography, Framer Motion handles hover states
on individual cards (richer spring physics).

```tsx
// components/system-card.tsx
"use client";
import { motion } from "framer-motion";

export function SystemCard({ system, className }: SystemCardProps) {
  return (
    <motion.div
      className={`system-card absolute ${className}`}
      whileHover={{
        scale: 1.025,
        zIndex: 20,
        boxShadow: "0 8px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(220,38,38,0.4)",
        transition: { type: "spring", stiffness: 280, damping: 22 }
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Red hairline top — Framer handles the hover reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-red-600 z-10"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />

      <img src={system.primaryImage} alt={system.headline} />

      {/* Hover overlay — subtle red vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(220,38,38,0.08) 100%)"
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
```

### Text Block Hover (reveals extra detail)

```tsx
<motion.div className={`text-${system.id} absolute`}>
  {/* Index + Category */}
  <p className="text-muted text-xs tracking-widest uppercase mb-1">
    {system.index}&nbsp;&nbsp;{system.category}
  </p>

  {/* Headline */}
  <h3 className="font-['Bebas_Neue'] text-white text-4xl leading-none mb-3">
    {system.headline}
  </h3>

  {/* Red hairline divider */}
  <motion.div
    className="h-px bg-red-600 mb-3"
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
  />

  {/* Description — hidden by default, reveals on hover of parent section */}
  <motion.p
    className="text-white/50 text-sm font-light leading-relaxed max-w-[22ch]"
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.6 }}
  >
    {system.description}
  </motion.p>
</motion.div>
```

---

## 7. SECONDARY CARD OVERLAP EFFECT

The secondary (smaller) card overlaps the primary — like a Polaroid photo
tossed on top. It has a very slight rotation.

```tsx
<motion.div
  className={`system-card card-${system.id}-secondary absolute`}
  style={{
    rotate: system.id === "powertrain" ? 1.5 : system.id === "aero" ? -1.2 : 0.8,
    zIndex: 5,
  }}
  whileHover={{
    rotate: 0,
    scale: 1.03,
    zIndex: 25,
    transition: { type: "spring", stiffness: 250, damping: 20 }
  }}
>
  <img src={system.secondaryImage} alt="" />
</motion.div>
```

---

## 8. ACCENT DOTS — SCATTERED DECORATION

Replicate the small colored square dots from the reference image (but use red, not yellow):

```tsx
// Scattered at: near top-left, between cards, near bottom-right
// Use CSS — no animation needed, just opacity pulse

const accentDotPositions = [
  { top: "8vh",  left: "6vw",  delay: 0 },
  { top: "12vh", left: "8vw",  delay: 0.3 },
  { top: "75vh", left: "57vw", delay: 0.6 },
  { top: "80vh", left: "88vw", delay: 0.9 },
];

// Each dot:
<motion.div
  className="accent-dot absolute w-1.5 h-1.5 bg-red-600"
  style={{ top: dot.top, left: dot.left }}
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
/>
```

---

## 9. BACKGROUND ATMOSPHERE

Applied to the sticky inner canvas:

```css
.systems-sticky {
  background:
    /* Red corner breath — top left */
    radial-gradient(ellipse 35% 30% at 5% 10%,  rgba(220,38,38,0.07), transparent),
    /* Faint right bloom */
    radial-gradient(ellipse 30% 40% at 95% 80%, rgba(220,38,38,0.05), transparent),
    /* Base black */
    #080808;
}

/* Engineering grid — very faint */
.systems-sticky::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}
```

---

## 10. SECTION LABEL (always visible, top-left)

```tsx
<div className="absolute top-8 left-8 z-30">
  <p className="text-red-600 text-xs tracking-[0.3em] uppercase font-['DM_Sans']">
    Engineering Systems
  </p>
  <div className="h-px w-12 bg-red-600 mt-2" />
</div>
```

---

## 11. MOBILE FALLBACK (below md breakpoint)

On mobile, the sticky scroll-pinned layout becomes a simple vertical stack:

```
- Disable ScrollTrigger pin
- Stack cards vertically: primary image (full width) → text → secondary image (60% width)
- SVG path becomes a vertical dashed red line (left edge, like a timeline)
- Waypoint dots become left-side markers
- GSAP scroll trigger: each card fades up as it enters viewport (no scrub)
- Framer Motion handles all hover states identically
```

```tsx
// Detect mobile and switch animation mode
const isMobile = useMediaQuery("(max-width: 768px)");

// In GSAP setup:
if (!isMobile) {
  // Full horizontal scroll-pin experience
  setupDesktopAnimation();
} else {
  // Simple stagger fade-up per card
  setupMobileAnimation();
}
```

---

## 12. COMPONENT FILE MAP

```
components/
  systems-showcase/
    index.tsx                  ← Main section wrapper + GSAP pin
    system-card.tsx            ← Single card (primary + secondary + text)
    svg-connector.tsx          ← The curved SVG path
    path-traveler.tsx          ← Red dot that rides the path
    accent-dots.tsx            ← Scattered decorative dots
    section-label.tsx          ← Top-left label

hooks/
  useSystemsAnimation.ts       ← All GSAP ScrollTrigger setup
  useMediaQuery.ts             ← Mobile/desktop switch

lib/
  systems-data.ts              ← Content for all 3 systems
```

---

## 13. IMAGE SOURCE — `/images` FOLDER

All images live in the **`/images`** folder at the project root (served as static assets).
Do NOT use external URLs, placeholder services, or dynamic imports for these.
Reference them with root-relative paths directly in `src` attributes.

### Folder Structure

```
public/
  images/
    powertrain/
      primary.jpg          ← Engine bay / exhaust header close-up
      secondary.jpg        ← Gearbox sprocket / chain detail
    aerodynamics/
      primary.jpg          ← Front wing assembly / endplate
      secondary.jpg        ← Diffuser / undertray underside
    electronics/
      primary.jpg          ← ECU / PCB / wiring loom close-up
      secondary.jpg        ← Dashboard display / sensor bracket
```

### Updated `systems-data.ts` — Hardcoded Image Paths

```ts
// lib/systems-data.ts

export const systems = [
  {
    id: "powertrain",
    index: "01",
    category: "Powertrain",
    headline: "Engine & Drivetrain",
    description:
      "High-output powertrain engineered for consistent delivery across all circuit conditions. Every component tuned for efficiency and peak torque response.",
    primaryImage:   "/images/powertrain/primary.jpg",
    secondaryImage: "/images/powertrain/secondary.jpg",
  },
  {
    id: "aerodynamics",
    index: "02",
    category: "Aerodynamics",
    headline: "Downforce Architecture",
    description:
      "Computational fluid dynamics validated aero package. Front wing, undertray, and diffuser operating as a unified system to maximize grip at speed.",
    primaryImage:   "/images/aerodynamics/primary.jpg",
    secondaryImage: "/images/aerodynamics/secondary.jpg",
  },
  {
    id: "electronics",
    index: "03",
    category: "Electronics",
    headline: "Control & Data Systems",
    description:
      "Integrated ECU, sensor array, and telemetry stack. Real-time data acquisition feeds iteration — every lap refines every parameter.",
    primaryImage:   "/images/electronics/primary.jpg",
    secondaryImage: "/images/electronics/secondary.jpg",
  },
];
```

### Next.js `<Image />` Usage

Use Next.js `<Image>` component (not bare `<img>`) for all cards.
Add all image domains/paths to `next.config.js` if needed.

```tsx
import Image from "next/image";

// Inside SystemCard:
<Image
  src={system.primaryImage}        // e.g. "/images/powertrain/primary.jpg"
  alt={system.headline}
  fill                             // fills the card container
  sizes="(max-width: 768px) 100vw, 420px"
  className="object-cover"
  style={{
    filter: "brightness(0.75) contrast(1.1)",
  }}
  priority={system.index === "01"} // only eager-load Powertrain (first visible)
/>
```

### Image CSS Treatment

All images receive this filter stack — applied consistently via Tailwind or inline style:

```css
filter: brightness(0.75) contrast(1.1) saturate(0.9);
transition: filter 0.6s ease;

/* On card hover: */
filter: brightness(0.9) contrast(1.1) saturate(1.0);
```

This creates the **dark, desaturated, moody editorial look** seen in the reference —
images should feel like they belong to the darkness, not sit on top of it.

### If an Image File Is Missing

If a specific image hasn't been placed in `/images` yet, fall back gracefully:

```tsx
<Image
  src={system.primaryImage}
  alt={system.headline}
  fill
  className="object-cover"
  onError={(e) => {
    // Fallback: dark gray placeholder that matches the aesthetic
    (e.target as HTMLImageElement).style.background = "#111111";
    (e.target as HTMLImageElement).style.display = "none";
  }}
/>
{/* Fallback div shown if image fails */}
<div
  className="absolute inset-0 flex items-end p-4"
  style={{ background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)" }}
>
  <span className="text-white/20 text-xs font-['DM_Sans'] tracking-widest uppercase">
    {system.category} · Image pending
  </span>
</div>
```

### `next.config.js` — Static Image Config

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All images are local — no remote domains needed
    // If you ever add external sources, add them here
    remotePatterns: [],
  },
};

module.exports = nextConfig;
```

---

> **To Copilot:** Build this section exactly as described. The sticky scroll-pin
> with GSAP scrub is the structural backbone. The SVG path is the visual soul.
> Every card position is intentionally asymmetric — do NOT center or align them
> to a grid. The scattered, hand-placed quality is the entire aesthetic point.
> Reference the image provided — scattered dark cards, thin curved connector,
> small dot markers, text sitting freely beside cards — and apply it to
> Powertrain, Aerodynamics, and Electronics as described above.
>
> **All images are served from `/images/[system]/primary.jpg` and
> `/images/[system]/secondary.jpg` — use these exact paths. Do not hardcode
> any external URLs or placeholder services. Use Next.js `<Image>` with `fill`
> prop inside the card containers.**