'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { processSteps } from '@/data/studio'

export default function ProcessTimeline() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <div className="divide-y divide-[#E5E3DF]">
      {processSteps.map(step => (
        <div key={step.number}>
          <button
            className="w-full flex items-center gap-6 py-6 text-left hover:bg-[#E5E3DF]/30 transition-colors px-2 -mx-2 rounded-sm"
            onClick={() => setOpen(open === step.number ? null : step.number)}
            aria-expanded={open === step.number}
            aria-controls={`step-${step.number}`}
          >
            <span className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#C4673A] w-8 flex-shrink-0">
              {step.number}
            </span>
            <span className="font-cormorant text-2xl font-light text-[#111111] flex-1">
              {step.title}
            </span>
            <span className="font-mono-arch text-[0.65rem] text-[#8A8880]" aria-hidden="true">
              {open === step.number ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {open === step.number && (
              <motion.div
                id={`step-${step.number}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <p className="font-inter text-[#2C2C2C] leading-relaxed">{step.description}</p>
                  <div className="relative aspect-video rounded-sm overflow-hidden bg-[#E5E3DF]">
                    <Image
                      src={step.imageUrl}
                      alt={`Imagen de la fase ${step.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
