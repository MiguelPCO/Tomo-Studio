'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/estudio', label: 'Estudio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/proceso', label: 'Proceso' },
  { href: '/archivo', label: 'Archivo' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-[#111111] shadow-lg' : 'py-5 bg-[#111111]'
      )}
      role="banner"
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-cormorant text-xl font-light text-[#F8F7F4] tracking-wide hover:text-[#C4673A] transition-colors"
          aria-label="Tomo Studio — Inicio"
        >
          Tomo Studio
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-mono-arch text-[0.65rem] tracking-[0.12em] uppercase transition-colors',
                pathname.startsWith(link.href)
                  ? 'text-[#F8F7F4]'
                  : 'text-[#8A8880] hover:text-[#F8F7F4]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#8A8880] hover:text-[#F8F7F4] transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="font-mono-arch text-[0.65rem] tracking-[0.12em] uppercase">
            {menuOpen ? 'Cerrar' : 'Menú'}
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="md:hidden bg-[#111111] border-t border-[#2C2C2C] px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'font-mono-arch text-[0.7rem] tracking-[0.12em] uppercase block py-1',
                    pathname.startsWith(link.href)
                      ? 'text-[#F8F7F4]'
                      : 'text-[#8A8880]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
