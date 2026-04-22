# FRC KAIZEN — Design & Animation System
## Framer Motion Skill Prompt (`C-Jeril/framer-motion-skills`)

> **Scope:** This file covers ONLY design language and animation implementation.
> Content and structure live in the main prompt. Apply this as a layer on top.
> Skill reference: `C-Jeril/framer-motion-skills`

---

## 0. SKILL ACTIVATION INSTRUCTION

```
@workspace Use the C-Jeril/framer-motion-skills skill for ALL animation implementations below.
Follow every pattern, hook, and variant convention defined in that skill.
Do not invent custom animation logic — pull from the skill's established patterns.
```

---

## 1. DESIGN LANGUAGE FOUNDATION

### 1.1 Visual Identity Rules

| Token | Value | Usage |
|---|---|---|
| `--red` | `#DC2626` | Accents, CTAs, borders, active states |
| `--red-glow` | `rgba(220,38,38,0.25)` | Box shadows, glow halos |
| `--red-dim` | `#7f1d1d` | Background tints, muted badges |
| `--bg` | `#0a0a0a` | Page background |
| `--surface` | `#111111` | Cards, panels |
| `--surface-raised` | `#181818` | Hover states, elevated cards |
| `--white` | `#FFFFFF` | Primary text |
| `--muted` | `#6b7280` | Secondary text, labels |
| `--border` | `rgba(255,255,255,0.07)` | Subtle dividers |
| `--border-hot` | `rgba(220,38,38,0.6)` | Active/hover borders |

### 1.2 Typography Hierarchy

```css
/* Display — Section headlines, hero overlays */
font-family: 'Bebas Neue', sans-serif;
letter-spacing: 0.04em;

/* Body — Paragraphs, labels, UI text */
font-family: 'DM Sans', sans-serif;
font-weight: 300 | 400 | 500;
```

**Scale:**
- `text-[clamp(3rem,8vw,7rem)]` — Hero/section mega-headlines
- `text-5xl` — Sub-headlines
- `text-sm tracking-[0.25em] uppercase` — Eyebrow labels
- `text-base leading-relaxed` — Body copy

### 1.3 Geometry & Shape Language

- **Zero border radius** everywhere (`rounded-none`) — hard, engineered edges
- **1px red hairline borders** as decorative structural elements
- **Diagonal slashes** (`/`) used as section separators, not dots or dashes
- **Asymmetric padding** — sections breathe left-heavy or right-heavy, never centered-only
- **Grid overlay** — faint `1px` white grid lines at `5% opacity` using `background-image` on key sections
- **Overlap** — stats, labels, and numbers intentionally bleed into adjacent elements

### 1.4 Atmospheric Backgrounds

Apply these layered backgrounds on sections (not global body):

```css
/* Grain noise texture — apply as ::after on section wrappers */
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
  opacity: 0.035;
  pointer-events: none;
  mix-blend-mode: overlay;
}

/* Red radial breath — hero-adjacent sections */
background: radial-gradient(ellipse 60% 40% at 15% 50%, rgba(220,38,38,0.12), transparent);

/* Engineering grid — WHAT WE DO section */
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;

/* Diagonal slash mark — KAIZEN section */
background-image: repeating-linear-gradient(
  -55deg,
  transparent,
  transparent 80px,
  rgba(220,38,38,0.04) 80px,
  rgba(220,38,38,0.04) 81px
);
```

---

## 2. FRAMER MOTION ANIMATION SYSTEM

> All variants below follow `C-Jeril/framer-motion-skills` conventions.
> Use `useInView` with `{ once: true, margin: "-80px" }` for all scroll triggers.

### 2.1 Core Variant Library

Create `lib/variants.ts` and export these — reference them everywhere:

```ts
import { Variants } from "framer-motion";

// ─── FADE UP — General section entry
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ─── FADE LEFT — Slides in from right edge
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// ─── FADE RIGHT — Slides in from left edge
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// ─── STAGGER CONTAINER — Wraps staggered children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1
    }
  }
};

// ─── WORD REVEAL — Per-word drop animation (Bebas Neue headlines)
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

// ─── LETTER REVEAL — Per-letter for short labels
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// ─── CARD ENTRY — For tier/phase cards
export const cardEntry: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ─── CLIP REVEAL — Wipes in from left using clipPath
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
  }
};

// ─── SCALE PULSE — For stat numbers and icons
export const scalePulse: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 }
  }
};

// ─── RED LINE DRAW — Horizontal decorative line
export const lineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
  }
};

// ─── PAGE CURTAIN — AnimatePresence route transition
export const pageCurtain: Variants = {
  initial: { scaleY: 0, originY: 0 },
  animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit: { scaleY: 0, originY: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }
};
```

---

### 2.2 Reusable Animated Components

#### `<AnimatedHeadline />` — Word-by-word Bebas Neue reveal

```tsx
// components/animated-headline.tsx
"use client";
import { motion } from "framer-motion";
import { staggerContainer, wordReveal } from "@/lib/variants";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedHeadline({ text, className, delay = 0 }: Props) {
  const words = text.split(" ");
  return (
    <motion.h2
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          className="inline-block mr-[0.25em]"
          custom={i + delay}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
```

#### `<RedLine />` — Animated hairline accent

```tsx
// components/red-line.tsx
"use client";
import { motion } from "framer-motion";
import { lineDraw } from "@/lib/variants";

export function RedLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={`h-px bg-red-600 w-full ${className}`}
      variants={lineDraw}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  );
}
```

#### `<StatCounter />` — Animated count-up

```tsx
// components/stat-counter.tsx
"use client";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="font-['Bebas_Neue'] text-7xl text-white tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
```

#### `<RedCursor />` — Custom magnetic red cursor dot

```tsx
// components/red-cursor.tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function RedCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 6); y.set(e.clientY - 6); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-red-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}
```

#### `<PageTransition />` — Black curtain wipe between routes

```tsx
// components/page-transition.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 bg-black z-50 origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          exit={{ scaleY: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### 2.3 Section-by-Section Animation Choreography

#### HOME — ABOUT US Section

```
Entry sequence (triggered once on scroll):
  T+0.00s  RedLine draws across top (scaleX 0→1)
  T+0.30s  Eyebrow label "ABOUT US" clips in from left
  T+0.50s  Headline words drop in one-by-one (wordReveal, stagger 0.09s)
  T+0.90s  Body paragraph fades up (fadeUp, blur 4px→0)
  T+1.10s  Three stat blocks scale in via spring (scalePulse, stagger 0.12s)
  T+1.30s  Stat count-up animates (0 → final value, 2s easeOut)

Hover state on stat blocks:
  whileHover: { scale: 1.05, color: "#DC2626" }
  transition: { type: "spring", stiffness: 300 }
```

#### HOME — WHAT WE DO Section

```
Marquee ticker:
  CSS @keyframes marquee — translateX(0) → translateX(-50%), 14s linear infinite
  On hover of ticker: animation-play-state: paused
  Each ◆ separator: slight red pulse (opacity 0.6 → 1, 1.5s ease infinite)

Card grid entry (staggerContainer wraps all 4):
  Cards 1, 3  → fadeRight (slide from left)
  Cards 2, 4  → fadeLeft  (slide from right)
  Stagger delay: 0.15s between each

Card hover (whileHover):
  scale: 1.02
  boxShadow: "0 0 0 1px #DC2626, 0 8px 32px rgba(220,38,38,0.2)"
  transition: { duration: 0.25 }

Card number (01, 02...):
  On parent hover → y: -4, opacity: 1 (from 0.3 base)
```

#### HOME — KAIZEN PHILOSOPHY Section

```
Background 改善 character:
  Initial: opacity 0, scale 1.2
  Animate: opacity 0.03, scale 1.0 (slow, 2s on mount, no scroll trigger)
  Subtle float: y: [0, -12, 0], 8s ease-in-out infinite (useAnimate loop)

Diagonal red line:
  clipReveal variant, delayed 0.2s after section enters

Text sequence (staggerContainer):
  T+0.0s  Section label clips in
  T+0.2s  Line 1 of headline — wordReveal
  T+0.5s  Line 2 of headline — wordReveal
  T+0.9s  Body paragraph — fadeUp
  T+1.2s  Final red italic line — fadeUp + slight x: 20→0

Performance quote line:
  whileInView: color animates from #6b7280 → #DC2626 over 1s
  Use motion.p with animate prop
```

#### HOME — SPONSORS Preview Section

```
Logo placeholder boxes:
  staggerContainer with stagger 0.07s
  Each box: cardEntry variant
  Even-indexed boxes have 0.3s extra delay

  whileHover on each box:
    borderColor: "rgba(220,38,38,0.6)"
    backgroundColor: "rgba(220,38,38,0.05)"
    scale: 1.04

CTA Button (BECOME A PARTNER):
  whileHover:
    boxShadow: "0 0 24px rgba(220,38,38,0.5)"
    x: 4  ← slight rightward nudge

  whileTap: scale: 0.97

  Arrow icon inside button:
    whileHover (parent hover): x: 6→0 animation on the → icon
    Use motion.span wrapping the Lucide ArrowRight
```

#### HOME — CONTACT Section

```
Left column (contact info):
  fadeRight stagger on each contact item, 0.1s apart
  Each item's red dot icon:
    animate: scale [1, 1.3, 1], 2s ease-in-out infinite, staggered start

Right column (form card):
  fadeLeft, delayed 0.3s after left column starts

Input focus states:
  Use Framer Motion layout animation — label floats up on focus
  Ring color animates: transparent → #DC2626 on focus (CSS handles this,
  but add whileFocus: { scale: 1.005 } on each input wrapper)

Submit button:
  whileHover: { backgroundColor: "#b91c1c", letterSpacing: "0.08em" }
  whileTap: { scale: 0.98 }

Form success state (AnimatePresence):
  Form exits: opacity 0, scale 0.96, duration 0.3s
  Success message enters: opacity 1, scale 1, spring stiffness 200
  Checkmark icon: draws with pathLength 0→1, strokeDasharray animation
```

#### SPONSORSHIP — Header Section

```
Scanning red line:
  CSS keyframe: top: -2px → bottom: calc(100% + 2px), 5s linear infinite
  opacity: 0.25, mix-blend-mode: screen

Headline lines (TWO lines, Bebas Neue 9xl):
  Line 1 "Powering Performance." — x: -100→0, opacity 0→1, 0.8s
  Line 2 "Driving Innovation."   — x: -100→0, opacity 0→1, 0.8s, delay 0.25s
  ease: [0.16, 1, 0.3, 1] (expo out — snappy motorsport feel)

Eyebrow badge:
  Enters 0.2s before lines — clipReveal from left
```

#### SPONSORSHIP — Partnership Tier Cards

```
Card scroll entry (each card triggers independently):
  Platinum  → fadeUp,    delay 0s
  Gold      → fadeRight, delay 0.1s
  Silver    → fadeLeft,  delay 0.1s
  Associate → fadeUp,    delay 0.1s

  Each card also has:
    initial borderColor: rgba(255,255,255,0.07)
    whileInView borderColor animates to tier color over 0.6s
    (Platinum → red, Gold → amber, Silver → white/20, Associate → white/10)

Benefit list items (staggerContainer inside each card):
  Each benefit line: letterReveal, stagger 0.06s
  Small ◆ bullet: scalePulse before the text animates

Platinum card — extra effect:
  Continuous ambient glow pulse:
  animate: { boxShadow: [
    "0 0 20px rgba(220,38,38,0.1)",
    "0 0 40px rgba(220,38,38,0.25)",
    "0 0 20px rgba(220,38,38,0.1)"
  ]}, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }

whileHover on all cards:
  y: -4
  boxShadow intensifies to tier color glow
  transition: spring stiffness 200
```

#### SPONSORSHIP — CTA Section (full red bg)

```
On section enter:
  Background: animates from rgba(220,38,38,0) → #DC2626 over 0.8s
  (Use motion.section with animate prop + useInView)

Headline per-letter entry:
  Split "Partner with us. Build performance. Share the grid."
  Each character wrapped in motion.span
  staggerChildren: 0.03s — letters rain in fast
  variant: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }

🏁 flag icon:
  animate: { rotate: [0, 8, -8, 0] }, transition: { duration: 4, repeat: Infinity }
  Positioned absolutely, bottom-right, large (text-[8rem])

CTA Button (ESTABLISH CONTACT):
  whileHover: { backgroundColor: "#000", color: "#fff", borderColor: "#000" }
  whileTap: scale 0.97
  transition: { duration: 0.2 }
```

---

### 2.4 Micro-interactions

#### Navigation (top bar)

```
Active nav link:
  Underline uses motion.span with layoutId="nav-underline"
  Shared layout animation — underline slides between links smoothly

Nav links on hover:
  color: white → #DC2626
  transition: 0.15s

Mobile menu open/close (if applicable):
  AnimatePresence on menu panel
  y: -20 → 0, opacity 0 → 1 on open
  Stagger menu items with staggerChildren: 0.07s
```

#### Footer

```
Social icons:
  whileHover: { scale: 1.2, color: "#DC2626", rotate: -5 }
  transition: type "spring", stiffness 400

Footer text "THE PADDOCK IS ALIVE. 🏁":
  On page load (not scroll): letters appear one by one
  staggerChildren: 0.04s, letterReveal variant
  Loops subtly: after full reveal, gently pulses opacity 0.7→1 every 4s
```

---

## 3. PERFORMANCE & ACCESSIBILITY

```tsx
// Respect reduced motion globally
import { useReducedMotion } from "framer-motion";

function MotionWrapper({ children, variants, ...props }) {
  const shouldReduce = useReducedMotion();

  const safeVariants = shouldReduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } }
      }
    : variants;

  return (
    <motion.div variants={safeVariants} {...props}>
      {children}
    </motion.div>
  );
}
```

**Rules:**
- All `whileInView` animations use `once: true` — never replay on re-entry
- `layout` animations only on elements that actually change position
- Avoid animating `width`/`height` — prefer `scaleX`/`scaleY` + `transform`
- GPU-accelerated properties ONLY: `transform`, `opacity`, `filter`
- No `top`/`left`/`margin` in animation — breaks compositor thread
- Marquee and looping animations use CSS keyframes, not Framer (lighter)
- `LazyMotion` + `domAnimation` for smaller bundle on non-critical sections:

```tsx
import { LazyMotion, domAnimation, m } from "framer-motion";
// Use <m.div> instead of <motion.div> inside LazyMotion wrapper
```

---

## 4. ANIMATION TIMING CHEAT SHEET

| Feel | Easing Curve | Duration |
|---|---|---|
| Snappy / mechanical | `[0.76, 0, 0.24, 1]` | 0.5–0.7s |
| Natural / organic | `[0.25, 0.1, 0.25, 1]` | 0.6–0.8s |
| Explosive entry | `[0.16, 1, 0.3, 1]` | 0.7–0.9s |
| Spring bounce | `stiffness: 200, damping: 18` | — |
| Slow ambient float | `easeInOut` | 6–10s |
| Micro hover response | `easeOut` | 0.15–0.25s |

---

## 5. FILE CHECKLIST

```
lib/
  variants.ts                  ← All motion variants exported

components/
  animated-headline.tsx        ← Word-by-word Bebas reveal
  red-line.tsx                 ← lineDraw hairline
  stat-counter.tsx             ← Count-up on inView
  red-cursor.tsx               ← Magnetic dot cursor
  page-transition.tsx          ← Black curtain wipe
  marquee-ticker.tsx           ← CSS-based infinite scroll
  motion-wrapper.tsx           ← Reduced-motion-safe wrapper
```

---

> **Reminder to Copilot:** Every animation in this file maps to a section in the
> main `PROMPT.md`. Apply these variants exactly as named. Do not substitute
> generic `opacity`-only fades — the choreography above is intentional and
> motorsport-specific. The `C-Jeril/framer-motion-skills` skill governs
> all implementation patterns; follow it precisely.