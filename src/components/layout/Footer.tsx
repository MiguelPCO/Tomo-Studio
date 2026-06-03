import Link from 'next/link'
import { studio } from '@/data/studio'

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#8A8880] pt-16 pb-8" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-cormorant text-2xl font-light text-[#F8F7F4] mb-3">
              Tomo Studio
            </p>
            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] leading-relaxed">
              {studio.address}
            </p>
            <p className="font-mono-arch text-[0.65rem] tracking-[0.1em] mt-2">
              <a href={`mailto:${studio.email}`} className="hover:text-[#F8F7F4] transition-colors">
                {studio.email}
              </a>
            </p>
          </div>

          <nav aria-label="Navegación secundaria">
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] uppercase text-[#5A5A5A] mb-4">
              Navegación
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/proyectos', label: 'Proyectos' },
                { href: '/estudio', label: 'Estudio' },
                { href: '/servicios', label: 'Servicios' },
                { href: '/proceso', label: 'Proceso' },
                { href: '/archivo', label: 'Archivo' },
                { href: '/contacto', label: 'Contacto' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] uppercase text-[#5A5A5A] mb-4">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/privacidad" className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="font-mono-arch text-[0.65rem] tracking-[0.1em] hover:text-[#F8F7F4] transition-colors">
                  Aviso legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2C2C2C] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.1em]">
            © {new Date().getFullYear()} Tomo Studio. Todos los derechos reservados.
          </p>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.1em]">
            Madrid — {studio.founded}
          </p>
        </div>
      </div>
    </footer>
  )
}
