import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de privacidad — Tomo Studio' }

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-cormorant text-4xl font-light text-[#111111] mb-12">Política de privacidad</h1>
        <div className="font-inter text-sm text-[#2C2C2C] leading-relaxed space-y-6">
          <p>Tomo Studio es responsable del tratamiento de los datos personales que nos facilites a través de este sitio web.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Datos recopilados</h2>
          <p>El formulario de contacto de este sitio web funciona mediante un enlace <em>mailto:</em> que abre tu cliente de correo electrónico. El Estudio no recopila ni almacena automáticamente ningún dato personal a través del sitio web.</p>
          <h2 className="font-cormorant text-xl font-light text-[#111111]">Derechos</h2>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad contactando con nosotros en hola@tomostudio.es.</p>
          <p className="text-[#8A8880]">Última actualización: junio 2025.</p>
        </div>
      </div>
    </div>
  )
}
