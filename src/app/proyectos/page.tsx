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
