import Link from 'next/link'
import { services } from '@/data/services'
import ServiceCard from '@/components/ui/ServiceCard'

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-[#111111]" aria-label="Servicios">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Servicios</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#F8F7F4]">Qué hacemos</h2>
          </div>
          <Link href="/servicios" className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#D4773A] transition-colors hidden md:block">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2C2C2C]">
          {services.slice(0, 6).map(s => (
            <ServiceCard key={s.id} service={s} dark />
          ))}
        </div>
      </div>
    </section>
  )
}
