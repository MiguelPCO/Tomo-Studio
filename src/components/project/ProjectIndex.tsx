'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const CHAPTERS = [
  { id: 'concepto', label: 'Concepto' },
  { id: 'contexto', label: 'Contexto' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'materialidad', label: 'Materialidad' },
  { id: 'planos', label: 'Planos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'ficha', label: 'Ficha técnica' },
]

export default function ProjectIndex() {
  const [active, setActive] = useState('concepto')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    CHAPTERS.forEach(ch => {
      const el = document.getElementById(ch.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav className="hidden lg:block sticky top-28 w-40 flex-shrink-0 self-start" aria-label="Índice del proyecto">
        <p className="font-mono-arch text-[0.55rem] tracking-[0.14em] text-[#8A8880] uppercase mb-4">Índice</p>
        <ul className="flex flex-col gap-2">
          {CHAPTERS.map(ch => (
            <li key={ch.id}>
              <button
                onClick={() => scrollTo(ch.id)}
                className={cn(
                  'font-mono-arch text-[0.6rem] tracking-[0.1em] text-left transition-colors w-full',
                  active === ch.id ? 'text-[#C4673A]' : 'text-[#8A8880] hover:text-[#2C2C2C]'
                )}
              >
                {active === ch.id && <span className="inline-block w-3 h-px bg-[#C4673A] mr-2 align-middle" />}
                {ch.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile horizontal chips */}
      <nav
        className="lg:hidden sticky top-16 z-30 bg-[#F8F7F4]/95 backdrop-blur-sm border-b border-[#E5E3DF] -mx-6 px-6 py-3 overflow-x-auto"
        aria-label="Índice del proyecto"
      >
        <div className="flex gap-4 min-w-max">
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => scrollTo(ch.id)}
              className={cn(
                'font-mono-arch text-[0.6rem] tracking-[0.1em] whitespace-nowrap pb-1 border-b transition-colors',
                active === ch.id ? 'text-[#C4673A] border-[#C4673A]' : 'text-[#8A8880] border-transparent'
              )}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
