import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { journalPosts, getPostBySlug } from '@/data/journal'
import Button from '@/components/ui/Button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return journalPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Tomo Studio`,
    description: post.excerpt,
    openGraph: { images: [{ url: post.coverImage }] },
  }
}

export default async function ArchivoPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="min-h-screen pt-24 pb-24 bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.12em] text-[#8A8880] uppercase mb-4">
            {post.category} · {post.date}
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-[#111111] leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-inter text-lg text-[#8A8880] leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="relative w-full rounded-sm overflow-hidden mb-12 bg-[#E5E3DF]" style={{ aspectRatio: '16/9' }}>
          <Image
            src={post.coverImage}
            alt={`Imagen del artículo: ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div className="space-y-6 font-inter text-[#2C2C2C] leading-relaxed">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h2 key={i} className="font-cormorant text-2xl font-light text-[#111111] mt-8">
                  {paragraph.slice(2, -2)}
                </h2>
              )
            }
            return <p key={i}>{paragraph}</p>
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-[#E5E3DF]">
          <Button href="/archivo" variant="secondary">← Volver al archivo</Button>
        </div>
      </div>
    </article>
  )
}
