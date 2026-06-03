'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'

interface BookSpineProps {
  project: Project
  onExtract: (project: Project, el: HTMLElement) => void
  dimmed?: boolean
}

export default function BookSpine({ project, onExtract, dimmed = false }: BookSpineProps) {
  const reduced = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onExtract(project, e.currentTarget)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative flex-shrink-0 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-[#C4673A]',
        'preserve-3d transition-opacity duration-300',
        dimmed ? 'opacity-30' : 'opacity-100'
      )}
      style={{
        width: '36px',
        height: '220px',
        backgroundColor: project.spineColor,
      }}
      whileHover={reduced ? {} : {
        x: -6,
        rotateY: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      aria-label={`Abrir proyecto ${project.title}, volumen ${project.volumeNumber}`}
    >
      {/* Volume number — rotated text along spine */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
      >
        <span className="font-mono-arch text-[0.5rem] tracking-[0.18em] text-white/40 uppercase">
          {project.volumeNumber}
        </span>
      </span>

      {/* Title — bottom of spine */}
      <span
        className="absolute bottom-3 left-1/2"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg) translateX(50%)' }}
      >
        <span className="font-cormorant text-[0.7rem] font-light text-white/80 whitespace-nowrap">
          {project.title}
        </span>
      </span>

      {/* Hover tooltip */}
      <motion.div
        className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-[#111111] text-[#F8F7F4] px-3 py-2 rounded-sm pointer-events-none whitespace-nowrap z-10"
        initial={{ opacity: 0, x: 4 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        role="tooltip"
      >
        <p className="font-mono-arch text-[0.55rem] tracking-[0.1em] text-[#8A8880]">
          VOL. {project.volumeNumber}
        </p>
        <p className="font-cormorant text-sm font-light">{project.title}</p>
        <p className="font-mono-arch text-[0.55rem] tracking-[0.08em] text-[#8A8880]">
          {project.location} · {project.year}
        </p>
      </motion.div>
    </motion.button>
  )
}
