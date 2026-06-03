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
        {view === 'estanteria' && (
          <BookExtractionSequence projects={sorted} />
        )}

        {view === 'portadas' && (
          sorted.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sorted.map((p, i) => (
                <ProjectBookCard key={p.id} project={p} priority={i < 4} />
              ))}
            </div>
          ) : <EmptyState />
        )}

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
          ) : <EmptyState />
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
