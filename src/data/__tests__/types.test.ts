import { describe, it, expect } from 'vitest'
import type { Project } from '../types'

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
