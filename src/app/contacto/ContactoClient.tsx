'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { studio } from '@/data/studio'

const PROJECT_TYPES = [
  'Vivienda nueva', 'Reforma integral', 'Interiorismo',
  'Espacio comercial', 'Edificio cultural', 'Consultoría', 'Otro',
]

export default function ContactoClient() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(`Nombre: ${name}\nTipo de proyecto: ${type}\n\n${message}`)
    const subject = encodeURIComponent(`Consulta de proyecto — ${name}`)
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`
  }

  const inputClass = "w-full bg-[#E5E3DF] font-inter text-sm text-[#2C2C2C] px-4 py-3 rounded-sm border border-transparent focus-visible:border-[#C4673A] focus-visible:outline-none"

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Contacto</p>
            <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight mb-12">
              Cuéntanos el próximo volumen de tu espacio.
            </h1>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Email</p>
                <a href={`mailto:${studio.email}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">{studio.email}</a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Teléfono</p>
                <a href={`tel:${studio.phone}`} className="font-inter text-[#2C2C2C] hover:text-[#C4673A] transition-colors">{studio.phone}</a>
              </div>
              <div>
                <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-1">Estudio</p>
                <address className="font-inter text-[#2C2C2C] not-italic">{studio.address}</address>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div>
                <label htmlFor="name" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Nombre *</label>
                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Email *</label>
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="type" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Tipo de proyecto</label>
                <select id="type" value={type} onChange={e => setType(e.target.value)} className={inputClass}>
                  <option value="">Seleccionar...</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase block mb-2">Mensaje *</label>
                <textarea
                  id="message" required rows={6}
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Cuéntanos brevemente tu proyecto: qué tienes, qué buscas, dónde está..."
                  className={`${inputClass} resize-none placeholder:text-[#8A8880]`}
                />
              </div>
              <Button type="submit" disabled={!name || !email || !message}>Enviar mensaje</Button>
              <p className="font-mono-arch text-[0.55rem] tracking-[0.1em] text-[#8A8880]">
                Al enviar, se abrirá tu cliente de email con los datos del formulario.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
