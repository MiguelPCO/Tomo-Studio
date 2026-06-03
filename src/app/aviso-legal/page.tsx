import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Aviso legal — Tomo Studio' }

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl font-light text-[#111111] mb-12">Aviso legal</h1>
        <div className="font-inter text-sm text-[#2C2C2C] leading-relaxed space-y-6">
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Titular del sitio</h2>
          <p>Tomo Studio es un estudio de arquitectura ficticio creado como demostración de portfolio. Este sitio web es una pieza de demostración sin actividad comercial real.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Propiedad intelectual</h2>
          <p>Los textos, imágenes (procedentes de Unsplash, bajo licencia libre) y el código fuente de este sitio son propiedad de su autor y están protegidos por las leyes de propiedad intelectual.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Responsabilidad</h2>
          <p>El contenido de este sitio es ficticio. Cualquier similitud con personas, proyectos o estudios reales es coincidencia.</p>
          <p className="text-[#8A8880]">Última actualización: junio 2025.</p>
        </div>
      </div>
    </div>
  )
}
