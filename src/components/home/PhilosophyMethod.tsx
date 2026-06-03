'use client'

import { motion } from 'motion/react'
import { processSteps } from '@/data/studio'

export default function PhilosophyMethod() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Método">
      <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Método</p>
      <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] mb-16">Cómo trabajamos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.number}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="w-px h-8 bg-[#C4673A]" aria-hidden="true" />
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#C4673A]">{step.number}</p>
            <h3 className="font-cormorant text-lg font-light text-[#111111]">{step.title}</h3>
            <p className="font-inter text-xs text-[#8A8880] leading-relaxed line-clamp-4">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
