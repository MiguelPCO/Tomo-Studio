import type { Metadata } from 'next'
import { studio } from '@/data/studio'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Estudio — Tomo Studio',
  description: 'Equipo, filosofía y forma de trabajar de Tomo Studio. Arquitectura desde la escucha.',
}

export default function EstudioPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-2xl">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">El estudio</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-6">Tomo Studio</h1>
          <p className="font-inter text-[#2C2C2C] leading-relaxed">{studio.philosophy}</p>
        </div>

        <div className="mb-24">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-10">Equipo</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {studio.team.map(member => (
              <div key={member.name} className="flex gap-8">
                <div className="w-20 h-20 bg-[#E5E3DF] rounded-sm flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-cormorant text-2xl font-light text-[#111111] mb-1">{member.name}</h2>
                  <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#C4673A] uppercase mb-3">{member.role}</p>
                  <p className="font-inter text-sm text-[#2C2C2C] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 py-20 border-t border-[#E5E3DF]">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-10">Valores</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Escucha antes que forma', body: 'No comenzamos a dibujar hasta entender el problema. La forma es consecuencia, no punto de partida.' },
              { title: 'Materiales honestos', body: 'Preferimos los materiales que envejecen bien a los que parecen perfectos el día de la entrega.' },
              { title: 'Proyecto como proceso', body: 'Cada decisión se documenta. El volumen final es el resultado de cientos de elecciones conscientes.' },
            ].map(v => (
              <div key={v.title}>
                <h3 className="font-cormorant text-xl font-light text-[#111111] mb-3">{v.title}</h3>
                <p className="font-inter text-sm text-[#8A8880] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-20 border-t border-[#E5E3DF]">
          <Button href="/contacto">Trabajemos juntos</Button>
        </div>
      </div>
    </div>
  )
}
