'use client'

import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'
import { loadGsap } from '@/lib/gsap'
import ProjectShelf from './ProjectShelf'
import FocusedBook from './FocusedBook'
import BookOpenTransition from './BookOpenTransition'

type BookState = 'shelf' | 'extract' | 'focused' | 'opening'

interface BookExtractionSequenceProps {
  projects: Project[]
}

export default function BookExtractionSequence({ projects }: BookExtractionSequenceProps) {
  const [state, setState] = useState<BookState>('shelf')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const flyingRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const router = useRouter()

  const handleExtract = useCallback(async (project: Project, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    setActiveProject(project)

    if (reduced) {
      setState('focused')
      return
    }

    setState('extract')

    // Wait one frame so flyingRef mounts
    await new Promise<void>(r => requestAnimationFrame(() => r()))

    const gsap = await loadGsap()
    if (!flyingRef.current) return

    const COVER_W = 200
    const COVER_H = 280
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    const startX = rect.left + rect.width / 2 - cx
    const startY = rect.top + rect.height / 2 - cy
    const startScaleX = rect.width / COVER_W
    const startScaleY = rect.height / COVER_H

    // Position flying book at spine location
    gsap.set(flyingRef.current, {
      x: startX,
      y: startY,
      scaleX: startScaleX,
      scaleY: startScaleY,
      rotateZ: 0,
      opacity: 1,
    })

    // 3-step extraction sequence
    const tl = gsap.timeline({ onComplete: () => setState('focused') })

    // Step 1 (0–200ms): lift from shelf with slight tilt
    tl.to(flyingRef.current, {
      y: startY - 60,
      rotateZ: 3,
      duration: 0.2,
      ease: 'power2.out',
    })

    // Step 2 (200–700ms): fly to center, expand to cover size, straighten
    tl.to(flyingRef.current, {
      x: 0, y: 0, scaleX: 1, scaleY: 1,
      rotateZ: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [reduced])

  const handleOpenProject = useCallback(async (slug: string) => {
    if (reduced) {
      router.push(`/proyectos/${slug}`)
      return
    }
    setState('opening')
    setTimeout(() => router.push(`/proyectos/${slug}`), 900)
  }, [reduced, router])

  const handleClose = useCallback(() => {
    setActiveProject(null)
    setState('shelf')
  }, [])

  return (
    <div className="relative w-full">
      {/* Shelf — always rendered */}
      <ProjectShelf
        projects={projects}
        activeSlug={activeProject?.slug ?? null}
        onExtract={handleExtract}
      />

      {/* Backdrop */}
      <AnimatePresence>
        {(state === 'extract' || state === 'focused' || state === 'opening') && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={state === 'focused' ? handleClose : undefined}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Flying book (extract state only) */}
      {state === 'extract' && activeProject && (
        <div
          ref={flyingRef}
          className="fixed z-50 pointer-events-none overflow-hidden rounded-sm"
          style={{
            left: '50%',
            top: '50%',
            width: 200,
            height: 280,
            marginLeft: -100,
            marginTop: -140,
            backgroundColor: activeProject.spineColor,
            boxShadow: '8px 8px 32px rgba(0,0,0,0.3)',
          }}
          aria-hidden="true"
        >
          <Image
            src={activeProject.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      )}

      {/* Focused state */}
      <AnimatePresence>
        {(state === 'focused' || state === 'opening') && activeProject && (
          <FocusedBook
            project={activeProject}
            onOpen={handleOpenProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Book opening transition — rendered at top level so z-index is never trapped */}
      {state === 'opening' && activeProject && (
        <BookOpenTransition
          project={activeProject}
          onComplete={() => {}}
        />
      )}
    </div>
  )
}
