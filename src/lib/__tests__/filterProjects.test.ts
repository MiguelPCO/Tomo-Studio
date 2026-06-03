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
