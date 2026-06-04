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
      <div className="flex items-end justify-center gap-3 px-8" style={{ minHeight: '260px' }}>
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
