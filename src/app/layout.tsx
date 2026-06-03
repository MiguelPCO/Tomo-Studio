import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from 'next/font/google'
import { ReducedMotionProvider } from '@/components/providers/ReducedMotionProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tomo Studio — Arquitectura de autor',
  description: 'Estudio de arquitectura con sede en Madrid. Cada proyecto merece su propio volumen.',
  metadataBase: new URL('https://tomostudio.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Tomo Studio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <ReducedMotionProvider>
          <LenisProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C4673A] focus:text-[#F8F7F4]">
              Saltar al contenido
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </LenisProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  )
}
