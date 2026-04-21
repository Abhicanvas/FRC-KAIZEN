# FRC KAIZEN Website — GitHub Copilot Prompt

## PROJECT OVERVIEW
Build a full Next.js 14 (App Router) website for **FRC KAIZEN**, a Formula Student racing team from Kerala, India.
- Color palette: **Black (#0a0a0a), Red (#DC2626), White (#FFFFFF)**
- UI Library: **shadcn/ui** (Tailwind CSS v3)
- Font system:
  - `FRC KAIZEN - ASTRON` — logotype / brand wordmark only
  - `HK Modular` — sub-headings and headings
  - `TT Lakes Neue` — body text, content, and data
- The **hero section is already built** — do NOT recreate it.
- Style direction: **High-octane motorsport editorial** — aggressive, precision-engineered, bold typographic hierarchy, industrial grid overlays, kinetic motion.

---

## TECH STACK
- Next.js 14 App Router + TypeScript
- Tailwind CSS v3
- shadcn/ui components
- Framer Motion (for all animation)
- Custom fonts: Ithill FRC KAIZEN - ASTRON, HK Modular, TT Lakes Neue (self-hosted via `next/font/local`)
- Lucide React icons

---

## FONT SYSTEM

### Font Roles

| Font | Variable | Usage |
|---|---|---|
| `FRC KAIZEN - ASTRON` | `--font-brand` | Logotype, wordmark, team name as a badge — nowhere else |
| `HK Modular` | `--font-display` | All headings (H1–H4), section labels, card titles, tier names, nav items |
| `TT Lakes Neue` | `--font-body` | All body copy, bullet points, form fields, data values, captions, footer text |

### Font Loading (next/font/local)

Place font files in `/public/fonts/` and load them in `app/layout.tsx`:

```typescript
import localFont from 'next/font/local';

const brandFont = localFont({
  src: '../public/fonts/ItHillFRCKAIZEN-ASTRON.woff2',
  variable: '--font-brand',
  display: 'swap',
});

const displayFont = localFont({
  src: '../public/fonts/HKModular-Regular.woff2',
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = localFont({
  src: [
    { path: '../public/fonts/TTLakesNeue-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/TTLakesNeue-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/TTLakesNeue-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${brandFont.variable} ${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Tailwind Font Config (`tailwind.config.ts`)

```typescript
theme: {
  extend: {
    fontFamily: {
      brand:   ['var(--font-brand)', 'sans-serif'],
      display: ['var(--font-display)', 'sans-serif'],
      body:    ['var(--font-body)', 'sans-serif'],
    },
  },
},
```

### Usage Rules

- `font-brand` → **only** for `FRC KAIZEN` as a logotype (navbar logo, footer name, hero wordmark)
- `font-display` → all headings, section eyebrow labels, card phase titles, tier badges, stat numbers
- `font-body` → paragraphs, bullet content, form inputs/labels, captions, nav links, stat descriptors, footer copy
- **Never mix fonts arbitrarily** — every element must map to exactly one of these three roles

---

## GLOBAL DESIGN SYSTEM

### CSS Variables (`globals.css`)

```css
:root {
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-red: #DC2626;
  --color-red-muted: #7f1d1d;
  --color-white: #FFFFFF;
  --color-muted: #6b7280;
  --color-border: #1f1f1f;

  --font-brand:   'FRC KAIZEN - ASTRON', sans-serif;
  --font-display: 'HK Modular', sans-serif;
  --font-body:    'TT Lakes Neue', sans-serif;
}

body {
  background-color: var(--color-bg);
  color: var(--color-white);
  font-family: var(--font-body);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

### Global Styles
- Background: `#0a0a0a` globally
- Body text: `#FFFFFF` / `#9ca3af` for muted
- Red accent used for: borders, underlines, badges, CTA buttons, section labels
- Subtle **grain/noise texture overlay** on body using a CSS pseudo-element (SVG noise filter at ~4% opacity)
- **Hairline red left-border** on section labels (e.g., `border-l-2 border-red-600 pl-3`)
- Custom **red cursor dot** (12px circle, `mix-blend-mode: difference`)

---

## PAGE STRUCTURE

### 1. `/` — Home Page (hero already exists, build everything below the hero)

> **Hero content (already built — do not recreate):**
> - Headline: `"FRC KAIZEN"` — `font-brand`
> - Subheadline: `"From Concept to Circuit — Built for the Grid."` — `font-display`
> - Body: `"An interdisciplinary team from XYZ College, Kerala…"` — `font-body`

---

#### SECTION: ABOUT US
**Layout:** Asymmetric two-column — left: large editorial number `"40+"` with vertical label, right: text block with animated reveal.

**Typography:**
- Eyebrow label `ABOUT US` → `font-display`, red, uppercase, wide letter-spacing, hairline left border
- Stat numbers (`40+`, `01`, `∞`) → `font-display`, large
- Stat descriptors (Members, Active Car, Iterations) → `font-body`, muted gray
- All paragraph text → `font-body`

**Content:**
- Headline (animated word-by-word reveal, `font-display`):
  `"FRC KAIZEN is a student-led Formula Student team driven by performance and execution, bringing together an interdisciplinary team of over forty members."`
- Body paragraphs (`font-body`):
  - `"From concept to validation, every system is engineered, built, and refined with intent. Design, manufacturing, and testing operate as a continuous cycle—guided by data and iteration."`
  - `"We compete on national and international circuits, focused on delivering performance on and off the track."`
- Stat block — three inline stats with animated count-up on scroll:
  - `40+` Members
  - `01` Active Car
  - `∞` Iterations

**Design:**
- Background detail: Faint `45deg` grid lines using `background-image: repeating-linear-gradient(...)` at 3% opacity
- Animation: Section fades up (`y: 40 → 0, opacity 0 → 1`) when in viewport using `useInView`

---

#### SECTION: WHAT WE DO
**Layout:** Full-width horizontal scroll ticker at top, then 2×2 card grid below.

**Ticker (top):**
- Infinitely looping marquee: `DESIGN · BUILD · TEST · RACE · DESIGN · BUILD · TEST · RACE ·`
- `font-display`, red text on black, large (`text-6xl`), `animation: marquee 12s linear infinite`
- Separated by small red `◆` diamond icons

**Intro text (above grid, `font-body`):**
`"At FRC KAIZEN, we follow a complete vehicle development cycle—covering design, manufacturing, testing, and on-track performance. Each phase is executed with precision and intent, driven by data, iteration, and attention to detail. From the garage to the grid, every system is developed to deliver performance."`

**Card Grid — 4 cards:**

| # | Phase | Detail |
|---|---|---|
| 01 | DESIGN | Engineering analysis, system integration, and validation |
| 02 | BUILD | Manufacturing, fabrication, and assembly |
| 03 | TEST | Performance evaluation, tuning, and iteration |
| 04 | RACE | Competing on national and international circuits |

Each card:
- Black surface (`#111111`), `1px` red top border
- Large dim-red number (`01`–`04`) → `font-display`, top-left
- Phase title → `font-display`, white, large
- Detail text → shadcn `Badge`, `font-body`, muted/red
- Hover: red border on all 4 sides, `scale(1.02)`, text brightens
- Framer Motion `staggerChildren` — cards enter `y: 60 → 0`, staggered 0.15s

---

#### SECTION: KAIZEN PHILOSOPHY
**Layout:** Full-width cinematic section, center-aligned, near-full-viewport height.

**Typography:**
- Section label `KAIZEN` → `font-display`, red
- Headline → `font-display`, animated word-by-word reveal
- Body → `font-body`
- Closing italic line → `font-body`, italic, red

**Content:**
- Giant background kanji `改善` → `font-display`, `text-[20vw]`, white at 3% opacity, non-interactive
- Background: black with **diagonal red line** (`position: absolute`, `rotate-12`, `1px`, opacity 20%)
- Headline: `"Constant refinement. Continuous evolution."`
- Body: `"Every system is developed through iteration, every detail improved with intent. From design to track, progress is built step by step."`
- Closing line (red italic): `"Performance is not achieved — it is refined."`

**Animation:** Words enter one-by-one on scroll — `opacity 0→1`, `y: 20→0`, `staggerChildren`

---

#### SECTION: SPONSORS / PARTNERS PREVIEW
**Layout:** Simple centered CTA section with logo placeholder grid.

**Typography:**
- Section label `OUR PARTNERS` → `font-display`
- Headline `"Powered by Partnership"` → `font-display`
- Subtext → `font-body`
- Button label → `font-display`

**Content:**
- Subtext: `"FRC KAIZEN is driven by performance—and powered by partnership. We work with organizations that value engineering, innovation, and visibility. From car livery to digital platforms, we ensure meaningful brand presence at national and international Formula Student competitions."`
- Logo grid: 6 placeholder boxes (`border border-white/10 rounded bg-white/5`) in a 3×2 grid, `animate-pulse` on alternate items
- shadcn `Button` (variant `outline`, red border + red text, hover fills red): `BECOME A PARTNER →`
  - Links to `/sponsorship`
  - Hover: red glow `box-shadow: 0 0 20px rgba(220,38,38,0.4)`
- Animation: section slides up on scroll

---

#### SECTION: CONTACT
**Layout:** Split — left: contact info stack, right: shadcn `Card` with contact form.

**Typography:**
- Section label `ESTABLISH CONTACT` → `font-display`
- Contact item labels → `font-body`, muted gray
- Contact item values → `font-body`, white
- Form field labels + placeholder text → `font-body`
- Submit button label `SEND IT` → `font-display`

**Left side:**
- Three contact items with red icon dots:
  - 📧 **Email:** `[your team email]`
  - 🔗 **LinkedIn:** `[your LinkedIn page]`
  - 📸 **Instagram:** `[your Instagram handle]`
- Each item: icon in red, label in muted gray, value in white; hover underlines in red

**Right side (shadcn Card):**
- Dark surface card (`bg-[#111111] border border-white/10`)
- Fields: Name, Email, Message — shadcn `Input` + `Textarea` with red focus ring (`focus-visible:ring-red-600`)
- Submit button: shadcn `Button`, full-width, red background, label `SEND IT`
- On submit: Framer Motion success state — form fades out, checkmark + `"Message received. We'll be in touch."` fades in

---

#### FOOTER
**Layout:** Full-width dark strip (`#060606`).

**Typography:**
- `FRC KAIZEN` wordmark → `font-brand`, large
- `© 2025` → `font-body`, muted gray
- Nav links → `font-body`
- Bottom tagline `"THE PADDOCK IS ALIVE. 🏁"` → `font-display`, red, wide letter-spacing

**Content:**
- Left: `FRC KAIZEN` wordmark + `© 2025`
- Center: Nav links — Home / About / Sponsorship / Contact
- Right: Social icons (Lucide or SVG), red on hover
- Top edge: `1px` red line across full width

---

### 2. `/sponsorship` — Sponsorship Page

---

#### HEADER SECTION (replaces hero)
**Layout:** Full-width, ~60vh tall.

**Typography:**
- Eyebrow badge `SPONSORSHIP` → `font-display`, shadcn `Badge` variant destructive
- Headline lines → `font-display`, `text-7xl md:text-9xl`
- Subtext → `font-body`

**Design:**
- Background: black with **red radial gradient** from top-left (`radial-gradient(ellipse at 0% 0%, rgba(220,38,38,0.15), transparent 60%)`)
- Thin animated red scanning line (horizontal, top→bottom every 4s, `opacity: 0.3`, CSS keyframe)
- Headline — each line animates in from left (`x: -60 → 0`, staggered 0.3s):
  - Line 1: `"Powering Performance."`
  - Line 2: `"Driving Innovation."`
- Subtext fades in last

---

#### SECTION: INTRO
**Layout:** Two-column — left: paragraph with animated reveal, right: bold blockquote.

**Typography:**
- Body paragraph → `font-body`
- Blockquote text → `font-display`, white

**Left content (`font-body`):**
`"FRC KAIZEN offers structured partnership opportunities designed to deliver strong brand visibility, technical collaboration, and real-world engineering impact. Our partners gain exposure across national and international Formula Student circuits—through the car, the team, and our digital presence."`

**Right blockquote (`font-display`):**
`"From car to circuit — your brand goes where we go."`
- Style: `border-l-4 border-red-600 pl-6`

---

#### SECTION: PARTNERSHIP TIERS
**Layout:** Vertical stack of full-width tier cards.

**Typography (all cards):**
- Tier name badge → `font-display`
- Benefit labels → `font-body`
- Red `◆` bullet → decorative only

**Tier Cards:**

**🥇 PLATINUM PARTNER**
- Background: `linear-gradient(135deg, #1a0000, #0a0a0a)`, `border border-red-600`
- Red glow: `box-shadow: 0 0 30px rgba(220,38,38,0.2)`
- Badge: `PLATINUM` in red
- Benefits (shadcn `Separator` between each, red `◆` bullets):
  - Primary logo placement on car (high-visibility zones)
  - Branding on team apparel (race suits, team wear)
  - Featured across all social media platforms
  - Logo on official website with top-tier positioning
  - Direct technical collaboration opportunities
  - Priority visibility at competitions and events
- Scroll entry: `x: 100 → 0`

**🥈 GOLD PARTNER**
- Border: `border border-yellow-600/40`, badge: amber/gold
- Benefits:
  - Prominent logo placement on car
  - Branding on team apparel
  - Regular mentions on social media
  - Logo on website
  - Visibility during competitions and team activities
- Scroll entry: `x: -100 → 0`

**🥉 SILVER PARTNER**
- Border: `border border-white/20`, badge: white/muted
- Benefits:
  - Logo placement on car (secondary areas)
  - Mentions on social media
  - Logo on website
  - Recognition during events
- Scroll entry: `x: 100 → 0`

**⚙️ ASSOCIATE PARTNER**
- Border: `border border-white/10`, badge: gray
- Benefits:
  - Logo on website
  - Social media mentions
  - Acknowledgment in team communications
- Scroll entry: `x: -100 → 0`

All cards:
- `rounded-none` (sharp corners — motorsport aesthetic)
- Inner grid: label column (left, 30%) + benefits column (right, 70%)
- Hover: red border glow intensifies

---

#### SECTION: CALL TO ACTION
**Layout:** Full-width cinematic strip.

**Typography:**
- Headline → `font-display`, black text (`text-black`)
- Button label `ESTABLISH CONTACT →` → `font-display`

**Design:**
- Background: full red (`bg-red-600`) — the only red-background section on the site
- Headline (letters drop in one-by-one via `staggerChildren`):
  `"Partner with us. Build performance. Share the grid."`
- `🏁` flag icon, large, absolutely positioned right corner, slow rotation (`animation: spin 20s linear infinite`)
- shadcn `Button` variant `outline`, black border + black text, hover fills black with white text
  - Links to `/#contact`

---

## ANIMATIONS SUMMARY (Framer Motion)

| Element | Animation |
|---|---|
| Section headings | Word-by-word reveal, stagger 0.08s, `y: 30→0 opacity 0→1` |
| Stat numbers | Count-up on `useInView`, Framer Motion `animate` |
| Cards | Staggered grid entry, alternating left/right |
| Marquee ticker | CSS `@keyframes marquee`, infinite loop |
| CTA section letters | Per-letter drop-in stagger |
| Scanning header line | CSS `@keyframes scan`, 4s loop |
| Red cursor dot | Framer Motion `useMotionValue` tracking mouse |
| Page transitions | Framer Motion `AnimatePresence`, black curtain wipe |

---

## SHADCN COMPONENTS TO USE

```bash
npx shadcn@latest add button card badge input textarea separator
```

| Component | Usage | Font |
|---|---|---|
| `Button` | CTAs, form submit | `font-display` label |
| `Card` | Sponsor tiers, contact form | `font-body` content |
| `Badge` | Section labels, tier names | `font-display` |
| `Input` + `Textarea` | Contact form | `font-body` |
| `Separator` | Between tier benefits | — |

All shadcn components should be **restyled** to match the black/red/white palette via `className` overrides — do not use default shadcn colors for primary actions.

---

## COMPONENT FILE STRUCTURE

```
app/
├── page.tsx                        # Home page
├── sponsorship/
│   └── page.tsx                    # Sponsorship page
├── globals.css                     # CSS variables + grain texture + cursor
├── layout.tsx                      # Font loading via next/font/local

public/
└── fonts/
    ├── ItHillFRCKAIZEN-ASTRON.woff2
    ├── HKModular-Regular.woff2
    ├── TTLakesNeue-Regular.woff2
    ├── TTLakesNeue-Medium.woff2
    └── TTLakesNeue-Bold.woff2

components/
├── sections/
│   ├── AboutSection.tsx
│   ├── WhatWeDoSection.tsx
│   ├── KaizenPhilosophySection.tsx
│   ├── SponsorsPreviewSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── sponsorship/
│   ├── SponsorshipHeader.tsx
│   ├── IntroSection.tsx
│   ├── TierCard.tsx
│   └── SponsorshipCTA.tsx
└── ui/
    ├── MarqueeTicker.tsx
    ├── AnimatedHeading.tsx
    ├── StatCounter.tsx
    └── RedCursor.tsx
```