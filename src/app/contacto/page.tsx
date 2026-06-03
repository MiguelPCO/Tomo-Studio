import type { Metadata } from 'next'
import ContactoClient from './ContactoClient'

export const metadata: Metadata = {
  title: 'Contacto — Tomo Studio',
  description: 'Cuéntanos tu proyecto. Estudio de arquitectura en Madrid.',
}

export default function ContactoPage() {
  return <ContactoClient />
}
