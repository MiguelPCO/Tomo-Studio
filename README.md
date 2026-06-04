# Tomo Studio

Portfolio demo for a fictional architecture studio built around the concept of **"projects as books"** — a digital architectural library where each project is an editorial volume you pull off a shelf.

![Hero](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)

## Overview

Tomo Studio is a complete, production-ready portfolio site showcasing six architecture projects across residential, commercial, cultural, and interior design categories. The design language is editorial — warm neutrals, Cormorant Garamond headlines, IBM Plex Mono labels, and a terracotta accent that runs through every interaction.

## The Book Interaction

The signature feature is a 5-state book extraction sequence on the projects library page:

1. **Shelf** — Six colored spines sit on a 3D CSS shelf with `perspective: 800px` and Motion-powered hover
2. **Extract** — Click a spine: GSAP lifts the book from the shelf with a 3-step timeline (lift → fly → arrive), showing the real cover image throughout
3. **Focused** — Book centered on screen, metadata panel fades in alongside
4. **Opening** — "Abrir proyecto" triggers a GSAP cover-rotation sequence
5. **Project** — Next.js route transition to the full project page

`prefers-reduced-motion`: GSAP skips entirely, simple opacity fade used throughout.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript strict |
| Styles | Tailwind CSS v4 (`@theme` tokens, no config file) |
| UI animations | Motion for React (`motion/react`) |
| Book choreography | GSAP (lazy-loaded via singleton on first interaction) |
| Smooth scroll | Lenis |
| Data | Static TypeScript objects in `/src/data/` |
| Images | Unsplash Direct API |
| Deploy | Vercel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, philosophy, featured library, method, services, journal, CTA |
| `/proyectos` | Library — shelf / covers / index views, filters, sort, search |
| `/proyectos/[slug]` | Project — 7 chapters, sticky index, gallery, technical sheet |
| `/estudio` | About — team, philosophy, values |
| `/servicios` | Services — 7 editorial numbered cards with deliverables |
| `/proceso` | Method — interactive 6-step accordion timeline |
| `/archivo` | Journal — 4 posts grid |
| `/archivo/[slug]` | Post detail |
| `/contacto` | Contact — `mailto:` form, no backend required |
| `/privacidad` | Privacy policy |
| `/aviso-legal` | Legal notice |

## Projects (6 volumes)

| Vol | Slug | Category | City | Status |
|-----|------|----------|------|--------|
| 01 | `patio` | Residencial | Madrid | Construido |
| 02 | `monte` | Residencial | Galicia | Construido |
| 03 | `arco` | Interiorismo | Sevilla | Construido |
| 04 | `acero` | Comercial | Barcelona | Construido |
| 05 | `azulejo` | Reforma | Valencia | En proceso |
| 06 | `lamina` | Cultural | Toledo | Construido |

## Design Tokens

```css
--color-cal-blanca:     #F8F7F4   /* main background */
--color-concrete-light: #E5E3DF   /* borders, cards */
--color-concrete-mid:   #BEBBB5   /* placeholders */
--color-stone:          #8A8880   /* secondary text, labels */
--color-terracotta:     #C4673A   /* primary accent, CTAs */
--color-charcoal:       #2C2C2C   /* body text */
--color-black-arch:     #111111   /* headings, nav */
```

**Typography:** Cormorant Garamond (editorial headlines) · Inter (UI, body) · IBM Plex Mono (volume numbers, metadata)

## Getting Started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 24 static pages, 0 TS errors
pnpm test     # 21 unit tests
```

## Key Architecture Decisions

**GSAP lazy loading** — `loadGsap()` in `src/lib/gsap.ts` is an async singleton. GSAP (~60 kB) only imports on first book click — not at startup.

**Static data** — No CMS, no database. All 6 projects, 7 services, 4 journal posts, and studio data live in `/src/data/` as typed TypeScript objects. Zero runtime cost, instant builds.

**`mailto:` contact form** — Constructs a `mailto:` href from form values. No backend, no API keys, no data stored server-side.

**Tailwind v4** — CSS-only config via `@import "tailwindcss"` and `@theme {}` block in `globals.css`. No `tailwind.config.ts`.

**Reduced motion** — `ReducedMotionProvider` reads `prefers-reduced-motion` and skips all GSAP and transform animations throughout the app.

## License

MIT
