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
