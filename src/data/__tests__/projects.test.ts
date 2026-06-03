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
