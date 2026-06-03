import Link from 'next/link'
import { journalPosts } from '@/data/journal'
import JournalCard from '@/components/ui/JournalCard'

export default function JournalPreview() {
  const recent = journalPosts.slice(0, 3)
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto" aria-label="Archivo">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-3">Archivo</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-[#111111]">Últimas reflexiones</h2>
        </div>
        <Link href="/archivo" className="font-mono-arch text-[0.65rem] tracking-[0.1em] text-[#C4673A] hover:text-[#B35A30] transition-colors hidden md:block">
          Ver todo →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recent.map(post => <JournalCard key={post.id} post={post} />)}
      </div>
    </section>
  )
}
