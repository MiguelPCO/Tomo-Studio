'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ImageGalleryProps {
  images: string[]
  projectTitle: string
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((src, i) => (
          <motion.button
            key={src}
            className={`relative overflow-hidden rounded-sm bg-[#E5E3DF] cursor-zoom-in ${i === 0 ? 'md:col-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            aria-label={`Ver imagen ${i + 1} del proyecto ${projectTitle}`}
          >
            <Image
              src={src}
              alt={`${projectTitle} — imagen ${i + 1}`}
              fill
              className="object-cover"
              sizes={i === 0 ? '(max-width: 768px) 100vw, 80vw' : '(max-width: 768px) 100vw, 40vw'}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white font-mono-arch text-[0.65rem] tracking-[0.1em] uppercase"
              onClick={() => setLightbox(null)}
            >
              Cerrar
            </button>
            <div className="relative w-full max-w-5xl" style={{ aspectRatio: '16/10' }}>
              <Image
                src={images[lightbox]}
                alt={`${projectTitle} — imagen ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
