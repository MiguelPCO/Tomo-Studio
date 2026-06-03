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
