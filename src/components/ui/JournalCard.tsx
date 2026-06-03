'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { JournalPost } from '@/data/types'

interface JournalCardProps { post: JournalPost }

export default function JournalCard({ post }: JournalCardProps) {
  return (
    <motion.article whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Link href={`/archivo/${post.slug}`} className="block group">
        <div className="relative w-full overflow-hidden rounded-sm bg-[#E5E3DF] mb-4" style={{ aspectRatio: '4/3' }}>
          <Image
            src={post.coverImage}
            alt={`Imagen del artículo: ${post.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-2">
          {post.category} · {post.date}
        </p>
        <h3 className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="font-inter text-sm text-[#8A8880] leading-relaxed line-clamp-2">{post.excerpt}</p>
      </Link>
    </motion.article>
  )
}
