'use client'

import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'
import { motion } from 'motion/react'

interface ProjectChapterProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

export default function ProjectChapter({ id, number, title, children }: ProjectChapterProps) {
  const reduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      className="py-16 border-b border-[#E5E3DF] scroll-mt-28"
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880]">{number}</span>
        <h2 className="font-cormorant text-2xl md:text-3xl font-light text-[#111111]">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
