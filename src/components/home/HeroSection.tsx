'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Button from '@/components/ui/Button'
import { getFeaturedProjects } from '@/data/projects'

export default function HeroSection() {
  const featured = getFeaturedProjects()[0]
  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden bg-[#111111]" aria-label="Inicio">
      {featured && (
        <Image
          src={featured.heroImage}
          alt={`Imagen del proyecto ${featured.title}`}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
      )}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-white/50 uppercase mb-4">
            Tomo Studio — Madrid
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight mb-6 max-w-4xl">
            Cada proyecto merece su propio volumen.
          </h1>
          <p className="font-inter text-[#8A8880] max-w-md mb-10 leading-relaxed">
            Arquitectura de autor desde la escucha, el lugar y la materia. Una biblioteca de seis volúmenes construidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/proyectos">Ver proyectos</Button>
            <Button href="/estudio" variant="secondary">Conocer el estudio</Button>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-white/20" />
        <span className="font-mono-arch text-[0.5rem] tracking-[0.18em] text-white/30 uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
