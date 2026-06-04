'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/gsap'
import type { Project } from '@/data/types'

interface BookOpenTransitionProps {
  project: Project
  onComplete: () => void
}

export default function BookOpenTransition({ project, onComplete }: BookOpenTransitionProps) {
  const coverRef = useRef<HTMLDivElement>(null)
  const spreadRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const gsap = await loadGsap()
      if (cancelled || !coverRef.current || !spreadRef.current || !overlayRef.current) return

      const tl = gsap.timeline()

      // Step 1 (0–300ms): cover rotates open
      tl.to(coverRef.current, {
        rotateY: -30,
        duration: 0.3,
        ease: 'power2.in',
      })

      // Step 2 (300–500ms): double-page spread fades in
      tl.to(spreadRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
      })

      // Step 3 (500–900ms): scale + fade to white
      tl.to(coverRef.current, {
        scale: 8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'none',
        onComplete: () => { if (!cancelled) onComplete() },
      }, '-=0.1')
    }

    run()
    return () => { cancelled = true }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Cover element */}
      <div
        ref={coverRef}
        className="relative"
        style={{
          width: 200, height: 280,
          backgroundColor: project.spineColor,
          borderRadius: 4,
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-end p-4">
          <p className="font-cormorant text-xl font-light text-white/90">{project.title}</p>
        </div>
      </div>

      {/* Double-page spread flash */}
      <div
        ref={spreadRef}
        className="absolute"
        style={{ opacity: 0, width: 400, height: 280, display: 'flex' }}
        aria-hidden="true"
      >
        <div className="flex-1 bg-[#111111] flex items-center justify-center border-r border-[#2C2C2C]">
          <p className="font-mono-arch text-[0.55rem] tracking-[0.14em] text-[#8A8880] uppercase text-center px-4">
            Índice del volumen
          </p>
        </div>
        <div className="flex-1 bg-[#F8F7F4]" />
      </div>

      {/* White fade overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#F8F7F4]"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </div>
  )
}
