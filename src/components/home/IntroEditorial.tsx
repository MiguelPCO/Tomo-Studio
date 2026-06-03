import { studio } from '@/data/studio'

export default function IntroEditorial() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Filosofía">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-6">Estudio</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] leading-tight mb-8">
            {studio.philosophy}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 pt-8">
          {[
            { num: String(new Date().getFullYear() - studio.founded), label: 'Años de práctica' },
            { num: '6', label: 'Volúmenes en biblioteca' },
            { num: '7', label: 'Tipologías de proyecto' },
            { num: '5', label: 'Ciudades' },
            { num: '2', label: 'Profesionales' },
            { num: String(studio.founded), label: `Fundado en ${studio.city}` },
          ].map(stat => (
            <div key={stat.label}>
              <p className="font-cormorant text-4xl font-light text-[#C4673A]">{stat.num}</p>
              <p className="font-mono-arch text-[0.6rem] tracking-[0.1em] text-[#8A8880] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
