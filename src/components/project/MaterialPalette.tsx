'use client'

import { motion } from 'motion/react'
import type { Material } from '@/data/types'

interface MaterialPaletteProps { materials: Material[] }

export default function MaterialPalette({ materials }: MaterialPaletteProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {materials.map((mat, i) => (
        <motion.div
          key={mat.name}
          className="group"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <div
            className="w-full h-24 rounded-sm mb-3 border border-[#E5E3DF]"
            style={{ backgroundColor: mat.colorHex ?? '#BEBBB5' }}
            aria-hidden="true"
          />
          <p className="font-inter text-sm font-medium text-[#111111]">{mat.name}</p>
          {mat.description && (
            <p className="font-mono-arch text-[0.6rem] tracking-[0.08em] text-[#8A8880] mt-1 leading-relaxed">
              {mat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
