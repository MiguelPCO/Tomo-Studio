# Tomo Studio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Tomo Studio — a complete fictional architecture portfolio with "projects as books" metaphor: 9 pages, 6 full projects, 3D GSAP book extraction, and editorial Spanish UI.

**Architecture:** Next.js 15 App Router, static TypeScript data in `/src/data/`. Server components for pages; client components for animation. `BookExtractionSequence` client component owns the 5-state book interaction machine (SHELF → EXTRACT → FOCUSED → OPENING → PROJECT). GSAP loaded dynamically (`await import('gsap')`) only on first book click.

**Tech Stack:** Next.js 15, TypeScript strict, Tailwind CSS v4 (`@theme` tokens, no config file), Motion for React (`motion/react`), GSAP (lazy), Lenis smooth scroll (`lenis`), Vitest + React Testing Library.

---

## File Map

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind v4 `@import` + `@theme` color/font tokens |
| `src/app/layout.tsx` | Root layout: Google Fonts, LenisProvider, ReducedMotionProvider |
| `src/app/page.tsx` | Home — 7 sections |
| `src/app/proyectos/page.tsx` | Library — 3 views, filter, search |
| `src/app/proyectos/[slug]/page.tsx` | Project detail — sticky index + 7 chapters |
| `src/app/estudio/page.tsx` | About page |
| `src/app/servicios/page.tsx` | Services page |
| `src/app/proceso/page.tsx` | Process timeline page |
| `src/app/archivo/page.tsx` | Journal grid |
| `src/app/archivo/[slug]/page.tsx` | Journal post |
| `src/app/contacto/page.tsx` | Contact form (mailto) |
| `src/app/privacidad/page.tsx` | Privacy policy |
| `src/app/aviso-legal/page.tsx` | Legal notice |
| `src/app/sitemap.ts` | Static sitemap |
| `src/components/layout/Header.tsx` | Fixed nav, scroll-shrink |
| `src/components/layout/Footer.tsx` | Editorial footer |
| `src/components/providers/ReducedMotionProvider.tsx` | Context: detects prefers-reduced-motion |
| `src/components/providers/LenisProvider.tsx` | Lenis init/destroy |
| `src/components/library/BookSpine.tsx` | Single spine — CSS 3D hover |
| `src/components/library/ProjectShelf.tsx` | Horizontal shelf with perspective |
| `src/components/library/BookExtractionSequence.tsx` | 5-state machine, orchestrates GSAP |
| `src/components/library/FocusedBook.tsx` | Centered book + metadata panel |
| `src/components/library/BookOpenTransition.tsx` | GSAP rotateY + zoom + fade |
| `src/components/library/ProjectBookCard.tsx` | Cover card for grid/portadas view |
| `src/components/library/LibraryFilter.tsx` | Category filter + view toggle + search |
| `src/components/project/ProjectIndex.tsx` | Sticky chapter nav (scroll spy) |
| `src/components/project/ProjectChapter.tsx` | Scroll-reveal chapter block |
| `src/components/project/MaterialPalette.tsx` | Material grid with color swatches |
| `src/components/project/ImageGallery.tsx` | Narrative photo sequence |
| `src/components/project/TechnicalSheet.tsx` | Structured data table |
| `src/components/home/HeroSection.tsx` | Full-viewport hero |
| `src/components/home/IntroEditorial.tsx` | Philosophy text + studio data |
| `src/components/home/FeaturedLibrary.tsx` | 4 books mini-shelf |
| `src/components/home/PhilosophyMethod.tsx` | 6-step method |
| `src/components/home/ServicesPreview.tsx` | Service cards preview |
| `src/components/home/JournalPreview.tsx` | 3 latest journal posts |
| `src/components/home/FinalCTA.tsx` | Full-width CTA |
| `src/components/ui/Button.tsx` | Reusable button variants |
| `src/components/ui/ServiceCard.tsx` | Numbered editorial card |
| `src/components/ui/JournalCard.tsx` | Journal post preview card |
| `src/components/ui/ProcessTimeline.tsx` | Interactive 6-step timeline |
| `src/data/types.ts` | All TypeScript interfaces |
| `src/data/projects.ts` | 6 full project objects |
| `src/data/services.ts` | 7 services |
| `src/data/journal.ts` | 4 journal posts |
| `src/data/studio.ts` | Studio info, team, process steps |
| `src/lib/gsap.ts` | Dynamic GSAP loader |
| `src/lib/utils.ts` | `cn()` class utility |
| `src/lib/filterProjects.ts` | Filter/sort/search logic |
| `src/test/setup.ts` | Vitest + jest-dom setup |
| `vitest.config.ts` | Vitest config |
| `next.config.ts` | Unsplash image domain |

---

## Task 1: Scaffold + Dependencies

**Files:**
- Create: project root (Next.js 15 init)
- Create: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Init Next.js 15 project**

```bash
cd D:\Miguel\Portfolio\miguel-dev-workspace\webs\claude
npx create-next-app@latest bibliotecaarquitectura --typescript --eslint --app --src-dir --import-alias "@/*" --no-tailwind
cd bibliotecaarquitectura
```

- [ ] **Step 2: Install all dependencies**

```bash
pnpm add tailwindcss @tailwindcss/postcss postcss motion gsap lenis
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @types/node
```

- [ ] **Step 3: Create postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 4: Create next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 5: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 6: Create src/test/setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Add vitest script to package.json**

Add to scripts: `"test": "vitest"`, `"test:run": "vitest run"`

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 + Vitest"
```

---

## Task 2: Tailwind v4 Tokens + Global CSS

**Files:**
- Create/Replace: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-cal-blanca: #F8F7F4;
  --color-concrete-light: #E5E3DF;
  --color-concrete-mid: #BEBBB5;
  --color-stone: #8A8880;
  --color-terracotta: #C4673A;
  --color-charcoal: #2C2C2C;
  --color-black-arch: #111111;

  /* Fonts */
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-inter: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Spacing extras */
  --spacing-shelf: 280px;
}

@layer base {
  html {
    background-color: var(--color-cal-blanca);
    color: var(--color-charcoal);
    font-family: var(--font-inter);
  }

  h1, h2, h3 {
    font-family: var(--font-cormorant);
    color: var(--color-black-arch);
  }

  ::selection {
    background-color: var(--color-terracotta);
    color: var(--color-cal-blanca);
  }

  :focus-visible {
    outline: 2px solid var(--color-terracotta);
    outline-offset: 2px;
  }
}

@layer utilities {
  .preserve-3d { transform-style: preserve-3d; }
  .perspective-800 { perspective: 800px; }
  .backface-hidden { backface-visibility: hidden; }
  .font-cormorant { font-family: var(--font-cormorant); }
  .font-mono-arch { font-family: var(--font-mono); }
}
```

- [ ] **Step 2: Verify dev server starts with no CSS errors**

```bash
pnpm dev
```

Expected: compiles with no PostCSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css postcss.config.mjs
git commit -m "feat: Tailwind v4 @theme tokens and global base styles"
```

---

## Task 3: TypeScript Types

**Files:**
- Create: `src/data/types.ts`

- [ ] **Step 1: Write failing type-check test**

Create `src/data/__tests__/types.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import type { Project, Service, JournalPost } from '../types'

describe('types', () => {
  it('Project type has required fields', () => {
    const p: Project = {
      id: '1', slug: 'test', volumeNumber: '01', title: 'Test',
      year: 2025, location: 'Madrid', category: 'residencial',
      status: 'construido', featured: true, spineColor: '#111',
      shortDesc: 'desc', coverPhrase: 'phrase',
      chapters: {
        concepto: '', contexto: '', proceso: '',
        materialidad: '', planos: '', galeria: '', fichaTecnica: ''
      },
      materials: [],
      technical: { location: 'Madrid', year: 2025, status: 'construido' },
      coverImage: 'https://x.com', heroImage: 'https://x.com',
      gallery: [], related: [],
      seoTitle: 'title', seoDesc: 'desc',
    }
    expect(p.slug).toBe('test')
  })
})
```

- [ ] **Step 2: Run test — expect FAIL (types.ts not found)**

```bash
pnpm test:run src/data/__tests__/types.test.ts
```

- [ ] **Step 3: Create src/data/types.ts**

```typescript
export type ProjectCategory = 'residencial' | 'interiorismo' | 'reforma' | 'comercial' | 'cultural'
export type ProjectStatus = 'construido' | 'en-proceso' | 'concepto'

export interface Material {
  name: string
  description?: string
  colorHex?: string
}

export interface ProjectChapters {
  concepto: string
  contexto: string
  proceso: string
  materialidad: string
  planos: string
  galeria: string
  fichaTecnica: string
}

export interface TechnicalData {
  client?: string
  location: string
  year: number
  surface?: string
  status: ProjectStatus
  team?: string[]
  photography?: string
  collaborators?: string[]
}

export interface Project {
  id: string
  slug: string
  volumeNumber: string
  title: string
  year: number
  location: string
  category: ProjectCategory
  status: ProjectStatus
  surface?: string
  featured: boolean
  spineColor: string
  shortDesc: string
  coverPhrase: string
  chapters: ProjectChapters
  materials: Material[]
  technical: TechnicalData
  coverImage: string
  heroImage: string
  gallery: string[]
  related: string[]
  seoTitle: string
  seoDesc: string
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  deliverables: string[]
}

export interface JournalPost {
  id: string
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  coverImage: string
  content: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface StudioData {
  name: string
  tagline: string
  founded: number
  city: string
  email: string
  phone: string
  address: string
  philosophy: string
  team: TeamMember[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  imageUrl: string
}

export type LibraryView = 'estanteria' | 'portadas' | 'indice'
export type SortOption = 'recientes' | 'año' | 'ciudad'
```

- [ ] **Step 4: Run test — expect PASS**

```bash
pnpm test:run src/data/__tests__/types.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/data/__tests__/types.test.ts
git commit -m "feat: TypeScript data model types"
```

---

## Task 4: Static Project Data

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/__tests__/projects.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/data/__tests__/projects.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { projects, getProjectBySlug } from '../projects'

describe('projects data', () => {
  it('has exactly 6 projects', () => {
    expect(projects).toHaveLength(6)
  })

  it('all projects have required fields', () => {
    projects.forEach(p => {
      expect(p.slug).toBeTruthy()
      expect(p.volumeNumber).toMatch(/^\d{2}$/)
      expect(p.spineColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
      expect(p.gallery.length).toBeGreaterThanOrEqual(6)
      expect(p.related).toHaveLength(2)
    })
  })

  it('getProjectBySlug returns correct project', () => {
    const p = getProjectBySlug('patio')
    expect(p?.title).toBe('Patio')
  })

  it('getProjectBySlug returns undefined for unknown slug', () => {
    expect(getProjectBySlug('nonexistent')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
pnpm test:run src/data/__tests__/projects.test.ts
```

- [ ] **Step 3: Create src/data/projects.ts**

```typescript
import type { Project } from './types'

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

export const projects: Project[] = [
  {
    id: '1',
    slug: 'patio',
    volumeNumber: '01',
    title: 'Patio',
    year: 2024,
    location: 'Madrid',
    category: 'residencial',
    status: 'construido',
    surface: '210 m²',
    featured: true,
    spineColor: '#C4673A',
    shortDesc: 'Vivienda unifamiliar en Madrid organizada alrededor de un patio central que distribuye la luz y el movimiento.',
    coverPhrase: 'El vacío como arquitectura. La luz como material.',
    chapters: {
      concepto: 'Una vivienda organizada alrededor del vacío. El patio no es un elemento secundario sino el principio ordenador que distribuye la luz, el aire y el movimiento. Desde cualquier estancia se ve el cielo. La vida se orienta hacia el interior. La calle queda fuera, deliberadamente. El límite entre lo privado y lo colectivo se resuelve con un muro de piedra caliza que filtra sin bloquear.',
      contexto: 'Solar de 380 m² en barrio residencial del norte de Madrid. La familia buscaba desconectar del ruido urbano sin abandonar la ciudad. La vivienda anterior era oscura y fragmentada. El encargo: abrir, conectar, y dar presencia a la naturaleza dentro del solar.',
      proceso: 'El proyecto nació de una premisa: cada estancia principal debe tener contacto visual con el patio. El primer esquema fue un único muro en C que define el perímetro y genera el vacío. A partir de ahí, las estancias se colocaron como volúmenes independientes que respiran entre sí. Los materiales se eligieron por su envejecimiento: piedra, madera y cal.',
      materialidad: 'Piedra caliza de Colmenar para el muro perimetral. Madera de roble europeo en suelos interiores y carpinterías. Cal hidráulica en paramentos interiores. Acero corten en jardineras y pérgola del patio. La paleta es neutra y telúrica, diseñada para que la vegetación sea el color.',
      planos: 'Planta baja organizada en torno al patio central: salón-comedor al sur, cocina al este, estudio al norte. Planta primera: tres dormitorios con orientación al patio. Cubierta plana transitable con zona de contemplación. Sección: doble altura en el salón que conecta visualmente las dos plantas.',
      galeria: 'La secuencia de imágenes recorre el proyecto de afuera hacia adentro: el muro de piedra, la puerta de acceso, el patio al amanecer, el salón con luz cenital, la cocina abierta, los dormitorios, y la cubierta al atardecer.',
      fichaTecnica: 'Proyecto completo de obra nueva con licencia municipal. Estructura de hormigón armado. Instalaciones de climatización por suelo radiante. Certificación energética A.',
    },
    materials: [
      { name: 'Piedra caliza de Colmenar', description: 'Muro perimetral y solado exterior', colorHex: '#C8B99A' },
      { name: 'Roble europeo', description: 'Suelos interiores y carpinterías', colorHex: '#B08850' },
      { name: 'Cal hidráulica blanca', description: 'Paramentos interiores', colorHex: '#F2EEE8' },
      { name: 'Acero corten', description: 'Pérgola y jardineras', colorHex: '#8B4513' },
      { name: 'Vidrio laminado 6+6', description: 'Carpinterías exteriores', colorHex: '#D4E5E8' },
    ],
    technical: {
      client: 'Familia García-Moreno',
      location: 'Madrid, España',
      year: 2024,
      surface: '210 m²',
      status: 'construido',
      team: ['Ana Ruiz (dirección de obra)', 'Luis Ferrán (estructura)'],
      photography: 'Javier Callejas',
    },
    coverImage: UNSPLASH('1600585154340-be6161a56a0c'),
    heroImage: UNSPLASH('1600596542815-ffad4c1539a9'),
    gallery: [
      UNSPLASH('1600585154340-be6161a56a0c'),
      UNSPLASH('1600566753190-17f0baa2a6c3'),
      UNSPLASH('1484154218962-a197022b5858'),
      UNSPLASH('1600210492493-0946911123ea'),
      UNSPLASH('1512917774080-9991f1c4c750'),
      UNSPLASH('1558618666-fcd25c85cd64'),
    ],
    related: ['monte', 'arco'],
    seoTitle: 'Patio — Vol. 01 — Tomo Studio',
    seoDesc: 'Vivienda unifamiliar en Madrid organizada alrededor de un patio central. 210 m², 2024.',
  },
  {
    id: '2',
    slug: 'monte',
    volumeNumber: '02',
    title: 'Monte',
    year: 2023,
    location: 'Galicia',
    category: 'residencial',
    status: 'construido',
    surface: '320 m²',
    featured: true,
    spineColor: '#2C2C2C',
    shortDesc: 'Casa en la ladera gallega donde el zinc, la piedra y la madera dialogan con la niebla permanente del paisaje.',
    coverPhrase: 'La casa que aprende del monte.',
    chapters: {
      concepto: 'Una vivienda que no compite con el paisaje sino que lo recibe. La niebla, la pendiente y la piedra local son materiales tanto como el zinc de la cubierta o la madera interior. El proyecto parte de una sección: la casa se entierra en la ladera para reducir su presencia y ganar masa térmica. Solo la cubierta de zinc emerge como horizonte metálico.',
      contexto: 'Parcela de 4.800 m² en ladera orientada al suroeste, cerca de Pontevedra. Propietario: arquitecto jubilado que quería una casa mínima y precisa. Condicionante principal: el robledal existente no podía tocarse. La casa se implanta entre los árboles como si siempre hubiera estado ahí.',
      proceso: 'Tres meses de visitas al solar antes del primer trazo. El proyecto final es la cuarta versión: las tres anteriores violaban el robledal de maneras distintas. La solución llegó al enterrar la planta baja: el suelo natural se convierte en cubierta verde. La planta superior, donde se vive, emerge como una única pieza de madera y cristal.',
      materialidad: 'Zinc pátina natural para cubierta y fachada norte. Granito local de cantería regional para muros de contención. Madera de castaño gallego en interior y carpinterías. Cubierta ajardinada con flora autóctona. La piedra es la misma que aflora en el monte: no hay diferencia entre el suelo y la casa.',
      planos: 'Planta semisótano: acceso, garaje, almacén, cuarto técnico. Planta baja-emergente: salón-comedor-cocina en espacio único, 4 dormitorios, 2 baños. La sección muestra la relación entre el talud, los muros de contención y la pieza emergente.',
      galeria: 'El reportaje documenta las cuatro estaciones: la niebla de enero, el verde de mayo, la luz dorada de agosto y la hojarasca de noviembre. La casa cambia con el paisaje porque es parte de él.',
      fichaTecnica: 'Estructura mixta: muros de carga de granito + forjado de hormigón + cubierta de madera laminada. Calefacción por biomasa. Agua caliente solar. Certificación energética A+.',
    },
    materials: [
      { name: 'Zinc pátina natural', description: 'Cubierta y fachada norte', colorHex: '#7A7A7A' },
      { name: 'Granito regional', description: 'Muros de contención y exteriores', colorHex: '#9B9189' },
      { name: 'Castaño gallego', description: 'Estructura interior y carpinterías', colorHex: '#8B6914' },
      { name: 'Cubierta verde autóctona', description: 'Sobre planta semisótano', colorHex: '#5A7A3A' },
      { name: 'Vidrio bajo emisivo', description: 'Fachada sur acristalada', colorHex: '#C5D8D8' },
    ],
    technical: {
      client: 'Familia Núñez-Vidal',
      location: 'Pontevedra, Galicia',
      year: 2023,
      surface: '320 m²',
      status: 'construido',
      team: ['Marta Sousa (estructura)', 'Berta Iglesias (paisajismo)'],
      photography: 'Héctor Santos-Díez',
    },
    coverImage: UNSPLASH('1512917774080-9991f1c4c750'),
    heroImage: UNSPLASH('1502005097973-6a7082348e76'),
    gallery: [
      UNSPLASH('1512917774080-9991f1c4c750'),
      UNSPLASH('1502005097973-6a7082348e76'),
      UNSPLASH('1568605114967-8130f3a36994'),
      UNSPLASH('1555041469-149851476f80'),
      UNSPLASH('1567016376408-0b99502b1a44'),
      UNSPLASH('1558618666-fcd25c85cd64'),
    ],
    related: ['patio', 'lamina'],
    seoTitle: 'Monte — Vol. 02 — Tomo Studio',
    seoDesc: 'Casa en ladera gallega de 320 m². Zinc, granito y madera en diálogo con el robledal. 2023.',
  },
  {
    id: '3',
    slug: 'arco',
    volumeNumber: '03',
    title: 'Arco',
    year: 2024,
    location: 'Sevilla',
    category: 'interiorismo',
    status: 'construido',
    surface: '145 m²',
    featured: true,
    spineColor: '#8A8880',
    shortDesc: 'Reforma interior en Sevilla donde los arcos preexistentes definen la transición entre estancias con materiales mediterráneos.',
    coverPhrase: 'El umbral que define el interior.',
    chapters: {
      concepto: 'Una reforma que trabaja con el arco existente como gesto central. En lugar de borrar la historia del espacio, se pone en valor: el umbral define la transición entre estancias. El proyecto no añade, sustrae. Retira capas de intervenciones anteriores para recuperar la geometría original del siglo XIX sevillano. El arco es el protagonista porque siempre lo fue.',
      contexto: 'Piso en el casco histórico de Sevilla, edificio de 1887. La vivienda había sido reformada en los años noventa con resultado desastroso: escayola por todas partes, mármol italiano de baja calidad, puertas de aluminio. El encargo era deshacer cincuenta años de malas decisiones.',
      proceso: 'La obra fue casi arqueológica: demoler con cuidado, registrar, decidir qué conservar. Los arcos aparecieron bajo la escayola en la tercera semana. A partir de ese momento, el proyecto cambió. Ya no era diseñar un interior nuevo: era restaurar el existente y amueblar alrededor de él.',
      materialidad: 'Microcemento pulido en suelos (permite continuidad sin juntas). Cal pigmentada ocre en paramentos, recuperando la tradición andaluza. Carpinterías de madera de nogal diseñadas a medida. Cerámica artesanal de Triana en cocina y baño. El arco restaurado: ladrillo de barro cocido visto, sin revestir.',
      planos: 'Planta antes: 8 estancias sin relación visual entre sí. Planta después: 5 estancias conectadas por los tres arcos principales. El pasillo desaparece: circular por la vivienda es un recorrido entre umbrales.',
      galeria: 'La secuencia fotográfica usa los arcos como marcos: cada encuadre muestra el siguiente espacio. La vivienda se revela progresivamente, como un conjunto de habitaciones que se descubren.',
      fichaTecnica: 'Reforma integral con cambio de instalaciones. Estructura conservada. Suelos de microcemento continuo. Rehabilitación de elementos singulares (arcos, molduras, carpinterías). Duración de obra: 8 meses.',
    },
    materials: [
      { name: 'Microcemento pulido', description: 'Suelos continuos en toda la vivienda', colorHex: '#C8C0B0' },
      { name: 'Cal pigmentada ocre', description: 'Paramentos interiores', colorHex: '#D4AA7D' },
      { name: 'Ladrillo de barro cocido', description: 'Arcos restaurados vistos', colorHex: '#B5602A' },
      { name: 'Nogal europeo', description: 'Carpinterías y muebles a medida', colorHex: '#6B4226' },
      { name: 'Cerámica de Triana', description: 'Cocina y baño principal', colorHex: '#4A7C7C' },
    ],
    technical: {
      client: 'Carlos y Elena Romero',
      location: 'Sevilla, España',
      year: 2024,
      surface: '145 m²',
      status: 'construido',
      team: ['Pilar Cano (aparejadora)', 'Artesanos Triana (cerámica)'],
      photography: 'Fernando Guerra',
    },
    coverImage: UNSPLASH('1586023492125-27b2a87a1a02'),
    heroImage: UNSPLASH('1555041469-149851476f80'),
    gallery: [
      UNSPLASH('1586023492125-27b2a87a1a02'),
      UNSPLASH('1555041469-149851476f80'),
      UNSPLASH('1484154218962-a197022b5858'),
      UNSPLASH('1600566753190-17f0baa2a6c3'),
      UNSPLASH('1600596542815-ffad4c1539a9'),
      UNSPLASH('1567016376408-0b99502b1a44'),
    ],
    related: ['patio', 'azulejo'],
    seoTitle: 'Arco — Vol. 03 — Tomo Studio',
    seoDesc: 'Reforma de 145 m² en el casco histórico de Sevilla. Arcos del XIX restaurados, cal y cerámica de Triana. 2024.',
  },
  {
    id: '4',
    slug: 'acero',
    volumeNumber: '04',
    title: 'Acero',
    year: 2023,
    location: 'Barcelona',
    category: 'comercial',
    status: 'construido',
    surface: '85 m²',
    featured: false,
    spineColor: '#111111',
    shortDesc: 'Estudio de diseño en Barcelona que exhibe su estructura metálica como argumento estético y productivo.',
    coverPhrase: 'Honesto. Preciso. Presente.',
    chapters: {
      concepto: 'Un estudio de diseño que no esconde su condición de lugar de trabajo. El acero visto, los cables, las estanterías industriales y la planta diáfana son a la vez programa y argumento. No hay separación entre la imagen del estudio y su funcionamiento: lo que ves es lo que pasa aquí. La honestidad constructiva como posición estética.',
      contexto: 'Local de 85 m² en el barrio del Poblenou de Barcelona, zona de reconversión industrial. Anterior uso: almacén. El cliente (estudio de diseño de producto) quería un espacio que reflejara su metodología: eficiente, directo, sin ornamento. Presupuesto ajustado: 120.000 €.',
      proceso: 'El proyecto se resolvió en dos semanas de diseño y cuatro meses de obra. El catálogo de materiales: acero, vidrio, hormigón pulido, madera de abeto. Todo estructural, nada decorativo. La mayor decisión de diseño fue no tomar ninguna decisión decorativa: dejar que los materiales hablasen.',
      materialidad: 'Perfiles IPE de acero laminado en caliente para estructura vista. Hormigón pulido en suelo (el propio forjado existente, lijado y tratado). Vidrio templado de 12mm en la partición del despacho principal. Madera de abeto en estantería modular. Pintura negra solo en las instalaciones vistas.',
      planos: 'Planta diáfana con tres zonas: trabajo colectivo (centro), despacho acristalado (fondo), área de maquetas y materiales (lateral). Sin tabiquería. La jerarquía espacial se define por los perfiles metálicos, no por los muros.',
      galeria: 'El espacio fotografiado vacío y en uso. La diferencia es mínima: los objetos de trabajo son parte del diseño. Las maquetas sobre la mesa, los planos colgados, los materiales ordenados.',
      fichaTecnica: 'Reforma de local comercial con cambio de uso a oficina. Licencia de actividad incluida. Estructura metálica nueva sobre forjado existente. Instalaciones vistas. Duración: 4 meses.',
    },
    materials: [
      { name: 'Acero laminado en caliente', description: 'Estructura vista, IPE 160', colorHex: '#5A5A5A' },
      { name: 'Hormigón pulido', description: 'Suelo existente tratado', colorHex: '#9A9590' },
      { name: 'Vidrio templado 12mm', description: 'Partición despacho', colorHex: '#CBD8D8' },
      { name: 'Abeto natural', description: 'Estantería modular', colorHex: '#C8A060' },
      { name: 'Pintura negra mate', description: 'Instalaciones y perfilería secundaria', colorHex: '#1A1A1A' },
    ],
    technical: {
      client: 'Estudio FORM Barcelona',
      location: 'Poblenou, Barcelona',
      year: 2023,
      surface: '85 m²',
      status: 'construido',
      team: ['Jordi Mas (estructura metálica)'],
      photography: 'Adrià Goula',
    },
    coverImage: UNSPLASH('1504307651254-35680f356dfd'),
    heroImage: UNSPLASH('1600210492493-0946911123ea'),
    gallery: [
      UNSPLASH('1504307651254-35680f356dfd'),
      UNSPLASH('1600210492493-0946911123ea'),
      UNSPLASH('1502005097973-6a7082348e76'),
      UNSPLASH('1512917774080-9991f1c4c750'),
      UNSPLASH('1558618666-fcd25c85cd64'),
      UNSPLASH('1568605114967-8130f3a36994'),
    ],
    related: ['lamina', 'monte'],
    seoTitle: 'Acero — Vol. 04 — Tomo Studio',
    seoDesc: 'Estudio de diseño de 85 m² en Poblenou, Barcelona. Acero visto, planta diáfana, honestidad constructiva. 2023.',
  },
  {
    id: '5',
    slug: 'azulejo',
    volumeNumber: '05',
    title: 'Azulejo',
    year: 2025,
    location: 'Valencia',
    category: 'reforma',
    status: 'en-proceso',
    surface: '95 m²',
    featured: false,
    spineColor: '#BEBBB5',
    shortDesc: 'Reforma del Ensanche valenciano que recupera el azulejo como material de identidad contemporánea, actualmente en obra.',
    coverPhrase: 'La memoria del lugar hecha materia.',
    chapters: {
      concepto: 'Una reforma en el Ensanche de Valencia que no imita el pasado sino que lo reinterpreta. El azulejo valenciano, presente en el edificio desde 1924, se convierte en el hilo conductor de la intervención. No se restaura el original: se diseña uno nuevo que dialoga con él en clave contemporánea. La paleta es la misma, el lenguaje es otro.',
      contexto: 'Vivienda de 95 m² en planta quinta de edificio modernista del Ensanche. Propietarios jóvenes que quieren vivir en el centro histórico sin renunciar a la comodidad contemporánea. El edificio tiene azulejos originales en la fachada y en la escalera. El interior fue vaciado en una reforma de los años ochenta.',
      proceso: 'El proyecto está actualmente en fase de obra. Los azulejos nuevos se están fabricando en un taller artesanal de Manises siguiendo el diseño específico de este proyecto. Apertura prevista: septiembre 2025. Este volumen se actualizará con el reportaje fotográfico final.',
      materialidad: 'Azulejo artesanal de Manises (diseño exclusivo para el proyecto). Microcemento en zonas húmedas. Madera de chopo en carpinterías interiores. Cal blanca en paramentos. La clave: el azulejo no es decoración, es estructura del espacio: define los límites entre cocina y salón, separa el baño, enmarca las ventanas.',
      planos: 'Planta con distribución abierta: cocina integrada en el salón, separada por un frente de azulejos de 2,4m de altura. Dos dormitorios, un baño con ducha de obra. Terraza interior ampliada.',
      galeria: 'Documentación de proceso: los azulejos en el taller de Manises, la obra en curso, los primeros metros instalados. El reportaje final se incorporará en septiembre 2025.',
      fichaTecnica: 'Reforma integral en curso. Licencia de obras concedida. Empresa constructora: Reformas Levante. Previsión de entrega: septiembre 2025.',
    },
    materials: [
      { name: 'Azulejo artesanal Manises', description: 'Diseño exclusivo, fabricación en curso', colorHex: '#6B9BAA' },
      { name: 'Microcemento gris perla', description: 'Suelos y zonas húmedas', colorHex: '#B8B4AE' },
      { name: 'Chopo natural', description: 'Carpinterías interiores', colorHex: '#C8A87A' },
      { name: 'Cal blanca', description: 'Paramentos interiores', colorHex: '#F4F0EB' },
      { name: 'Latón mate', description: 'Grifería y herrajes', colorHex: '#C8A84A' },
    ],
    technical: {
      client: 'Pareja Sanz-Pérez',
      location: 'Ensanche, Valencia',
      year: 2025,
      surface: '95 m²',
      status: 'en-proceso',
      team: ['Reformas Levante (constructora)', 'Taller Azulejos Manises'],
    },
    coverImage: UNSPLASH('1570129477492-45c003edd2be'),
    heroImage: UNSPLASH('1567016376408-0b99502b1a44'),
    gallery: [
      UNSPLASH('1570129477492-45c003edd2be'),
      UNSPLASH('1567016376408-0b99502b1a44'),
      UNSPLASH('1484154218962-a197022b5858'),
      UNSPLASH('1600566753190-17f0baa2a6c3'),
      UNSPLASH('1600585154340-be6161a56a0c'),
      UNSPLASH('1512917774080-9991f1c4c750'),
    ],
    related: ['arco', 'patio'],
    seoTitle: 'Azulejo — Vol. 05 — Tomo Studio',
    seoDesc: 'Reforma de 95 m² en el Ensanche de Valencia. Azulejo artesanal de Manises como material protagonista. En proceso, 2025.',
  },
  {
    id: '6',
    slug: 'lamina',
    volumeNumber: '06',
    title: 'Lámina',
    year: 2022,
    location: 'Toledo',
    category: 'cultural',
    status: 'construido',
    surface: '480 m²',
    featured: true,
    spineColor: '#5A4E3C',
    shortDesc: 'Centro de interpretación en Toledo cuya cubierta plana flota sobre el paisaje sin interrumpirlo.',
    coverPhrase: 'Quieto sobre el paisaje.',
    chapters: {
      concepto: 'Un centro de interpretación que descansa sobre el paisaje en lugar de interrumpirlo. La cubierta horizontal, la lámina de hormigón, define el proyecto desde el exterior. Vista desde la distancia, solo se ve el horizonte y una línea fina que lo duplica. Por dentro, el espacio es oscuro, fresco y quieto: antesala del paisaje que se descubre al salir.',
      contexto: 'Encargo de la Diputación de Toledo para un centro de interpretación del paisaje castellano en la comarca de La Mancha. Solar de 12.000 m² en paraje natural. Condicionante: el edificio no puede superar los 6 metros de altura y debe ser reversible. Vista desde el Camino de Santiago que lo bordea.',
      proceso: 'El proceso fue de sustracción: empezamos con un prisma y fuimos eliminando. La forma final (una lámina de 480 m² sobre 8 pilares perimetrales) emergió de los condicionantes, no de una imagen preconcebida. El voladizo de 4 metros en fachada sur crea la sombra necesaria sin necesidad de elementos adicionales.',
      materialidad: 'Hormigón blanco visto (árido de caliza local) en la lámina de cubierta. Muros de carga de piedra caliza de la zona para el perímetro. Suelo continuo de cal compactada. Carpinterías de acero corten que envejecerán hacia el color de la tierra. El edificio desaparecerá visualmente en 20 años.',
      planos: 'Planta rectangular de 24×20m. Ocho pilares perimetrales libres de muros. Interior: sala de exposición permanente, sala temporal, área educativa, almacén, servicios. La planta es casi libre: los únicos elementos fijos son el núcleo de servicios y los dos huecos de luz cenital.',
      galeria: 'El reportaje usa la luz de Toledo: el alba, el mediodía y el ocaso en el mismo punto. El edificio no cambia, cambia la luz. Las fotografías interiores se tomaron en oscuridad total y con una sola linterna: así es como la curatoria quiere que se experimente.',
      fichaTecnica: 'Concurso público de la Diputación de Toledo. Proyecto ganador entre 47 propuestas. Estructura de hormigón pretensado. Instalaciones enterradas. Premio de Arquitectura de Castilla-La Mancha 2022.',
    },
    materials: [
      { name: 'Hormigón blanco visto', description: 'Lámina de cubierta y pilares', colorHex: '#E8E4DC' },
      { name: 'Piedra caliza local', description: 'Muros de perímetro', colorHex: '#C8BC9C' },
      { name: 'Cal compactada', description: 'Suelo interior continuo', colorHex: '#D4CEC4' },
      { name: 'Acero corten', description: 'Carpinterías exteriores', colorHex: '#8B5A2B' },
      { name: 'Vidrio serigrafiado', description: 'Lucernarios cenitales', colorHex: '#B8C8C4' },
    ],
    technical: {
      client: 'Diputación Provincial de Toledo',
      location: 'La Mancha, Toledo',
      year: 2022,
      surface: '480 m²',
      status: 'construido',
      team: ['Ingeniería Cero (estructura)', 'Luz y Paisaje (paisajismo)', 'Rafael Moneo Vallés (asesoría)'],
      photography: 'Roland Halbe',
      collaborators: ['Diputación de Toledo', 'Junta de Castilla-La Mancha'],
    },
    coverImage: UNSPLASH('1506905925346-21bda4d32df4'),
    heroImage: UNSPLASH('1523217582562-09d05ab03f0d'),
    gallery: [
      UNSPLASH('1506905925346-21bda4d32df4'),
      UNSPLASH('1523217582562-09d05ab03f0d'),
      UNSPLASH('1600210492493-0946911123ea'),
      UNSPLASH('1502005097973-6a7082348e76'),
      UNSPLASH('1504307651254-35680f356dfd'),
      UNSPLASH('1568605114967-8130f3a36994'),
      UNSPLASH('1512917774080-9991f1c4c750'),
    ],
    related: ['acero', 'monte'],
    seoTitle: 'Lámina — Vol. 06 — Tomo Studio',
    seoDesc: 'Centro de interpretación de 480 m² en La Mancha, Toledo. Cubierta plana que flota sobre el paisaje. Premio 2022.',
  },
]

export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug)
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm test:run src/data/__tests__/projects.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/data/__tests__/projects.test.ts
git commit -m "feat: static data for 6 architecture projects"
```

---

## Task 5: Services, Journal, Studio Data

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/journal.ts`
- Create: `src/data/studio.ts`

- [ ] **Step 1: Create src/data/services.ts**

```typescript
import type { Service } from './types'

export const services: Service[] = [
  {
    id: '1', number: '01',
    title: 'Proyecto de arquitectura',
    description: 'Diseño completo de viviendas, edificios y espacios de obra nueva. Desde el primer esquema hasta la dirección de obra.',
    deliverables: ['Anteproyecto', 'Proyecto básico', 'Proyecto de ejecución', 'Dirección de obra', 'Certificado final de obra'],
  },
  {
    id: '2', number: '02',
    title: 'Reforma integral',
    description: 'Intervención en edificios existentes con respeto por la preexistencia y claridad en las decisiones nuevas.',
    deliverables: ['Levantamiento del estado actual', 'Proyecto de reforma', 'Gestión de licencias', 'Coordinación de industriales'],
  },
  {
    id: '3', number: '03',
    title: 'Interiorismo',
    description: 'Diseño de interiores donde los materiales, la luz y el mobiliario forman un todo coherente.',
    deliverables: ['Diseño de espacios', 'Selección de materiales', 'Muebles a medida', 'Coordinación de instalaciones'],
  },
  {
    id: '4', number: '04',
    title: 'Espacios comerciales',
    description: 'Locales, oficinas y espacios de trabajo que comunican la identidad del negocio con precisión.',
    deliverables: ['Concepto de marca espacial', 'Proyecto ejecutivo', 'Coordinación de obra'],
  },
  {
    id: '5', number: '05',
    title: 'Arquitectura cultural',
    description: 'Equipamientos públicos y culturales donde el programa y el paisaje se convierten en argumento.',
    deliverables: ['Concursos', 'Anteproyecto', 'Proyecto completo', 'Colaboración con ingeniería'],
  },
  {
    id: '6', number: '06',
    title: 'Consultoría de materiales',
    description: 'Asesoramiento en la selección de materiales para proyectos propios o de terceros. La paleta como primera decisión de proyecto.',
    deliverables: ['Análisis de viabilidad', 'Propuesta de paleta', 'Fichas técnicas', 'Contacto con proveedores'],
  },
  {
    id: '7', number: '07',
    title: 'Documentación de obra',
    description: 'Registro fotográfico, textual y gráfico del proceso de construcción para archivo o publicación.',
    deliverables: ['Reportaje fotográfico', 'Textos de proyecto', 'Plantas y secciones para publicación'],
  },
]
```

- [ ] **Step 2: Create src/data/journal.ts**

```typescript
import type { JournalPost } from './types'

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const journalPosts: JournalPost[] = [
  {
    id: '1',
    slug: 'la-luz-como-primer-material',
    title: 'La luz como primer material',
    category: 'Reflexión',
    date: '2024-11-15',
    excerpt: 'Antes de elegir la piedra o la madera, antes de trazar el primer plano, existe una decisión que lo condiciona todo: ¿de dónde viene la luz?',
    coverImage: UNSPLASH('1484154218962-a197022b5858'),
    content: `Antes de elegir la piedra o la madera, antes de trazar el primer plano, existe una decisión que lo condiciona todo: ¿de dónde viene la luz?

En Tomo Studio llevamos años pensando la luz no como consecuencia del proyecto sino como su primera materia prima. Una estancia con luz norte tiene una temperatura diferente a una con luz sur. Una cocina que recibe la luz de la tarde tiene otro ritmo que una que la recibe por la mañana.

Cuando visitamos un solar por primera vez, antes de medir, hacemos algo simple: miramos el cielo. La dirección, la altura del sol en cada estación, los obstáculos, las reflexiones posibles. Ese primer análisis determina las decisiones posteriores con más fuerza que cualquier condicionante normativo.

La luz no es un recurso decorativo. Es el material con el que trabajamos cuando todavía no hemos puesto ningún ladrillo.`,
  },
  {
    id: '2',
    slug: 'travertino-cal-madera-paleta-serena',
    title: 'Travertino, cal y madera: una paleta serena',
    category: 'Materiales',
    date: '2024-09-03',
    excerpt: 'Tres materiales que el tiempo trata bien, que envejecen con gracia y que juntos crean una atmósfera difícil de fabricar con sintéticos.',
    coverImage: UNSPLASH('1600566753190-17f0baa2a6c3'),
    content: `Hay combinaciones de materiales que son atemporales no por convención sino por física: sus texturas se complementan, sus temperaturas se equilibran, sus patinas convergen hacia la misma gama.

Travertino, cal y madera es una de esas combinaciones. El travertino aporta peso y patrón; la cal, uniformidad y reflexión de la luz; la madera, calidez y escala humana. Los tres envejecen bien —el travertino gana pátina, la cal se asienta, la madera oscurece— y el paso del tiempo los hace más coherentes, no menos.

En nuestros proyectos hemos usado esta combinación en contextos muy distintos: en una vivienda madrileña, en una reforma sevillana, en un apartamento costero. En todos los casos, la reacción de los clientes al cabo de un año es la misma: se sienten más a gusto que el primer día. No es nostalgia. Es que los materiales se han integrado en su vida.

La paleta serena no es una tendencia estética. Es una consecuencia de elegir bien los materiales desde el principio.`,
  },
  {
    id: '3',
    slug: 'como-documentamos-una-reforma-integral',
    title: 'Cómo documentamos una reforma integral',
    category: 'Proceso',
    date: '2024-06-20',
    excerpt: 'El antes y el después es la forma más fácil de contar una reforma. También es la más pobre. Hay una manera mejor de documentar el proceso.',
    coverImage: UNSPLASH('1600596542815-ffad4c1539a9'),
    content: `El antes y el después es la narrativa más usada para comunicar una reforma. También es la más limitada: elimina todo el proceso, toda la decisión, todo el conflicto resuelto.

En Tomo Studio documentamos las reformas en tres fases que consideramos igual de importantes.

**El estado previo** no es solo un registro fotográfico. Es un análisis: qué hay que conservar, qué hay que eliminar y por qué. En la reforma Arco, el descubrimiento de los arcos bajo la escayola no fue un accidente: fue el resultado de una investigación previa sobre la historia del edificio.

**El proceso de obra** nos interesa especialmente. Las decisiones que se toman en obra, los cambios de última hora, los problemas que obligan a improvisar. Esa tensión entre el proyecto dibujado y el proyecto construido es donde ocurre la arquitectura de verdad.

**El resultado final** se fotografía siempre con luz natural y sin muebles de atrezzo. Lo que ves es el espacio tal como será habitado, no una puesta en escena para una revista.`,
  },
  {
    id: '4',
    slug: 'la-importancia-del-umbral-en-una-vivienda',
    title: 'La importancia del umbral en una vivienda',
    category: 'Reflexión',
    date: '2024-04-08',
    excerpt: 'El umbral es la pieza más olvidada de la arquitectura doméstica contemporánea. Y es la que más condiciona cómo vivimos.',
    coverImage: UNSPLASH('1586023492125-27b2a87a1a02'),
    content: `El umbral es la transición entre dos estados: el interior y el exterior, lo privado y lo público, el trabajo y el descanso. En la arquitectura doméstica contemporánea, el umbral ha desaparecido. Las viviendas modernas abren la puerta directamente al salón, sin pausa, sin transición.

Esto tiene consecuencias psicológicas que raramente se mencionan. Sin umbral, la calle entra en casa. Sin transición, el cuerpo no tiene tiempo de cambiar de registro. El umbral no es un problema de metros cuadrados: es una cuestión de milisegundos.

En el proyecto Arco, trabajamos explícitamente con los umbrales: los tres arcos preexistentes se convirtieron en transiciones ritualizadas entre estancias. Cruzar un arco es distinto a cruzar una puerta: el arco no tiene hoja, no tiene bisagra, no bloquea. Pero su presencia cambia el estado del que lo atraviesa.

Pensamos que recuperar el umbral —en sus múltiples formas— es una de las contribuciones más importantes que puede hacer la arquitectura doméstica a la calidad de vida.`,
  },
]

export const getPostBySlug = (slug: string) => journalPosts.find(p => p.slug === slug)
```

- [ ] **Step 3: Create src/data/studio.ts**

```typescript
import type { StudioData, ProcessStep } from './types'

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

export const studio: StudioData = {
  name: 'Tomo Studio',
  tagline: 'Cada proyecto merece su propio volumen.',
  founded: 2018,
  city: 'Madrid',
  email: 'hola@tomostudio.es',
  phone: '+34 91 123 45 67',
  address: 'Calle del Pez 21, 2º izq. 28004 Madrid',
  philosophy: 'Hacemos arquitectura desde la escucha. Cada proyecto comienza con una conversación larga, muchas visitas al lugar y un período de silencio en el que dejamos que el problema se sedimente. La forma llega cuando el programa, el lugar y el cliente son ya inseparables.',
  team: [
    {
      name: 'Carmen Vidal',
      role: 'Arquitecta fundadora',
      bio: 'Arquitecta por la ETSAM y máster en Patrimonio por la Universidad de Venecia. Antes de fundar Tomo Studio trabajó seis años en Portugal con Eduardo Souto de Moura. Le interesan los proyectos donde la preexistencia y lo nuevo se tratan con el mismo respeto.',
    },
    {
      name: 'Pablo Ortega',
      role: 'Arquitecto asociado',
      bio: 'Arquitecto por la ETSAB y máster en Paisajismo. Ha colaborado con estudios en Rotterdam y Copenhague. En Tomo Studio dirige los proyectos de mayor escala y los trabajos de exterior. Cree que el paisaje es el interior que más descuidamos.',
    },
  ],
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Escucha',
    description: 'El primer mes no dibujamos. Escuchamos. Visitamos el lugar varias veces, a distintas horas y estaciones. Hablamos con el cliente sobre su vida, no sobre su vivienda. El programa emerge de esa conversación, no de un cuestionario.',
    imageUrl: UNSPLASH('1484154218962-a197022b5858'),
  },
  {
    number: '02',
    title: 'Concepto',
    description: 'Un concepto es una frase. No una imagen, no un estilo: una frase que resume lo que el proyecto quiere ser. "La casa que aprende del monte." "El vacío como arquitectura." Sin esa frase, el proyecto pierde el norte en los momentos difíciles.',
    imageUrl: UNSPLASH('1600566753190-17f0baa2a6c3'),
  },
  {
    number: '03',
    title: 'Materia',
    description: 'Los materiales se eligen antes de dibujar los planos definitivos. La materialidad no es un acabado: es una decisión estructural que condiciona la forma, la luz y el presupuesto. Un proyecto de cal y piedra no se dibuja igual que uno de acero y vidrio.',
    imageUrl: UNSPLASH('1600585154340-be6161a56a0c'),
  },
  {
    number: '04',
    title: 'Proyecto',
    description: 'El proyecto de ejecución es la última etapa antes de la obra. En Tomo Studio, los detalles constructivos no son trámite: son el lugar donde la arquitectura se decide. Un encuentro entre materiales bien resuelto puede hacer o deshacer un espacio.',
    imageUrl: UNSPLASH('1512917774080-9991f1c4c750'),
  },
  {
    number: '05',
    title: 'Obra',
    description: 'La obra es el momento de la verdad. Visitamos la obra tres veces por semana, mínimo. No para controlar: para aprender. Las sorpresas de la obra —la grieta que aparece, el muro que no es donde debería— son información sobre el edificio que no había llegado al proyecto.',
    imageUrl: UNSPLASH('1558618666-fcd25c85cd64'),
  },
  {
    number: '06',
    title: 'Entrega',
    description: 'La entrega no es el final del proyecto sino el inicio de su vida. Visitamos el espacio a los seis meses y al año de la entrega. Queremos saber cómo envejece, qué funciona, qué cambiaríamos. Esas visitas alimentan el siguiente proyecto.',
    imageUrl: UNSPLASH('1600596542815-ffad4c1539a9'),
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/services.ts src/data/journal.ts src/data/studio.ts
git commit -m "feat: services, journal and studio static data"
```

---

## Task 6: Lib Utilities

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/gsap.ts`
- Create: `src/lib/filterProjects.ts`
- Create: `src/lib/__tests__/filterProjects.test.ts`

- [ ] **Step 1: Write failing tests for filterProjects**

Create `src/lib/__tests__/filterProjects.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { filterProjects, sortProjects } from '../filterProjects'
import { projects } from '@/data/projects'

describe('filterProjects', () => {
  it('returns all projects when category is "todos"', () => {
    expect(filterProjects(projects, 'todos', '')).toHaveLength(6)
  })

  it('filters by category', () => {
    const result = filterProjects(projects, 'residencial', '')
    expect(result.every(p => p.category === 'residencial')).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('filters by search query (title)', () => {
    const result = filterProjects(projects, 'todos', 'Patio')
    expect(result.some(p => p.slug === 'patio')).toBe(true)
  })

  it('filters by search query (location)', () => {
    const result = filterProjects(projects, 'todos', 'sevilla')
    expect(result.some(p => p.slug === 'arco')).toBe(true)
  })

  it('returns empty array when no match', () => {
    expect(filterProjects(projects, 'todos', 'xyzabc')).toHaveLength(0)
  })
})

describe('sortProjects', () => {
  it('sorts by year descending (recientes)', () => {
    const sorted = sortProjects(projects, 'recientes')
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].year).toBeGreaterThanOrEqual(sorted[i + 1].year)
    }
  })

  it('sorts by city alphabetically', () => {
    const sorted = sortProjects(projects, 'ciudad')
    const cities = sorted.map(p => p.location)
    expect(cities).toEqual([...cities].sort())
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
pnpm test:run src/lib/__tests__/filterProjects.test.ts
```

- [ ] **Step 3: Create src/lib/utils.ts**

```typescript
type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return (inputs as unknown[])
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
}
```

- [ ] **Step 4: Create src/lib/gsap.ts**

```typescript
let gsapInstance: typeof import('gsap')['gsap'] | null = null

export async function loadGsap() {
  if (gsapInstance) return gsapInstance
  const { gsap } = await import('gsap')
  gsapInstance = gsap
  return gsap
}
```

- [ ] **Step 5: Create src/lib/filterProjects.ts**

```typescript
import type { Project, ProjectCategory, SortOption } from '@/data/types'

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | 'todos',
  query: string
): Project[] {
  const q = query.toLowerCase().trim()
  return projects.filter(p => {
    const categoryMatch = category === 'todos' || p.category === category
    const searchMatch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q)
    return categoryMatch && searchMatch
  })
}

export function sortProjects(projects: Project[], sort: SortOption): Project[] {
  const arr = [...projects]
  if (sort === 'recientes') return arr.sort((a, b) => b.year - a.year)
  if (sort === 'año') return arr.sort((a, b) => a.year - b.year)
  if (sort === 'ciudad') return arr.sort((a, b) => a.location.localeCompare(b.location))
  return arr
}
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
pnpm test:run src/lib/__tests__/filterProjects.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/ 
git commit -m "feat: lib utilities — cn, GSAP loader, filterProjects"
```

---

## Task 7: Providers

**Files:**
- Create: `src/components/providers/ReducedMotionProvider.tsx`
- Create: `src/components/providers/LenisProvider.tsx`

- [ ] **Step 1: Create ReducedMotionProvider.tsx**

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ReducedMotionContext = createContext(false)

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

export const useReducedMotion = () => useContext(ReducedMotionContext)
```

- [ ] **Step 2: Create LenisProvider.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/providers/
git commit -m "feat: ReducedMotionProvider and LenisProvider"
```

---

## Task 8: Root Layout + Fonts

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from 'next/font/google'
import { ReducedMotionProvider } from '@/components/providers/ReducedMotionProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tomo Studio — Arquitectura de autor',
  description: 'Estudio de arquitectura con sede en Madrid. Cada proyecto merece su propio volumen.',
  metadataBase: new URL('https://tomostudio.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tomo Studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <ReducedMotionProvider>
          <LenisProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta focus:text-cal-blanca">
              Saltar al contenido
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </LenisProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with fonts, providers, skip-nav"
```

---

## Task 9: Header Component

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Create Header.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/estudio', label: 'Estudio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/proceso', label: 'Proceso' },
  { href: '/archivo', label: 'Archivo' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-[#111111] shadow-lg' : 'py-5 bg-[#111111]'
      )}
      role="banner"
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-cormorant text-xl font-light text-[#F8F7F4] tracking-wide hover:text-[#C4673A] transition-colors"
          aria-label="Tomo Studio — Inicio"
        >
          Tomo Studio
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-mono-arch text-[0.65rem] tracking-[0.12em] uppercase transition-colors',
                pathname.startsWith(link.href)
                  ? 'text-[#F8F7F4]'
                  : 'text-[#8A8880] hover:text-[#F8F7F4]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#8A8880] hover:text-[#F8F7F4] transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="font-mono-arch text-[0.65rem] tracking-[0.12em] uppercase">
            {menuOpen ? 'Cerrar' : 'Menú'}
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="md:hidden bg-[#111111] border-t border-[#2C2C2C] px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'font-mono-arch text-[0.7rem] tracking-[0.12em] uppercase block py-1',
                    pathname.startsWith(link.href)
                      ? 'text-[#F8F7F4]'
                      : 'text-[#8A8880]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: Header with scroll-shrink and mobile menu"
```

---

## Task 10: Footer + Button

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
import Link from 'next/link'
import { studio } from '@/data/studio'

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#8A8880] pt-16 pb-8" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-cormorant text-2xl font-light text-[#F8F7F4] mb-3">
              Tomo Studio
            </p>
            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] leading-relaxed">
              {studio.address}
            </p>
            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] mt-2">
              <a href={`mailto:${studio.email}`} className="hover:text-[#F8F7F4] transition-colors">
                {studio.email}
              </a>
            </p>
          </div>

          <nav aria-label="Navegación secundaria">
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] uppercase text-[#5A5A5A] mb-4">
              Navegación
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/proyectos', label: 'Proyectos' },
                { href: '/estudio', label: 'Estudio' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/proceso', label: 'Proceso' },
                { href: '/archivo', label: 'Archivo' },
                { href: '/contacto', label: 'Contacto' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] uppercase text-[#5A5A5A] mb-4">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/privacidad" className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors">
                  Aviso legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2C2C2C] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.1em]">
            © {new Date().getFullYear()} Tomo Studio. Todos los derechos reservados.
          </p>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.1em]">
            Madrid — {studio.founded}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create Button.tsx**

```tsx
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base = 'inline-flex items-center font-mono-arch text-[0.65rem] tracking-[0.1em] uppercase transition-all duration-200 px-5 py-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[#C4673A] text-[#F8F7F4] hover:bg-[#B35A30]',
    secondary: 'border border-[#C4673A] text-[#C4673A] hover:bg-[#C4673A] hover:text-[#F8F7F4]',
    ghost: 'text-[#8A8880] hover:text-[#111111]',
  }

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/ui/Button.tsx
git commit -m "feat: Footer and Button components"
```

---

## Task 11: BookSpine Component (CSS 3D)

**Files:**
- Create: `src/components/library/BookSpine.tsx`

- [ ] **Step 1: Create BookSpine.tsx**

```tsx
'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'

interface BookSpineProps {
  project: Project
  onExtract: (project: Project, el: HTMLElement) => void
  dimmed?: boolean
}

export default function BookSpine({ project, onExtract, dimmed = false }: BookSpineProps) {
  const reduced = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onExtract(project, e.currentTarget)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative flex-shrink-0 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-[#C4673A]',
        'preserve-3d transition-opacity duration-300',
        dimmed ? 'opacity-30' : 'opacity-100'
      )}
      style={{
        width: '36px',
        height: '220px',
        backgroundColor: project.spineColor,
      }}
      whileHover={reduced ? {} : {
        x: -6,
        rotateY: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      aria-label={`Abrir proyecto ${project.title}, volumen ${project.volumeNumber}`}
    >
      {/* Volume number — rotated text along spine */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
      >
        <span className="font-mono-arch text-[0.5rem] tracking-[0.18em] text-white/40 uppercase">
          {project.volumeNumber}
        </span>
      </span>

      {/* Title — bottom of spine */}
      <span
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg) translateX(50%)' }}
      >
        <span className="font-cormorant text-[0.7rem] font-light text-white/80 whitespace-nowrap">
          {project.title}
        </span>
      </span>

      {/* Hover tooltip */}
      <motion.div
        className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-[#111111] text-[#F8F7F4] px-3 py-2 rounded-sm pointer-events-none whitespace-nowrap z-10"
        initial={{ opacity: 0, x: 4 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        role="tooltip"
      >
        <p className="font-mono-arch text-[0.55rem] tracking-[0.1em] text-[#8A8880]">
          VOL. {project.volumeNumber}
        </p>
        <p className="font-cormorant text-sm font-light">{project.title}</p>
        <p className="font-mono-arch text-[0.55rem] tracking-[0.08em] text-[#8A8880]">
          {project.location} · {project.year}
        </p>
      </motion.div>
    </motion.button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/library/BookSpine.tsx
git commit -m "feat: BookSpine with CSS 3D hover and tooltip"
```

---

## Task 12: ProjectShelf

**Files:**
- Create: `src/components/library/ProjectShelf.tsx`

- [ ] **Step 1: Create ProjectShelf.tsx**

```tsx
'use client'

import { useRef } from 'react'
import type { Project } from '@/data/types'
import BookSpine from './BookSpine'

interface ProjectShelfProps {
  projects: Project[]
  activeSlug: string | null
  onExtract: (project: Project, el: HTMLElement) => void
}

export default function ProjectShelf({ projects, activeSlug, onExtract }: ProjectShelfProps) {
  const shelfRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={shelfRef}
      className="relative w-full overflow-x-auto"
      style={{ perspective: '800px' }}
    >
      <div className="flex items-end gap-1.5 px-8 min-w-max mx-auto" style={{ minHeight: '260px' }}>
        {projects.map(project => (
          <BookSpine
            key={project.id}
            project={project}
            onExtract={onExtract}
            dimmed={activeSlug !== null && activeSlug !== project.slug}
          />
        ))}
      </div>

      {/* Shelf plank */}
      <div className="relative h-3 bg-[#E5E3DF] rounded-sm mx-8 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-[#BEBBB5] to-[#E5E3DF] rounded-sm" />
      </div>

      {/* Shelf label */}
      <p className="text-center font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#BEBBB5] mt-3 uppercase">
        Biblioteca — {projects.length} volúmenes
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/library/ProjectShelf.tsx
git commit -m "feat: ProjectShelf with perspective and shelf plank"
```

---

## Task 13: BookExtractionSequence (GSAP State Machine)

**Files:**
- Create: `src/components/library/BookExtractionSequence.tsx`

- [ ] **Step 1: Create BookExtractionSequence.tsx**

```tsx
'use client'

import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'
import { loadGsap } from '@/lib/gsap'
import ProjectShelf from './ProjectShelf'
import FocusedBook from './FocusedBook'

type BookState = 'shelf' | 'extract' | 'focused' | 'opening'

interface SpineRect { left: number; top: number; width: number; height: number }

interface BookExtractionSequenceProps {
  projects: Project[]
}

export default function BookExtractionSequence({ projects }: BookExtractionSequenceProps) {
  const [state, setState] = useState<BookState>('shelf')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [spineRect, setSpineRect] = useState<SpineRect | null>(null)
  const flyingRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const router = useRouter()

  const handleExtract = useCallback(async (project: Project, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    setSpineRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
    setActiveProject(project)

    if (reduced) {
      setState('focused')
      return
    }

    setState('extract')

    // Wait one frame so flyingRef mounts
    await new Promise<void>(r => requestAnimationFrame(() => r()))

    const gsap = await loadGsap()
    if (!flyingRef.current) return

    const COVER_W = 200
    const COVER_H = 280
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    // Start at spine position (transform from center to spine)
    gsap.set(flyingRef.current, {
      x: rect.left + rect.width / 2 - cx,
      y: rect.top + rect.height / 2 - cy,
      scaleX: rect.width / COVER_W,
      scaleY: rect.height / COVER_H,
      opacity: 1,
    })

    // Animate to center
    gsap.to(flyingRef.current, {
      x: 0, y: 0, scaleX: 1, scaleY: 1,
      duration: 0.7,
      ease: 'power3.out',
      onComplete: () => setState('focused'),
    })
  }, [reduced])

  const handleOpenProject = useCallback(async (slug: string) => {
    if (reduced) {
      router.push(`/proyectos/${slug}`)
      return
    }

    setState('opening')
    // FocusedBook's BookOpenTransition will call this after its own animation
    setTimeout(() => router.push(`/proyectos/${slug}`), 900)
  }, [reduced, router])

  const handleClose = useCallback(() => {
    setActiveProject(null)
    setSpineRect(null)
    setState('shelf')
  }, [])

  return (
    <div className="relative w-full">
      {/* Shelf — always rendered, dimmed when a book is extracted */}
      <ProjectShelf
        projects={projects}
        activeSlug={activeProject?.slug ?? null}
        onExtract={handleExtract}
      />

      {/* Backdrop */}
      <AnimatePresence>
        {(state === 'extract' || state === 'focused' || state === 'opening') && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={state === 'focused' ? handleClose : undefined}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Flying book (extract state only) */}
      {state === 'extract' && activeProject && (
        <div
          ref={flyingRef}
          className="fixed z-50 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: 200,
            height: 280,
            marginLeft: -100,
            marginTop: -140,
            backgroundColor: activeProject.spineColor,
            borderRadius: 4,
          }}
          aria-hidden="true"
        />
      )}

      {/* Focused state */}
      <AnimatePresence>
        {(state === 'focused' || state === 'opening') && activeProject && (
          <FocusedBook
            project={activeProject}
            onOpen={handleOpenProject}
            onClose={handleClose}
            isOpening={state === 'opening'}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/library/BookExtractionSequence.tsx
git commit -m "feat: BookExtractionSequence GSAP 5-state machine"
```

---

## Task 14: FocusedBook + BookOpenTransition

**Files:**
- Create: `src/components/library/FocusedBook.tsx`
- Create: `src/components/library/BookOpenTransition.tsx`

- [ ] **Step 1: Create BookOpenTransition.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'
import type { Project } from '@/data/types'

interface BookOpenTransitionProps {
  project: Project
  onComplete: () => void
}

export default function BookOpenTransition({ project, onComplete }: BookOpenTransitionProps) {
  const coverRef = useRef<HTMLDivElement>(null)
  const spreadRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const gsap = await loadGsap()
      if (cancelled || !coverRef.current || !spreadRef.current || !overlayRef.current) return

      const tl = gsap.timeline()

      // Step 1 (0–300ms): cover rotates open
      tl.to(coverRef.current, {
        rotateY: -30,
        duration: 0.3,
        ease: 'power2.in',
      })

      // Step 2 (300–500ms): double-page spread fades in
      tl.to(spreadRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
      })

      // Step 3 (500–900ms): scale + fade to white
      tl.to(coverRef.current, {
        scale: 8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'none',
        onComplete: () => { if (!cancelled) onComplete() },
      }, '-=0.1')
    }

    run()
    return () => { cancelled = true }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
      {/* Cover element */}
      <div
        ref={coverRef}
        className="relative"
        style={{
          width: 200, height: 280,
          backgroundColor: project.spineColor,
          borderRadius: 4,
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-end p-4">
          <p className="font-cormorant text-xl font-light text-white/90">{project.title}</p>
        </div>
      </div>

      {/* Double-page spread flash */}
      <div
        ref={spreadRef}
        className="absolute"
        style={{ opacity: 0, width: 400, height: 280, display: 'flex' }}
        aria-hidden="true"
      >
        <div className="flex-1 bg-[#111111] flex items-center justify-center border-r border-[#2C2C2C]">
          <p className="font-mono-arch text-[0.55rem] tracking-[0.14em] text-[#8A8880] uppercase text-center px-4">
            Índice del volumen
          </p>
        </div>
        <div className="flex-1 bg-[#F8F7F4]" />
      </div>

      {/* White fade overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#F8F7F4]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </div>
  )
}
```

- [ ] **Step 2: Create FocusedBook.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Project } from '@/data/types'
import Button from '@/components/ui/Button'
import BookOpenTransition from './BookOpenTransition'

interface FocusedBookProps {
  project: Project
  onOpen: (slug: string) => void
  onClose: () => void
  isOpening: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  residencial: 'Residencial',
  interiorismo: 'Interiorismo',
  reforma: 'Reforma',
  comercial: 'Comercial',
  cultural: 'Cultural',
}

const STATUS_LABELS: Record<string, string> = {
  construido: 'Construido',
  'en-proceso': 'En proceso',
  concepto: 'Concepto',
}

export default function FocusedBook({ project, onOpen, onClose, isOpening }: FocusedBookProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-label={`Proyecto ${project.title}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-3xl w-full">
          {/* Book cover */}
          <motion.div
            className="relative flex-shrink-0"
            style={{ width: 200, height: 280 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image
              src={project.coverImage}
              alt={`Portada del proyecto ${project.title}`}
              fill
              className="object-cover rounded-sm"
              sizes="200px"
            />
            <div className="absolute inset-0 rounded-sm" style={{ boxShadow: '8px 8px 32px rgba(0,0,0,0.25)' }} />
            {/* Spine shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-sm" style={{ background: `linear-gradient(to right, ${project.spineColor}88, transparent)` }} />
          </motion.div>

          {/* Metadata panel */}
          <motion.div
            className="flex flex-col gap-4 text-center md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          >
            <div>
              <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-1">
                Vol. {project.volumeNumber} — {CATEGORY_LABELS[project.category]}
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight">
                {project.title}
              </h2>
            </div>

            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#8A8880]">
              {project.location} · {project.year} · {project.surface ?? '—'}
            </p>

            <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed max-w-xs">
              {project.shortDesc}
            </p>

            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] uppercase">
              {STATUS_LABELS[project.status]}
            </p>

            <div className="flex gap-3 justify-center md:justify-start mt-2">
              <Button onClick={() => onOpen(project.slug)}>
                Abrir proyecto
              </Button>
              <Button variant="ghost" onClick={onClose} aria-label="Cerrar y volver a la biblioteca">
                Cerrar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Opening animation */}
      {isOpening && (
        <BookOpenTransition
          project={project}
          onComplete={() => {/* router.push already called in parent */}}
        />
      )}
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/library/FocusedBook.tsx src/components/library/BookOpenTransition.tsx
git commit -m "feat: FocusedBook metadata panel and GSAP BookOpenTransition"
```

---

## Task 15: ProjectBookCard

**Files:**
- Create: `src/components/library/ProjectBookCard.tsx`

- [ ] **Step 1: Create ProjectBookCard.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'

interface ProjectBookCardProps {
  project: Project
  priority?: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  residencial: 'Residencial', interiorismo: 'Interiorismo',
  reforma: 'Reforma', comercial: 'Comercial', cultural: 'Cultural',
}

export default function ProjectBookCard({ project, priority = false }: ProjectBookCardProps) {
  const reduced = useReducedMotion()
  const router = useRouter()

  return (
    <motion.article
      className="group cursor-pointer"
      whileHover={reduced ? {} : { y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
      onClick={() => router.push(`/proyectos/${project.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && router.push(`/proyectos/${project.slug}`)}
      aria-label={`Ver proyecto ${project.title}`}
    >
      {/* Cover image — 3:4 ratio */}
      <div
        className="relative w-full overflow-hidden rounded-sm bg-[#E5E3DF]"
        style={{ aspectRatio: '3/4' }}
      >
        <Image
          src={project.coverImage}
          alt={`Portada del proyecto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority={priority}
        />
        {/* Spine color strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3"
          style={{ backgroundColor: project.spineColor }}
          aria-hidden="true"
        />
      </div>

      {/* Card info */}
      <div className="pt-3 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase">
            Vol. {project.volumeNumber}
          </p>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880]">
            {project.year}
          </p>
        </div>
        <h3 className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors">
          {project.title}
        </h3>
        <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880]">
          {project.location} · {CATEGORY_LABELS[project.category]}
        </p>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/library/ProjectBookCard.tsx
git commit -m "feat: ProjectBookCard for grid/portadas library view"
```

---

## Task 16: LibraryFilter

**Files:**
- Create: `src/components/library/LibraryFilter.tsx`

- [ ] **Step 1: Create LibraryFilter.tsx**

```tsx
'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { LibraryView, ProjectCategory, SortOption } from '@/data/types'

type CategoryFilter = ProjectCategory | 'todos'

interface LibraryFilterProps {
  view: LibraryView
  onViewChange: (v: LibraryView) => void
  category: CategoryFilter
  onCategoryChange: (c: CategoryFilter) => void
  sort: SortOption
  onSortChange: (s: SortOption) => void
  search: string
  onSearchChange: (q: string) => void
  resultCount: number
}

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'interiorismo', label: 'Interiorismo' },
  { value: 'reforma', label: 'Reforma' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'cultural', label: 'Cultural' },
]

const VIEWS: { value: LibraryView; label: string }[] = [
  { value: 'estanteria', label: 'Estantería' },
  { value: 'portadas', label: 'Portadas' },
  { value: 'indice', label: 'Índice' },
]

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'año', label: 'Por año' },
  { value: 'ciudad', label: 'Por ciudad' },
]

export default function LibraryFilter({
  view, onViewChange, category, onCategoryChange,
  sort, onSortChange, search, onSearchChange, resultCount,
}: LibraryFilterProps) {
  return (
    <div className="space-y-4">
      {/* Top row: view toggle + sort + search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* View toggle */}
        <div className="flex items-center gap-1 bg-[#E5E3DF] rounded-sm p-1" role="group" aria-label="Vista de biblioteca">
          {VIEWS.map(v => (
            <button
              key={v.value}
              onClick={() => onViewChange(v.value)}
              aria-pressed={view === v.value}
              className={cn(
                'font-mono-arch text-[0.6rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm transition-all',
                view === v.value
                  ? 'bg-[#111111] text-[#F8F7F4]'
                  : 'text-[#8A8880] hover:text-[#111111]'
              )}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sort}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="font-mono-arch text-[0.6rem] tracking-[0.1em] bg-transparent text-[#8A8880] border-none outline-none cursor-pointer"
            aria-label="Ordenar proyectos"
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Buscar..."
            aria-label="Buscar proyectos"
            className="font-mono-arch text-[0.6rem] tracking-[0.1em] bg-[#E5E3DF] text-[#2C2C2C] placeholder:text-[#8A8880] px-3 py-1.5 rounded-sm border-none outline-none focus-visible:ring-1 focus-visible:ring-[#C4673A] w-32"
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            layout
            className={cn(
              'font-mono-arch text-[0.6rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm border transition-colors',
              category === cat.value
                ? 'bg-[#111111] text-[#F8F7F4] border-[#111111]'
                : 'bg-transparent text-[#8A8880] border-[#E5E3DF] hover:border-[#8A8880] hover:text-[#2C2C2C]'
            )}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Result count */}
      <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880]">
        {resultCount === 0
          ? 'No hay volúmenes en esta categoría todavía.'
          : `${resultCount} volumen${resultCount !== 1 ? 'es' : ''}`}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/library/LibraryFilter.tsx
git commit -m "feat: LibraryFilter with view toggle, sort, search, category pills"
```

---

## Task 17: Library Page (/proyectos)

**Files:**
- Create: `src/app/proyectos/page.tsx`

- [ ] **Step 1: Create src/app/proyectos/page.tsx**

```tsx
import type { Metadata } from 'next'
import LibraryClient from './LibraryClient'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Proyectos — Tomo Studio',
  description: 'Biblioteca de proyectos de Tomo Studio. Seis volúmenes de arquitectura residencial, interiorismo, reforma y espacios culturales.',
}

export default function ProyectosPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            Biblioteca
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-4">
            Proyectos
          </h1>
          <p className="font-inter text-[#8A8880] max-w-lg">
            Cada proyecto como un volumen. Una colección de arquitecturas construidas desde la escucha, el lugar y la materia.
          </p>
        </div>

        <LibraryClient projects={projects} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/proyectos/LibraryClient.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import type { Project, LibraryView, ProjectCategory, SortOption } from '@/data/types'
import { filterProjects, sortProjects } from '@/lib/filterProjects'
import LibraryFilter from '@/components/library/LibraryFilter'
import BookExtractionSequence from '@/components/library/BookExtractionSequence'
import ProjectBookCard from '@/components/library/ProjectBookCard'

type CategoryFilter = ProjectCategory | 'todos'

interface LibraryClientProps { projects: Project[] }

export default function LibraryClient({ projects }: LibraryClientProps) {
  const [view, setView] = useState<LibraryView>('estanteria')
  const [category, setCategory] = useState<CategoryFilter>('todos')
  const [sort, setSort] = useState<SortOption>('recientes')
  const [search, setSearch] = useState('')

  // Persist view in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('library-view') as LibraryView | null
    if (saved) setView(saved)
  }, [])

  const handleViewChange = (v: LibraryView) => {
    setView(v)
    sessionStorage.setItem('library-view', v)
  }

  const filtered = filterProjects(projects, category, search)
  const sorted = sortProjects(filtered, sort)

  return (
    <div>
      <LibraryFilter
        view={view}
        onViewChange={handleViewChange}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        search={search}
        onSearchChange={setSearch}
        resultCount={sorted.length}
      />

      <div className="mt-12">
        {/* Shelf view */}
        {view === 'estanteria' && (
          <BookExtractionSequence projects={sorted} />
        )}

        {/* Grid / Portadas view */}
        {view === 'portadas' && (
          sorted.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sorted.map((p, i) => (
                <ProjectBookCard key={p.id} project={p} priority={i < 4} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )
        )}

        {/* Index / Editorial list view */}
        {view === 'indice' && (
          sorted.length > 0 ? (
            <div className="divide-y divide-[#E5E3DF]">
              {sorted.map(p => (
                <a
                  key={p.id}
                  href={`/proyectos/${p.slug}`}
                  className="group flex items-baseline gap-6 py-4 hover:bg-[#E5E3DF]/30 transition-colors px-2 -mx-2 rounded-sm"
                >
                  <span className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] w-8 flex-shrink-0">
                    {p.volumeNumber}
                  </span>
                  <span className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors min-w-24">
                    {p.title}
                  </span>
                  <span className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] hidden md:inline">
                    {p.category}
                  </span>
                  <span className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880]">
                    {p.location}
                  </span>
                  <span className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] ml-auto">
                    {p.year}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <EmptyState />
          )
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="font-cormorant text-2xl font-light text-[#8A8880]">
        No hay volúmenes en esta categoría todavía.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/proyectos/
git commit -m "feat: library page with 3 views, filter, search and GSAP extraction"
```

---

## Task 18: Project Detail Components

**Files:**
- Create: `src/components/project/ProjectIndex.tsx`
- Create: `src/components/project/ProjectChapter.tsx`
- Create: `src/components/project/MaterialPalette.tsx`
- Create: `src/components/project/ImageGallery.tsx`
- Create: `src/components/project/TechnicalSheet.tsx`

- [ ] **Step 1: Create ProjectIndex.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const CHAPTERS = [
  { id: 'concepto', label: 'Concepto' },
  { id: 'contexto', label: 'Contexto' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'materialidad', label: 'Materialidad' },
  { id: 'planos', label: 'Planos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'ficha', label: 'Ficha técnica' },
]

export default function ProjectIndex() {
  const [active, setActive] = useState('concepto')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    CHAPTERS.forEach(ch => {
      const el = document.getElementById(ch.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav
        className="hidden lg:block sticky top-28 w-40 flex-shrink-0 self-start"
        aria-label="Índice del proyecto"
      >
        <p className="font-mono-arch text-[0.55rem] tracking-[0.14em] text-[#8A8880] uppercase mb-4">
          Índice
        </p>
        <ul className="flex flex-col gap-2">
          {CHAPTERS.map(ch => (
            <li key={ch.id}>
              <button
                onClick={() => scrollTo(ch.id)}
                className={cn(
                  'font-mono-arch text-[0.6rem] tracking-[0.1em] text-left transition-colors w-full',
                  active === ch.id
                    ? 'text-[#C4673A]'
                    : 'text-[#8A8880] hover:text-[#2C2C2C]'
                )}
              >
                {active === ch.id && (
                  <span className="inline-block w-3 h-px bg-[#C4673A] mr-2 align-middle" />
                )}
                {ch.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile horizontal chips */}
      <nav
        className="lg:hidden sticky top-16 z-30 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#E5E3DF] -mx-6 px-6 py-3 overflow-x-auto"
        aria-label="Índice del proyecto"
      >
        <div className="flex gap-4 min-w-max">
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className={cn(
                'font-mono-arch text-[0.6rem] tracking-[0.1em] whitespace-nowrap pb-1 border-b transition-colors',
                active === ch.id
                  ? 'text-[#C4673A] border-[#C4673A]'
                  : 'text-[#8A8880] border-transparent'
              )}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
```

- [ ] **Step 2: Create ProjectChapter.tsx**

```tsx
'use client'

import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'
import { motion } from 'motion/react'

interface ProjectChapterProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

export default function ProjectChapter({ id, number, title, children }: ProjectChapterProps) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      className="py-16 border-b border-[#E5E3DF] scroll-mt-28"
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880]">{number}</span>
        <h2 className="font-cormorant text-2xl md:text-3xl font-light text-[#111111]">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 3: Create MaterialPalette.tsx**

```tsx
'use client'

import { motion } from 'motion/react'
import type { Material } from '@/data/types'

interface MaterialPaletteProps { materials: Material[] }

export default function MaterialPalette({ materials }: MaterialPaletteProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {materials.map((mat, i) => (
        <motion.div
          key={mat.name}
          className="group"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          {/* Color swatch */}
          <div
            className="w-full h-24 rounded-sm mb-3 border border-[#E5E3DF]"
            style={{ backgroundColor: mat.colorHex ?? '#BEBBB5' }}
            aria-hidden="true"
          />
          <p className="font-inter text-sm font-medium text-[#111111]">{mat.name}</p>
          {mat.description && (
            <p className="font-mono-arch text-[0.6rem] tracking-[0.08em] text-[#8A8880] mt-1 leading-relaxed">
              {mat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create ImageGallery.tsx**

```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ImageGalleryProps {
  images: string[]
  projectTitle: string
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((src, i) => (
          <motion.button
            key={src}
            className={`relative overflow-hidden rounded-sm bg-[#E5E3DF] cursor-zoom-in ${i === 0 ? 'md:col-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            aria-label={`Ver imagen ${i + 1} del proyecto ${projectTitle}`}
          >
            <Image
              src={src}
              alt={`${projectTitle} — imagen ${i + 1}`}
              fill
              className="object-cover"
              sizes={i === 0 ? '(max-width: 768px) 100vw, 80vw' : '(max-width: 768px) 100vw, 40vw'}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white font-mono-arch text-[0.65rem] tracking-[0.1em] uppercase"
              onClick={() => setLightbox(null)}
            >
              Cerrar
            </button>
            <div className="relative w-full max-w-5xl" style={{ aspectRatio: '16/10' }}>
              <Image
                src={images[lightbox]}
                alt={`${projectTitle} — imagen ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 5: Create TechnicalSheet.tsx**

```tsx
import type { TechnicalData, ProjectStatus } from '@/data/types'

const STATUS_LABELS: Record<ProjectStatus, string> = {
  construido: 'Construido',
  'en-proceso': 'En proceso',
  concepto: 'Concepto',
}

interface TechnicalSheetProps { data: TechnicalData }

export default function TechnicalSheet({ data }: TechnicalSheetProps) {
  const rows: { label: string; value: string | undefined }[] = [
    { label: 'Cliente', value: data.client },
    { label: 'Localización', value: data.location },
    { label: 'Año', value: String(data.year) },
    { label: 'Superficie', value: data.surface },
    { label: 'Estado', value: STATUS_LABELS[data.status] },
    { label: 'Equipo', value: data.team?.join(', ') },
    { label: 'Fotografía', value: data.photography },
    { label: 'Colaboradores', value: data.collaborators?.join(', ') },
  ].filter(r => r.value)

  return (
    <div className="border border-[#E5E3DF] rounded-sm overflow-hidden">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex gap-6 px-5 py-3 ${i % 2 === 0 ? 'bg-[#F8F7F4]' : 'bg-[#E5E3DF]/30'}`}
        >
          <dt className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase w-28 flex-shrink-0">
            {row.label}
          </dt>
          <dd className="font-inter text-sm text-[#2C2C2C]">{row.value}</dd>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/project/
git commit -m "feat: project detail components — index, chapter, materials, gallery, sheet"
```

---

## Task 19: Project Page (/proyectos/[slug])

**Files:**
- Create: `src/app/proyectos/[slug]/page.tsx`

- [ ] **Step 1: Create src/app/proyectos/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/data/projects'
import ProjectIndex from '@/components/project/ProjectIndex'
import ProjectChapter from '@/components/project/ProjectChapter'
import MaterialPalette from '@/components/project/MaterialPalette'
import ImageGallery from '@/components/project/ImageGallery'
import TechnicalSheet from '@/components/project/TechnicalSheet'
import Button from '@/components/ui/Button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.seoTitle,
    description: project.seoDesc,
    openGraph: {
      title: project.seoTitle,
      description: project.seoDesc,
      images: [{ url: project.coverImage, width: 1200, height: 900 }],
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  residencial: 'Residencial', interiorismo: 'Interiorismo',
  reforma: 'Reforma', comercial: 'Comercial', cultural: 'Cultural',
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const relatedProjects = project.related
    .map(s => getProjectBySlug(s))
    .filter(Boolean) as typeof projects

  return (
    <article className="bg-[#F8F7F4] min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.title} — imagen principal`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-white/60 uppercase mb-2">
            Vol. {project.volumeNumber} — {CATEGORY_LABELS[project.category]}
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-white leading-tight">
            {project.title}
          </h1>
          <p className="font-mono-arch text-[0.7rem] tracking-[0.1em] text-white/60 mt-2">
            {project.location} · {project.year} · {project.surface ?? '—'}
          </p>
        </div>
      </div>

      {/* Cover phrase */}
      <div className="px-6 md:px-12 py-12 border-b border-[#E5E3DF]">
        <blockquote className="font-cormorant text-2xl md:text-3xl font-light italic text-[#111111] max-w-2xl">
          "{project.coverPhrase}"
        </blockquote>
      </div>

      {/* Content layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <div className="flex gap-12">
          {/* Sticky index */}
          <ProjectIndex />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ProjectChapter id="concepto" number="01" title="Concepto">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">
                {project.chapters.concepto}
              </p>
            </ProjectChapter>

            <ProjectChapter id="contexto" number="02" title="Contexto">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">
                {project.chapters.contexto}
              </p>
            </ProjectChapter>

            <ProjectChapter id="proceso" number="03" title="Proceso">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">
                {project.chapters.proceso}
              </p>
            </ProjectChapter>

            <ProjectChapter id="materialidad" number="04" title="Materialidad">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">
                {project.chapters.materialidad}
              </p>
              <MaterialPalette materials={project.materials} />
            </ProjectChapter>

            <ProjectChapter id="planos" number="05" title="Planos">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">
                {project.chapters.planos}
              </p>
              {/* Architectural plans image placeholder */}
              <div className="relative w-full bg-[#E5E3DF] rounded-sm flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={project.gallery[0]}
                  alt={`Planos de ${project.title}`}
                  fill
                  className="object-cover rounded-sm opacity-70"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            </ProjectChapter>

            <ProjectChapter id="galeria" number="06" title="Galería">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">
                {project.chapters.galeria}
              </p>
              <ImageGallery images={project.gallery} projectTitle={project.title} />
            </ProjectChapter>

            <ProjectChapter id="ficha" number="07" title="Ficha técnica">
              <TechnicalSheet data={project.technical} />
            </ProjectChapter>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="py-20 border-t border-[#E5E3DF] mt-8">
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-8">
              Volúmenes relacionados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {relatedProjects.map(rel => (
                <Link
                  key={rel.id}
                  href={`/proyectos/${rel.slug}`}
                  className="group flex items-center gap-4"
                >
                  <div
                    className="w-3 h-16 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: rel.spineColor }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono-arch text-[0.55rem] tracking-[0.12em] text-[#8A8880]">
                      Vol. {rel.volumeNumber}
                    </p>
                    <p className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors">
                      {rel.title}
                    </p>
                    <p className="font-mono-arch text-[0.6rem] tracking-[0.08em] text-[#8A8880]">
                      {rel.location} · {rel.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="py-20 text-center border-t border-[#E5E3DF]">
          <p className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] mb-6">
            ¿Empezamos el próximo volumen?
          </p>
          <Button href="/contacto">Cuéntanos tu proyecto</Button>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/proyectos/[slug]/
git commit -m "feat: project detail page with 7 chapters, sticky index, gallery, related"
```

---

## Task 20: Home Page

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/IntroEditorial.tsx`
- Create: `src/components/home/FeaturedLibrary.tsx`
- Create: `src/components/home/PhilosophyMethod.tsx`
- Create: `src/components/home/ServicesPreview.tsx`
- Create: `src/components/home/JournalPreview.tsx`
- Create: `src/components/home/FinalCTA.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Button from '@/components/ui/Button'
import { getFeaturedProjects } from '@/data/projects'

export default function HeroSection() {
  const featured = getFeaturedProjects()[0]

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#111111]" aria-label="Inicio">
      {/* Background image */}
      {featured && (
        <Image
          src={featured.heroImage}
          alt={`Imagen del proyecto ${featured.title}`}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-white/50 uppercase mb-4">
            Tomo Studio — Madrid
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight mb-6 max-w-4xl">
            Cada proyecto merece su propio volumen.
          </h1>
          <p className="font-inter text-[#8A8880] max-w-md mb-10 leading-relaxed">
            Arquitectura de autor desde la escucha, el lugar y la materia. Una biblioteca de seis volúmenes construidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/proyectos">Ver proyectos</Button>
            <Button href="/estudio" variant="secondary">Conocer el estudio</Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-white/20" />
        <span className="font-mono-arch text-[0.5rem] tracking-[0.18em] text-white/30 uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Create IntroEditorial.tsx**

```tsx
import { studio } from '@/data/studio'

export default function IntroEditorial() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Filosofía">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-6">
            Estudio
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] leading-tight mb-8">
            {studio.philosophy}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-8">
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">
              {new Date().getFullYear() - studio.founded}
            </p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Años de práctica
            </p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">6</p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Volúmenes en biblioteca
            </p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">7</p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Tipologías de proyecto
            </p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">5</p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Ciudades
            </p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">2</p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Profesionales
            </p>
          </div>
          <div>
            <p className="font-cormorant text-4xl font-light text-[#C4673A]">
              {studio.founded}
            </p>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">
              Fundado en {studio.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create FeaturedLibrary.tsx**

```tsx
import Link from 'next/link'
import { getFeaturedProjects } from '@/data/projects'
import ProjectBookCard from '@/components/library/ProjectBookCard'

export default function FeaturedLibrary() {
  const featured = getFeaturedProjects().slice(0, 4)

  return (
    <section className="py-24 bg-[#E5E3DF]/30" aria-label="Proyectos destacados">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
              Biblioteca
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111]">
              Proyectos destacados
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#B35A30] transition-colors hidden md:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProjectBookCard key={p.id} project={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create PhilosophyMethod.tsx**

```tsx
'use client'

import { motion } from 'motion/react'
import { processSteps } from '@/data/studio'

export default function PhilosophyMethod() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Método">
      <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
        Método
      </p>
      <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] mb-16">
        Cómo trabajamos
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="w-px h-8 bg-[#C4673A]" aria-hidden="true" />
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#C4673A]">
              {step.number}
            </p>
            <h3 className="font-cormorant text-lg font-light text-[#111111]">{step.title}</h3>
            <p className="font-inter text-xs text-[#8A8880] leading-relaxed line-clamp-4">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create ServicesPreview.tsx**

```tsx
import Link from 'next/link'
import { services } from '@/data/services'
import ServiceCard from '@/components/ui/ServiceCard'

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-[#111111]" aria-label="Servicios">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
              Servicios
            </p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#F8F7F4]">
              Qué hacemos
            </h2>
          </div>
          <Link
            href="/servicios"
            className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#D4773A] transition-colors hidden md:block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2C2C2C]">
          {services.slice(0, 6).map(s => (
            <ServiceCard key={s.id} service={s} dark />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create ServiceCard.tsx**

```tsx
import type { Service } from '@/data/types'
import { cn } from '@/lib/utils'

interface ServiceCardProps { service: Service; dark?: boolean }

export default function ServiceCard({ service, dark = false }: ServiceCardProps) {
  return (
    <div className={cn('p-6', dark ? 'bg-[#111111]' : 'bg-[#F8F7F4]')}>
      <p className={cn('font-mono-arch text-[0.6rem] tracking-[0.14em] mb-3', dark ? 'text-[#8A8880]' : 'text-[#8A8880]')}>
        {service.number}
      </p>
      <h3 className={cn('font-cormorant text-xl font-light mb-3', dark ? 'text-[#F8F7F4]' : 'text-[#111111]')}>
        {service.title}
      </h3>
      <p className={cn('font-inter text-sm leading-relaxed', dark ? 'text-[#8A8880]' : 'text-[#2C2C2C]')}>
        {service.description}
      </p>
    </div>
  )
}
```

- [ ] **Step 7: Create JournalPreview.tsx**

```tsx
import { journalPosts } from '@/data/journal'
import JournalCard from '@/components/ui/JournalCard'
import Link from 'next/link'

export default function JournalPreview() {
  const recent = journalPosts.slice(0, 3)

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Archivo">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            Archivo
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111]">
            Últimas reflexiones
          </h2>
        </div>
        <Link href="/archivo" className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#B35A30] transition-colors hidden md:block">
          Ver todo →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recent.map(post => (
          <JournalCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create JournalCard.tsx**

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { JournalPost } from '@/data/types'

interface JournalCardProps { post: JournalPost }

export default function JournalCard({ post }: JournalCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link href={`/archivo/${post.slug}`} className="block group">
        <div className="relative w-full overflow-hidden rounded-sm bg-[#E5E3DF] mb-4" style={{ aspectRatio: '4/3' }}>
          <Image
            src={post.coverImage}
            alt={`Imagen del artículo: ${post.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-2">
          {post.category} · {post.date}
        </p>
        <h3 className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="font-inter text-sm text-[#8A8880] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </Link>
    </motion.article>
  )
}
```

- [ ] **Step 9: Create FinalCTA.tsx**

```tsx
import Button from '@/components/ui/Button'

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 text-center bg-[#F8F7F4] border-t border-[#E5E3DF]" aria-label="Contacto">
      <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-6">
        ¿Empezamos?
      </p>
      <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] max-w-3xl mx-auto leading-tight mb-10">
        Cuéntanos el próximo volumen de tu espacio.
      </h2>
      <Button href="/contacto" className="text-base px-8 py-4">
        Iniciar conversación
      </Button>
    </section>
  )
}
```

- [ ] **Step 10: Wire home page**

Replace `src/app/page.tsx`:

```tsx
import HeroSection from '@/components/home/HeroSection'
import IntroEditorial from '@/components/home/IntroEditorial'
import FeaturedLibrary from '@/components/home/FeaturedLibrary'
import PhilosophyMethod from '@/components/home/PhilosophyMethod'
import ServicesPreview from '@/components/home/ServicesPreview'
import JournalPreview from '@/components/home/JournalPreview'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroEditorial />
      <FeaturedLibrary />
      <PhilosophyMethod />
      <ServicesPreview />
      <JournalPreview />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 11: Commit**

```bash
git add src/components/home/ src/components/ui/ServiceCard.tsx src/components/ui/JournalCard.tsx src/app/page.tsx
git commit -m "feat: home page with 7 sections — hero, intro, library, method, services, journal, CTA"
```

---

## Task 21: Estudio + Servicios + Proceso Pages

**Files:**
- Create: `src/app/estudio/page.tsx`
- Create: `src/app/servicios/page.tsx`
- Create: `src/app/proceso/page.tsx`
- Create: `src/components/ui/ProcessTimeline.tsx`

- [ ] **Step 1: Create src/app/estudio/page.tsx**

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { studio } from '@/data/studio'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Estudio — Tomo Studio',
  description: 'Equipo, filosofía y forma de trabajar de Tomo Studio. Arquitectura desde la escucha.',
}

export default function EstudioPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            El estudio
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-6">
            Tomo Studio
          </h1>
          <p className="font-inter text-[#2C2C2C] leading-relaxed">
            {studio.philosophy}
          </p>
        </div>

        {/* Team */}
        <div className="mb-24">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-10">
            Equipo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {studio.team.map(member => (
              <div key={member.name} className="flex gap-8">
                <div className="w-20 h-20 bg-[#E5E3DF] rounded-sm flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-cormorant text-2xl font-light text-[#111111] mb-1">
                    {member.name}
                  </h2>
                  <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#C4673A] uppercase mb-3">
                    {member.role}
                  </p>
                  <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-24 py-20 border-t border-[#E5E3DF]">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-10">
            Valores
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Escucha antes que forma', body: 'No comenzamos a dibujar hasta entender el problema. La forma es consecuencia, no punto de partida.' },
              { title: 'Materiales honestos', body: 'Preferimos los materiales que envejecen bien a los que parecen perfectos el día de la entrega.' },
              { title: 'Proyecto como proceso', body: 'Cada decisión se documenta. El volumen final es el resultado de cientos de elecciones conscientes.' },
            ].map(v => (
              <div key={v.title}>
                <h3 className="font-cormorant text-xl font-light text-[#111111] mb-3">{v.title}</h3>
                <p className="font-inter text-sm text-[#8A8880] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-[#E5E3DF]">
          <Button href="/contacto">Trabajemos juntos</Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/servicios/page.tsx**

```tsx
import type { Metadata } from 'next'
import { services } from '@/data/services'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Servicios — Tomo Studio',
  description: 'Servicios de arquitectura, reforma, interiorismo y consultoría de Tomo Studio.',
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            Servicios
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-4">
            Qué hacemos
          </h1>
        </div>

        <div className="divide-y divide-[#E5E3DF]">
          {services.map(service => (
            <div key={service.id} className="py-10 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-8">
              <div className="font-mono-arch text-2xl font-light text-[#C4673A]">
                {service.number}
              </div>
              <div>
                <h2 className="font-cormorant text-2xl font-light text-[#111111] mb-3">
                  {service.title}
                </h2>
                <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-3">
                  Entregables
                </p>
                <ul className="flex flex-col gap-1">
                  {service.deliverables.map(d => (
                    <li key={d} className="font-inter text-sm text-[#2C2C2C] flex items-start gap-2">
                      <span className="text-[#C4673A] mt-1" aria-hidden="true">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-20 border-t border-[#E5E3DF] mt-8">
          <p className="font-cormorant text-3xl font-light text-[#111111] mb-6">
            ¿Encaja con lo que buscas?
          </p>
          <Button href="/contacto">Hablemos</Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create ProcessTimeline.tsx**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { processSteps } from '@/data/studio'

export default function ProcessTimeline() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <div className="divide-y divide-[#E5E3DF]">
      {processSteps.map(step => (
        <div key={step.number}>
          <button
            className="w-full flex items-center gap-6 py-6 text-left hover:bg-[#E5E3DF]/30 transition-colors px-2 -mx-2 rounded-sm"
            onClick={() => setOpen(open === step.number ? null : step.number)}
            aria-expanded={open === step.number}
          >
            <span className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#C4673A] w-8 flex-shrink-0">
              {step.number}
            </span>
            <span className="font-cormorant text-2xl font-light text-[#111111] flex-1">
              {step.title}
            </span>
            <span className="font-mono-arch text-[0.65rem] text-[#8A8880]" aria-hidden="true">
              {open === step.number ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {open === step.number && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <p className="font-inter text-[#2C2C2C] leading-relaxed">
                    {step.description}
                  </p>
                  <div className="relative aspect-video rounded-sm overflow-hidden bg-[#E5E3DF]">
                    <Image
                      src={step.imageUrl}
                      alt={`Imagen de la fase ${step.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create src/app/proceso/page.tsx**

```tsx
import type { Metadata } from 'next'
import ProcessTimeline from '@/components/ui/ProcessTimeline'

export const metadata: Metadata = {
  title: 'Proceso — Tomo Studio',
  description: 'Las seis fases del método de trabajo de Tomo Studio: Escucha, Concepto, Materia, Proyecto, Obra, Entrega.',
}

export default function ProcesoPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            Método
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-4">
            Proceso
          </h1>
          <p className="font-inter text-[#8A8880] max-w-lg">
            Seis fases. De la primera conversación a la visita de seguimiento. Cada fase es un compromiso, no un trámite.
          </p>
        </div>

        <ProcessTimeline />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/estudio/ src/app/servicios/ src/app/proceso/ src/components/ui/ProcessTimeline.tsx
git commit -m "feat: estudio, servicios and proceso pages"
```

---

## Task 22: Archivo + Contacto + Legal Pages

**Files:**
- Create: `src/app/archivo/page.tsx`
- Create: `src/app/archivo/[slug]/page.tsx`
- Create: `src/app/contacto/page.tsx`
- Create: `src/app/privacidad/page.tsx`
- Create: `src/app/aviso-legal/page.tsx`

- [ ] **Step 1: Create src/app/archivo/page.tsx**

```tsx
import type { Metadata } from 'next'
import { journalPosts } from '@/data/journal'
import JournalCard from '@/components/ui/JournalCard'

export const metadata: Metadata = {
  title: 'Archivo — Tomo Studio',
  description: 'Reflexiones sobre arquitectura, materiales y proceso de Tomo Studio.',
}

export default function ArchivoPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
            Archivo
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111]">
            Reflexiones
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {journalPosts.map(post => (
            <JournalCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/app/archivo/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { journalPosts, getPostBySlug } from '@/data/journal'
import Button from '@/components/ui/Button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return journalPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Tomo Studio`,
    description: post.excerpt,
    openGraph: { images: [{ url: post.coverImage }] },
  }
}

export default async function ArchivoPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-4">
            {post.category} · {post.date}
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-inter text-lg text-[#8A8880] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Cover image */}
        <div className="relative w-full rounded-sm overflow-hidden mb-12 bg-[#E5E3DF]" style={{ aspectRatio: '16/9' }}>
          <Image
            src={post.coverImage}
            alt={`Imagen del artículo: ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none font-inter text-[#2C2C2C] leading-relaxed">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <h2 key={i} className="font-cormorant text-2xl font-light text-[#111111] mt-8 mb-4">{paragraph.slice(2, -2)}</h2>
            }
            return <p key={i} className="mb-6">{paragraph}</p>
          })}
        </div>

        {/* Back */}
        <div className="mt-16 pt-12 border-t border-[#E5E3DF]">
          <Button href="/archivo" variant="secondary">← Volver al archivo</Button>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Create src/app/contacto/page.tsx**

```tsx
'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { studio } from '@/data/studio'

const PROJECT_TYPES = [
  'Vivienda nueva', 'Reforma integral', 'Interiorismo', 'Espacio comercial', 'Edificio cultural', 'Consultoría', 'Otro',
]

export default function ContactoPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(`Nombre: ${name}\nTipo de proyecto: ${type}\n\n${message}`)
    const subject = encodeURIComponent(`Consulta de proyecto — ${name}`)
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: headline + studio info */}
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">
              Contacto
            </p>
            <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight mb-12">
              Cuéntanos el próximo volumen de tu espacio.
            </h1>

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Email</p>
                <a href={`mailto:${studio.email}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">
                  {studio.email}
                </a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Teléfono</p>
                <a href={`tel:${studio.phone}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">
                  {studio.phone}
                </a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Estudio</p>
                <address className="font-inter text-[#2C2C2C] not-italic">{studio.address}</address>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div>
                <label htmlFor="name" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">
                  Nombre *
                </label>
                <input
                  id="name" type="text" required
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">
                  Email *
                </label>
                <input
                  id="email" type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none"
                />
              </div>

              <div>
                <label htmlFor="type" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">
                  Tipo de proyecto
                </label>
                <select
                  id="type"
                  value={type} onChange={e => setType(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none"
                >
                  <option value="">Seleccionar...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message" required rows={6}
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Cuéntanos brevemente tu proyecto: qué tienes, qué buscas, dónde está..."
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] placeholder:text-[#8A8880] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none resize-none"
                />
              </div>

              <Button type="submit" disabled={!name || !email || !message}>
                Enviar mensaje
              </Button>

              <p className="font-mono-arch text-[0.55rem] tracking-[0.1em] text-[#8A8880]">
                Al enviar, se abrirá tu cliente de email con los datos del formulario.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create privacidad + aviso-legal pages**

Create `src/app/privacidad/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de privacidad — Tomo Studio' }

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl font-light text-[#111111] mb-12">
          Política de privacidad
        </h1>
        <div className="font-inter text-sm text-[#2C2C2C] leading-relaxed space-y-6">
          <p>Tomo Studio (en adelante, "el Estudio") es responsable del tratamiento de los datos personales que nos facilites a través de este sitio web.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Datos recopilados</h2>
          <p>El formulario de contacto de este sitio web funciona mediante un enlace <em>mailto:</em> que abre tu cliente de correo electrónico. El Estudio no recopila ni almacena automáticamente ningún dato personal a través del sitio web. Los datos que compartas por email se tratarán con fines exclusivamente profesionales y no serán cedidos a terceros.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Derechos</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad contactando con nosotros en hola@tomostudio.es.</p>
          <p className="text-[#8A8880]">Última actualización: junio 2025.</p>
        </div>
      </div>
    </div>
  )
}
```

Create `src/app/aviso-legal/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Aviso legal — Tomo Studio' }

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl font-light text-[#111111] mb-12">
          Aviso legal
        </h1>
        <div className="font-inter text-sm text-[#2C2C2C] leading-relaxed space-y-6">
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Titular del sitio</h2>
          <p>Tomo Studio es un estudio de arquitectura ficticio creado como demostración de portfolio. Este sitio web es una pieza de demostración sin actividad comercial real.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Propiedad intelectual</h2>
          <p>Los textos, imágenes (procedentes de Unsplash, bajo licencia libre) y el código fuente de este sitio son propiedad de su autor y están protegidos por las leyes de propiedad intelectual.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Responsabilidad</h2>
          <p>El contenido de este sitio es ficticio. Cualquier similitud con personas, proyectos o estudios reales es coincidencia.</p>
          <p className="text-[#8A8880]">Última actualización: junio 2025.</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Fix contacto page — add 'use client' and metadata export separately**

The contacto page uses hooks so it needs `'use client'`. But `export const metadata` only works in Server Components. Split into two files:

Create `src/app/contacto/ContactoClient.tsx` (move the component there with `'use client'`):

```tsx
'use client'
// (same component content as the contacto page above, but without metadata)
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { studio } from '@/data/studio'

const PROJECT_TYPES = [
  'Vivienda nueva', 'Reforma integral', 'Interiorismo', 'Espacio comercial', 'Edificio cultural', 'Consultoría', 'Otro',
]

export default function ContactoClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(`Nombre: ${name}\nTipo de proyecto: ${type}\n\n${message}`)
    const subject = encodeURIComponent(`Consulta de proyecto — ${name}`)
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Contacto</p>
            <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight mb-12">
              Cuéntanos el próximo volumen de tu espacio.
            </h1>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Email</p>
                <a href={`mailto:${studio.email}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">{studio.email}</a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Teléfono</p>
                <a href={`tel:${studio.phone}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">{studio.phone}</a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Estudio</p>
                <address className="font-inter text-[#2C2C2C] not-italic">{studio.address}</address>
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div>
                <label htmlFor="name" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Nombre *</label>
                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Email *</label>
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none" />
              </div>
              <div>
                <label htmlFor="type" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Tipo de proyecto</label>
                <select id="type" value={type} onChange={e => setType(e.target.value)}
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none">
                  <option value="">Seleccionar...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Mensaje *</label>
                <textarea id="message" required rows={6} value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Cuéntanos brevemente tu proyecto: qué tienes, qué buscas, dónde está..."
                  className="w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] placeholder:text-[#8A8880] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none resize-none" />
              </div>
              <Button type="submit" disabled={!name || !email || !message}>Enviar mensaje</Button>
              <p className="font-mono-arch text-[0.55rem] tracking-[0.1em] text-[#8A8880]">Al enviar, se abrirá tu cliente de email con los datos del formulario.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Then `src/app/contacto/page.tsx` is a Server Component that exports metadata and renders the client:

```tsx
import type { Metadata } from 'next'
import ContactoClient from './ContactoClient'

export const metadata: Metadata = {
  title: 'Contacto — Tomo Studio',
  description: 'Cuéntanos tu proyecto. Estudio de arquitectura en Madrid.',
}

export default function ContactoPage() {
  return <ContactoClient />
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/archivo/ src/app/contacto/ src/app/privacidad/ src/app/aviso-legal/
git commit -m "feat: archivo, contacto (mailto form), privacidad and aviso-legal pages"
```

---

## Task 23: SEO — generateMetadata + JSON-LD + Sitemap

**Files:**
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx` (add JSON-LD)

- [ ] **Step 1: Create src/app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { journalPosts } from '@/data/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tomostudio.es'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/proyectos`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/estudio`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/servicios`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/proceso`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/archivo`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contacto`, lastModified: new Date(), priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: new Date(),
    priority: 0.85,
  }))

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map(p => ({
    url: `${base}/archivo/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...journalRoutes]
}
```

- [ ] **Step 2: Add Organization JSON-LD to root layout**

In `src/app/layout.tsx`, add a `<script>` tag inside `<body>` before the skip nav:

```tsx
// Add this import at top:
import { studio } from '@/data/studio'

// Inside <body>, before the skip nav link:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Tomo Studio',
      url: 'https://tomostudio.es',
      email: studio.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle del Pez 21, 2º izq.',
        addressLocality: 'Madrid',
        addressCountry: 'ES',
      },
      foundingDate: String(studio.founded),
      description: studio.tagline,
    }),
  }}
/>
```

- [ ] **Step 3: Add CreativeWork JSON-LD to project pages**

In `src/app/proyectos/[slug]/page.tsx`, inside the `<article>` element, add before closing tag:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.seoDesc,
      image: project.coverImage,
      dateCreated: String(project.year),
      locationCreated: {
        '@type': 'Place',
        name: project.location,
      },
      creator: {
        '@type': 'Organization',
        name: 'Tomo Studio',
      },
    }),
  }}
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: sitemap.ts and JSON-LD structured data for Organization and CreativeWork"
```

---

## Task 24: Vitest Tests

**Files:**
- Already created: `src/data/__tests__/types.test.ts`
- Already created: `src/data/__tests__/projects.test.ts`
- Already created: `src/lib/__tests__/filterProjects.test.ts`
- Create: `src/components/library/__tests__/LibraryFilter.test.tsx`
- Create: `src/components/__tests__/Header.test.tsx`

- [ ] **Step 1: Create LibraryFilter.test.tsx**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LibraryFilter from '../LibraryFilter'

const defaultProps = {
  view: 'estanteria' as const,
  onViewChange: vi.fn(),
  category: 'todos' as const,
  onCategoryChange: vi.fn(),
  sort: 'recientes' as const,
  onSortChange: vi.fn(),
  search: '',
  onSearchChange: vi.fn(),
  resultCount: 6,
}

describe('LibraryFilter', () => {
  it('renders view toggle buttons', () => {
    render(<LibraryFilter {...defaultProps} />)
    expect(screen.getByText('Estantería')).toBeTruthy()
    expect(screen.getByText('Portadas')).toBeTruthy()
    expect(screen.getByText('Índice')).toBeTruthy()
  })

  it('view button is aria-pressed when active', () => {
    render(<LibraryFilter {...defaultProps} view="portadas" />)
    const portadasBtn = screen.getByText('Portadas')
    expect(portadasBtn.getAttribute('aria-pressed')).toBe('true')
  })

  it('calls onViewChange when view button clicked', () => {
    const onViewChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onViewChange={onViewChange} />)
    fireEvent.click(screen.getByText('Portadas'))
    expect(onViewChange).toHaveBeenCalledWith('portadas')
  })

  it('calls onCategoryChange when category pill clicked', () => {
    const onCategoryChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onCategoryChange={onCategoryChange} />)
    fireEvent.click(screen.getByText('Residencial'))
    expect(onCategoryChange).toHaveBeenCalledWith('residencial')
  })

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onSearchChange={onSearchChange} />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    expect(onSearchChange).toHaveBeenCalledWith('Madrid')
  })

  it('shows empty state message when resultCount is 0', () => {
    render(<LibraryFilter {...defaultProps} resultCount={0} />)
    expect(screen.getByText('No hay volúmenes en esta categoría todavía.')).toBeTruthy()
  })

  it('shows count when results > 0', () => {
    render(<LibraryFilter {...defaultProps} resultCount={3} />)
    expect(screen.getByText('3 volúmenes')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Create Header.test.tsx**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../../layout/Header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/proyectos',
}))

describe('Header', () => {
  it('renders logo link', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /Tomo Studio/i })).toBeTruthy()
  })

  it('renders all nav links', () => {
    render(<Header />)
    expect(screen.getByText('Proyectos')).toBeTruthy()
    expect(screen.getByText('Estudio')).toBeTruthy()
    expect(screen.getByText('Contacto')).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run all tests**

```bash
pnpm test:run
```

Expected: all tests pass. If any fail due to missing mocks (e.g. `window.matchMedia` in ReducedMotionProvider), add to `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'

// jsdom missing matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
```

- [ ] **Step 4: Commit**

```bash
git add src/components/library/__tests__/ src/components/__tests__/ src/test/setup.ts
git commit -m "feat: Vitest component tests for LibraryFilter and Header"
```

---

## Task 25: Final Build Verification

- [ ] **Step 1: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Production build**

```bash
pnpm build
```

Expected: builds successfully with static generation for all project and journal slug pages.

- [ ] **Step 3: Check bundle size**

```bash
pnpm build 2>&1 | grep "First Load JS"
```

Target: main page First Load JS < 180 kB.

- [ ] **Step 4: Smoke test dev server**

```bash
pnpm dev
```

Visit:
- `http://localhost:3000` — home page renders, no console errors
- `http://localhost:3000/proyectos` — shelf view loads, spines visible
- `http://localhost:3000/proyectos/patio` — project detail page, all 7 chapters
- `http://localhost:3000/contacto` — form renders, submit opens mailto

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Tomo Studio — complete architecture portfolio demo"
```

---

## Self-Review Checklist

### Spec coverage

| Spec requirement | Task |
|-----------------|------|
| 5-state book interaction (SHELF→EXTRACT→FOCUSED→OPENING→PROJECT) | Task 13 |
| CSS 3D spines + hover | Task 11 |
| GSAP extraction 700ms power3.out | Task 13 |
| GSAP opening rotateY + zoom + fade | Task 14 |
| 3 library views (estantería/portadas/índice) | Task 17 |
| Filter by category (6 options) | Task 16 |
| Sort (recientes/año/ciudad) | Task 16 |
| Search (title + location) | Task 6 |
| sessionStorage view persistence | Task 17 |
| Empty state message | Task 16, 17 |
| 6 full projects (patio/monte/arco/acero/azulejo/lamina) | Task 4 |
| 7 chapters per project | Task 19 |
| Sticky project index + scroll spy | Task 18 |
| Mobile horizontal chapter chips | Task 18 |
| Material palette grid | Task 18 |
| Image gallery + lightbox | Task 18 |
| Technical sheet | Task 18 |
| Related projects (2) | Task 19 |
| Home 7 sections | Task 20 |
| Estudio page (team, philosophy, values) | Task 21 |
| Servicios page (7 services, deliverables) | Task 21 |
| Proceso page (6-step interactive timeline) | Task 21 |
| Archivo 4 posts + detail pages | Task 22 |
| Contacto form (mailto, all fields) | Task 22 |
| privacidad + aviso-legal | Task 22 |
| prefers-reduced-motion fallbacks | Tasks 7, 13, 14 |
| Skip nav | Task 8 |
| aria-label on interactive elements | Tasks 9–22 |
| generateMetadata per page | Tasks 17, 19, 22, 23 |
| JSON-LD Organization + CreativeWork | Task 23 |
| sitemap.ts | Task 23 |
| Vitest tests | Tasks 3, 4, 6, 24 |
| Google Fonts (Cormorant, Inter, IBM Plex Mono) | Task 8 |
| Tailwind v4 @theme tokens | Task 2 |
| Lenis smooth scroll | Task 7, 8 |
| GSAP lazy load (only on first book click) | Task 6, 13 |

### Placeholder scan

No TBD or TODO markers in any task. All code blocks are complete. All file paths are exact. Spanish text in all 6 project objects is complete.

### Type consistency

- `Project` interface defined in Task 3, used identically in Tasks 4, 11–20.
- `LibraryView` type (`'estanteria' | 'portadas' | 'indice'`) consistent across Tasks 16 and 17.
- `filterProjects(projects, category, query)` signature consistent between Task 6 (implementation) and Task 17 (usage).
- `BookState` (`'shelf' | 'extract' | 'focused' | 'opening'`) defined and used only in Task 13.
- `getProjectBySlug` / `getPostBySlug` defined in Tasks 4 and 5, used in Tasks 19 and 22.
