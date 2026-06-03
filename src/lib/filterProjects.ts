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
