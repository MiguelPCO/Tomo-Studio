'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { Project } from '@/data/types'
import Button from '@/components/ui/Button'
import BookOpenTransition from './BookOpenTransition'

interface FocusedBookProps {
  project: Project
  onOpen: (slug: string) => void
  onClose: () => void
  isOpening: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  residencial: 'Residencial',
  interiorismo: 'Interiorismo',
  reforma: 'Reforma',
  comercial: 'Comercial',
  cultural: 'Cultural',
}

const STATUS_LABELS: Record<string, string> = {
  construido: 'Construido',
  'en-proceso': 'En proceso',
  concepto: 'Concepto',
}

export default function FocusedBook({ project, onOpen, onClose, isOpening }: FocusedBookProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-label={`Proyecto ${project.title}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-3xl w-full">
          {/* Book cover */}
          <motion.div
            className="relative flex-shrink-0"
            style={{ width: 200, height: 280 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Image
              src={project.coverImage}
              alt={`Portada del proyecto ${project.title}`}
              fill
              className="object-cover rounded-sm"
              sizes="200px"
            />
            <div className="absolute inset-0 rounded-sm" style={{ boxShadow: '8px 8px 32px rgba(0,0,0,0.25)' }} />
            {/* Spine color strip */}
            <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-sm" style={{ background: `linear-gradient(to right, ${project.spineColor}88, transparent)` }} />
          </motion.div>

          {/* Metadata panel */}
          <motion.div
            className="flex flex-col gap-4 text-center md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          >
            <div>
              <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-1">
                Vol. {project.volumeNumber} — {CATEGORY_LABELS[project.category]}
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight">
                {project.title}
              </h2>
            </div>

            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#8A8880]">
              {project.location} · {project.year} · {project.surface ?? '—'}
            </p>

            <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed max-w-xs">
              {project.shortDesc}
            </p>

            <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] uppercase">
              {STATUS_LABELS[project.status]}
            </p>

            <div className="flex gap-3 justify-center md:justify-start mt-2">
              <Button onClick={() => onOpen(project.slug)}>
                Abrir proyecto
              </Button>
              <Button variant="ghost" onClick={onClose} aria-label="Cerrar y volver a la biblioteca">
                Cerrar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Opening animation */}
      {isOpening && (
        <BookOpenTransition
          project={project}
          onComplete={() => {/* router.push already called in parent */}}
        />
      )}
    </>
  )
}
