import type { Metadata } from 'next'
import ProcessTimeline from '@/components/ui/ProcessTimeline'

export const metadata: Metadata = {
  title: 'Proceso — Tomo Studio',
  description: 'Las seis fases del método de trabajo de Tomo Studio: Escucha, Concepto, Materia, Proyecto, Obra, Entrega.',
}

export default function ProcesoPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Método</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111] mb-4">Proceso</h1>
          <p className="font-inter text-[#8A8880] max-w-lg">
            Seis fases. De la primera conversación a la visita de seguimiento. Cada fase es un compromiso, no un trámite.
          </p>
        </div>
        <ProcessTimeline />
      </div>
    </div>
  )
}
