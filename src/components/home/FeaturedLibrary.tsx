import Link from 'next/link'
import { getFeaturedProjects } from '@/data/projects'
import ProjectBookCard from '@/components/library/ProjectBookCard'

export default function FeaturedLibrary() {
  const featured = getFeaturedProjects().slice(0, 4)
  return (
    <section className="py-24 bg-[#E5E3DF]/30" aria-label="Proyectos destacados">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Biblioteca</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111]">Proyectos destacados</h2>
          </div>
          <Link href="/proyectos" className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#B35A30] transition-colors hidden md:block">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProjectBookCard key={p.id} project={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
