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
          : `${resultCount} volúmen${resultCount !== 1 ? 'es' : ''}`}
      </p>
    </div>
  )
}
