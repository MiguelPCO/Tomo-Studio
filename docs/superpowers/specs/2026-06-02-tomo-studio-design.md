# Tomo Studio — Design Spec
**Date:** 2026-06-02  
**Status:** Approved

---

## 1. Project Overview

Demo portfolio web for a fictional architecture studio. Fully complete — all pages, all projects, all content. Showcases the "projects as books" metaphor: a digital architectural library where each project is an editorial volume.

**Studio name:** Tomo Studio  
**Language:** Spanish  
**Purpose:** Personal portfolio demo piece  
**Deploy:** Vercel

---

## 2. Core Concept

A digital architectural library. The portfolio is not a grid of images — it is a collection of volumes. Each project is a book with spine, cover, index, chapters, materials, plans, gallery, and technical sheet.

**Central metaphor:** *"Cada proyecto merece su propio volumen."*

**Interaction signature:** The user does not click a card — they pull a book off a shelf.

---

## 3. Technical Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styles | Tailwind CSS v4 |
| UI animations | Motion for React |
| Book choreography | GSAP (dynamic import — loaded only on book interaction) |
| Scroll | Lenis smooth scroll |
| Data | Static TypeScript objects in `/src/data/` |
| Images | Unsplash URLs (direct, no download) |
| Deploy | Vercel |

**GSAP loading strategy:** `const { gsap } = await import('gsap')` triggered on first book click. Avoids loading ~60 kB on initial paint.

---

## 4. Visual Design

### 4.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Cal Blanca | `#F8F7F4` | Main background, book pages |
| Concrete Light | `#E5E3DF` | Borders, separators, cards |
| Concrete Mid | `#BEBBB5` | Placeholders, shelf base, icons |
| Stone | `#8A8880` | Secondary text, metadata, mono labels |
| Terracotta | `#C4673A` | Primary accent, CTAs, Vol.01 spine |
| Charcoal | `#2C2C2C` | Body text, paragraphs |
| Black | `#111111` | Nav, titles, headers, dark spines |

**Spine color per volume:**
- Vol. 01 Patio → `#C4673A` Terracotta  
- Vol. 02 Monte → `#2C2C2C` Charcoal  
- Vol. 03 Arco → `#8A8880` Stone  
- Vol. 04 Acero → `#111111` Black  
- Vol. 05 Azulejo → `#BEBBB5` Concrete  
- Vol. 06 Lámina → `#5A4E3C` Dark Earth  

### 4.2 Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Editorial headlines | Cormorant Garamond | 300, 400, 400i | H1–H3, project titles, quotes |
| UI + body | Inter | 300, 400, 500 | Nav, paragraphs, buttons, filters |
| Technical data | IBM Plex Mono | 400, 500 | Volume numbers, metadata, labels, technical sheet |

**Scale:**
- H1: 3.5–5rem / Cormorant 300
- H2: 1.8–2.4rem / Cormorant 400
- Body: 1rem / Inter 400 / 1.6 leading
- Mono UI: 0.65–0.75rem / IBM Plex Mono

### 4.3 Layout

- 12-column grid desktop, 4-column tablet, 1-column mobile
- Generous margins: min 5vw desktop, 24px mobile
- Book proportions: 3:4 ratio for covers
- Shelf height: ~280px desktop, scroll horizontal

---

## 5. The Book Interaction — 5-State Flow

### State 1: SHELF
Library page shows books as vertical spines on a horizontal shelf. CSS `perspective` + `preserve-3d`. Motion handles hover: spine separates 4–6px, slight rotation, mini info card appears.

### State 2: EXTRACT
On click: GSAP timeline pulls the book from the shelf.
```
translateY(0) → translateY(32px) → translateY(-200px, center screen)
rotateX(0) → rotateX(-4deg) → rotateX(0)
rotateY(0) → rotateY(3deg) → rotateY(0)
```
Background: remaining books fade to `opacity: 0.3`, `blur(6px)`. Duration: 700ms. Easing: `power3.out`.

### State 3: FOCUSED
Book centered, frontal. Cover visible. Metadata panel fades in beside the book (Motion layout animation). CTA button: "Abrir proyecto".

### State 4: OPENING
On CTA click: GSAP sequence.
1. Cover rotates 30° on Y axis (pages glimpsed)
2. Brief flash of double-page spread: left = chapter index, right = hero image
3. Cover zooms to fill viewport (`scale` + `translate`)
4. Fade out to white

Duration: ~800ms total.

### State 5: PROJECT
Next.js route transition. Project page loads under the fade. Motion reveals index panel on left (sticky). Page scrolls normally from here.

**Mobile adaptation:** No shelf/extraction on mobile. Cards show cover + metadata. Tap → cover expands → fade to project. Same GSAP zoom sequence, no 3D extraction.

**Reduced motion:** `prefers-reduced-motion` → skip States 2–4, use simple fade. GSAP not loaded.

---

## 6. Site Architecture — 9 Pages

### 6.1 `/` — Home
**Blocks:**
1. Hero — full viewport. Claim + subtitle + featured book (Vol.01 Patio) with parallax. CTAs: "Ver proyectos" / "Conocer el estudio"
2. Intro editorial — philosophy text + studio data (founded, city, typologies)
3. Featured library — 4 books in shelf/grid. Same hover as main library
4. Philosophy/Method — 6 steps (Escucha → Concepto → Materia → Proyecto → Obra → Entrega)
5. Services — 7 service cards, numbered, editorial style
6. Journal preview — 3 latest posts
7. Final CTA — "Cuéntanos el próximo volumen de tu espacio"

### 6.2 `/proyectos` — Library
**Three views (toggle):** Button group UI (`<button>` with `aria-pressed`) in top-right of library header. Selected view persists in `sessionStorage`.
- **Estantería** (default): horizontal shelf, 3D spines, full extraction flow
- **Portadas**: 3-column grid of book covers, same hover/click
- **Índice**: editorial list — Vol. N / Title / Category / City / Year

**Filters:** Todos / Residencial / Interiorismo / Reforma / Comercial / Cultural  
**Sort:** Más recientes / Año / Ciudad  
**Search:** simple client-side filter on title + location — `Array.filter()` on the static data array, no external library

**Empty state:** "No hay volúmenes en esta categoría todavía."

### 6.3 `/proyectos/[slug]` — Project Page
**Layout:** sticky index (160px sidebar desktop) + scrollable main content

**7 chapters:**
1. **Concepto** — editorial text ~80 words + atmospheric image + key phrase
2. **Contexto** — location, client brief, previous state, constraints
3. **Proceso** — timeline + sketches/moodboard description + decisions
4. **Materialidad** — material palette grid with textures + descriptions
5. **Planos** — floor plan + section + diagram (Unsplash architectural drawings)
6. **Galería** — narrative sequence of 6–8 images, full-width, with captions
7. **Ficha técnica** — structured table: client, location, year, surface, team, status, photography

**Footer of project:** Related volumes (2) + CTA "¿Empezamos el próximo volumen?"

**Mobile index:** horizontal sticky chips — `Concepto · Contexto · Proceso · …`

### 6.4 `/estudio` — About
Philosophy, values, team (2 fictional people), way of working, founding story.

### 6.5 `/servicios` — Services
7 service cards, each numbered (01–07), with title, short description, deliverables list.

### 6.6 `/proceso` — Process
Interactive 6-step timeline. Each step expands on click/hover with description + image.

### 6.7 `/archivo` — Journal
4 posts. Grid layout. Each has: title, category, date, cover image, excerpt. Full post pages at `/archivo/[slug]`.

**Post titles:**
1. "La luz como primer material"
2. "Travertino, cal y madera: una paleta serena"
3. "Cómo documentamos una reforma integral"
4. "La importancia del umbral en una vivienda"

### 6.8 `/contacto` — Contact
Headline: "Cuéntanos el próximo volumen de tu espacio."  
Form: name, email, project type (select), message. Client-side validation (required fields + email format). Submit uses `mailto:` href constructed from form values — no backend, no API key needed.  
Studio data: address, email, phone (all fictional).

### 6.9 `/privacidad` + `/aviso-legal`
Functional legal pages, minimal styling.

---

## 7. Data Model — TypeScript

```typescript
// src/data/types.ts

export type ProjectCategory = 'residencial' | 'interiorismo' | 'reforma' | 'comercial' | 'cultural'
export type ProjectStatus    = 'construido' | 'en-proceso' | 'concepto'

export interface Material {
  name: string
  description?: string
  colorHex?: string
}

export interface ProjectChapters {
  concepto:     string   // ~80 words editorial
  contexto:     string
  proceso:      string
  materialidad: string
  planos:       string
  galeria:      string
  fichaTecnica: string
}

export interface TechnicalData {
  client?:        string
  location:       string
  year:           number
  surface?:       string
  status:         ProjectStatus
  team?:          string[]
  photography?:   string
  collaborators?: string[]
}

export interface Project {
  id:           string
  slug:         string
  volumeNumber: string       // "01" | "02" …
  title:        string       // single word
  year:         number
  location:     string
  category:     ProjectCategory
  status:       ProjectStatus
  surface?:     string
  featured:     boolean
  spineColor:   string       // hex
  shortDesc:    string       // 1 editorial sentence
  coverPhrase:  string       // quote shown on cover / hero
  chapters:     ProjectChapters
  materials:    Material[]
  technical:    TechnicalData
  coverImage:   string       // Unsplash URL
  heroImage:    string       // Unsplash URL
  gallery:      string[]     // Unsplash URLs, 6–8 items
  related:      string[]     // slugs of 2 related projects
  seoTitle:     string
  seoDesc:      string
}
```

### 7.1 The 6 Projects

| Vol | Slug | Title | Category | City | Surface | Status | Spine |
|-----|------|-------|----------|------|---------|--------|-------|
| 01 | `patio` | Patio | residencial | Madrid | 210 m² | construido | `#C4673A` |
| 02 | `monte` | Monte | residencial | Galicia | 320 m² | construido | `#2C2C2C` |
| 03 | `arco` | Arco | interiorismo | Sevilla | 145 m² | construido | `#8A8880` |
| 04 | `acero` | Acero | comercial | Barcelona | 85 m² | construido | `#111111` |
| 05 | `azulejo` | Azulejo | reforma | Valencia | 95 m² | en-proceso | `#BEBBB5` |
| 06 | `lamina` | Lámina | cultural | Toledo | 480 m² | construido | `#5A4E3C` |

---

## 8. Component System

| Component | Animation | Purpose |
|-----------|-----------|---------|
| `ProjectShelf` | GSAP + CSS 3D | Horizontal shelf with 3D spines |
| `BookSpine` | Motion hover | Individual spine — separates, rotates on hover |
| `BookExtractionSequence` | GSAP timeline | Orchestrates all 5 states |
| `FocusedBook` | Motion layout | Centered book with metadata panel |
| `BookOpenTransition` | GSAP | 30° open → double page → zoom → fade |
| `ProjectBookCard` | Motion | Cover card for grid/portadas view |
| `LibraryFilter` | Motion layout | Filters + view toggle with layout animations |
| `ProjectIndex` | Motion | Sticky chapter navigation with scroll spy |
| `ProjectChapter` | Motion | Scroll-reveal content block |
| `MaterialPalette` | Motion hover | Material grid with texture hover |
| `ImageGallery` | Motion | Narrative photo sequence + lightbox |
| `TechnicalSheet` | — | Structured data table |
| `ProcessTimeline` | Motion | 6-step interactive timeline |
| `ServiceCard` | Motion | Numbered editorial service card |
| `JournalCard` | Motion hover | Blog post preview card |
| `ReducedMotionProvider` | — | Context: detects `prefers-reduced-motion`, provides fallbacks |
| `Header` | Motion | Fixed nav with scroll-shrink behavior |
| `Footer` | — | Editorial footer with social + legal links |

---

## 9. Motion System

### Hover (Motion)
```
BookSpine hover:
  translateX: 0 → -6px (pulls slightly toward user)
  rotateY: 0 → -8deg
  duration: 0.3s / easeOut

ProjectBookCard hover:
  translateY: 0 → -8px
  boxShadow: soft → deep
  duration: 0.25s
```

### Extraction (GSAP)
```
Duration: 700ms / power3.out
Step 1 (0–200ms): spine lifts from shelf top, slight tilt
Step 2 (200–500ms): moves to center, straightens
Step 3 (500–700ms): settles, metadata fades in
```

### Book Opening (GSAP)
```
Duration: 800ms
Step 1 (0–300ms): rotateY 0 → -30deg (cover opens)
Step 2 (300–500ms): double-page spread appears (opacity 0 → 1)
Step 3 (500–800ms): scale 1 → viewport fill, fade to white
```

### Scroll (Motion)
```
Chapter reveal: translateY(24px) opacity(0) → translateY(0) opacity(1)
Duration: 0.6s / easeOut
Trigger: 80% viewport intersection
```

### Reduced Motion Fallbacks
- States 2–4: replaced by `opacity` fade only
- GSAP: not loaded
- Scroll reveals: instant, no translate
- Hover: no transform, color change only

---

## 10. SEO

- Dynamic `generateMetadata` per project page
- JSON-LD: `Organization` on home, `CreativeWork` on project pages
- Sitemap: static `/sitemap.xml`
- OG images: per-page with project cover
- URLs: `/proyectos/patio`, `/proyectos/monte`, etc.

---

## 11. Accessibility

- AA contrast on all text/bg combinations
- Keyboard navigation: all interactive elements focusable
- Focus styles: visible, styled (not browser default)
- `aria-label` on icon buttons and nav
- Alt text on all images (descriptive, not decorative filler)
- Skip nav link
- `prefers-reduced-motion` respected throughout
- No interaction depends on hover alone (all have tap/click equivalents)
- Form labels: explicit `for`/`id` pairing

---

## 12. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Initial JS | < 180 kB |

**Strategies:**
- GSAP loaded dynamically (saves ~60 kB initial)
- `next/image` for all images with `priority` on above-fold only
- Lenis loaded after `DOMContentLoaded`
- Route-based code splitting (App Router default)
- Fonts: `display: swap`, preconnect to Google Fonts

---

## 13. File Structure

```
src/
├── app/
│   ├── layout.tsx              # root: fonts, Lenis, ReducedMotionProvider
│   ├── page.tsx                # Home
│   ├── proyectos/
│   │   ├── page.tsx            # Library
│   │   └── [slug]/page.tsx     # Project detail
│   ├── estudio/page.tsx
│   ├── servicios/page.tsx
│   ├── proceso/page.tsx
│   ├── archivo/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contacto/page.tsx
│   ├── privacidad/page.tsx
│   └── aviso-legal/page.tsx
├── components/
│   ├── layout/                 # Header, Footer
│   ├── library/                # ProjectShelf, BookSpine, BookExtractionSequence,
│   │                           # FocusedBook, BookOpenTransition, ProjectBookCard,
│   │                           # LibraryFilter
│   ├── project/                # ProjectIndex, ProjectChapter, MaterialPalette,
│   │                           # ImageGallery, TechnicalSheet
│   ├── home/                   # HeroSection, IntroEditorial, PhilosophyMethod,
│   │                           # ServicesPreview, JournalPreview, FinalCTA
│   ├── ui/                     # ServiceCard, JournalCard, ProcessTimeline, Button
│   └── providers/              # ReducedMotionProvider, LenisProvider
├── data/
│   ├── types.ts
│   ├── projects.ts             # 6 full project objects
│   ├── services.ts
│   ├── journal.ts
│   └── studio.ts
└── lib/
    ├── gsap.ts                 # dynamic import helper
    └── utils.ts
```
