import Button from '@/components/ui/Button'

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 text-center bg-[#F8F7F4] border-t border-[#E5E3DF]" aria-label="Contacto">
      <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-6">¿Empezamos?</p>
      <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] max-w-3xl mx-auto leading-tight mb-10">
        Cuéntanos el próximo volumen de tu espacio.
      </h2>
      <Button href="/contacto" className="text-base px-8 py-4">
        Iniciar conversación
      </Button>
    </section>
  )
}
