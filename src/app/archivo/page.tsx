import type { Metadata } from 'next'
import { journalPosts } from '@/data/journal'
import JournalCard from '@/components/ui/JournalCard'

export const metadata: Metadata = {
  title: 'Archivo — Tomo Studio',
  description: 'Reflexiones sobre arquitectura, materiales y proceso de Tomo Studio.',
}

export default function ArchivoPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Archivo</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-[#111111]">Reflexiones</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {journalPosts.map(post => <JournalCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
