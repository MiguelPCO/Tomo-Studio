import type { Metadata } from 'next'
import { services } from '@/data/services'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Servicios — Tomo Studio',
  description: 'Servicios de arquitectura, reforma, interiorismo y consultoría de Tomo Studio.',
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Servicios</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-4">Qué hacemos</h1>
        </div>
        <div className="divide-y divide-[#E5E3DF]">
          {services.map(service => (
            <div key={service.id} className="py-10 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-8">
              <div className="font-mono-arch text-2xl font-light text-[#C4673A]">{service.number}</div>
              <div>
                <h2 className="font-cormorant text-2xl font-light text-[#111111] mb-3">{service.title}</h2>
                <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed">{service.description}</p>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-3">Entregables</p>
                <ul className="flex flex-col gap-1">
                  {service.deliverables.map(d => (
                    <li key={d} className="font-inter text-sm text-[#2C2C2C] flex items-start gap-2">
                      <span className="text-[#C4673A] mt-1" aria-hidden="true">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-20 border-t border-[#E5E3DF] mt-8">
          <p className="font-cormorant text-3xl font-light text-[#111111] mb-6">¿Encaja con lo que buscas?</p>
          <Button href="/contacto">Hablemos</Button>
        </div>
      </div>
    </div>
  )
}
