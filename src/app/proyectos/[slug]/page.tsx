import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/data/projects'
import ProjectIndex from '@/components/project/ProjectIndex'
import ProjectChapter from '@/components/project/ProjectChapter'
import MaterialPalette from '@/components/project/MaterialPalette'
import ImageGallery from '@/components/project/ImageGallery'
import TechnicalSheet from '@/components/project/TechnicalSheet'
import Button from '@/components/ui/Button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.seoTitle,
    description: project.seoDesc,
    openGraph: {
      title: project.seoTitle,
      description: project.seoDesc,
      images: [{ url: project.coverImage, width: 1200, height: 900 }],
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  residencial: 'Residencial', interiorismo: 'Interiorismo',
  reforma: 'Reforma', comercial: 'Comercial', cultural: 'Cultural',
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const relatedProjects = project.related
    .map(s => getProjectBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <article className="bg-[#F8F7F4] min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.title} — imagen principal`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-white/60 uppercase mb-2">
            Vol. {project.volumeNumber} — {CATEGORY_LABELS[project.category]}
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-white leading-tight">
            {project.title}
          </h1>
          <p className="font-mono-arch text-[0.7rem] tracking-[0.1em] text-white/60 mt-2">
            {project.location} · {project.year} · {project.surface ?? '—'}
          </p>
        </div>
      </div>

      {/* Cover phrase */}
      <div className="px-6 md:px-12 py-12 border-b border-[#E5E3DF]">
        <blockquote className="font-cormorant text-2xl md:text-3xl font-light italic text-[#111111] max-w-2xl">
          &ldquo;{project.coverPhrase}&rdquo;
        </blockquote>
      </div>

      {/* Content layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <div className="flex gap-12">
          <ProjectIndex />
          <div className="flex-1 min-w-0">
            <ProjectChapter id="concepto" number="01" title="Concepto">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">{project.chapters.concepto}</p>
            </ProjectChapter>
            <ProjectChapter id="contexto" number="02" title="Contexto">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">{project.chapters.contexto}</p>
            </ProjectChapter>
            <ProjectChapter id="proceso" number="03" title="Proceso">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose">{project.chapters.proceso}</p>
            </ProjectChapter>
            <ProjectChapter id="materialidad" number="04" title="Materialidad">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">{project.chapters.materialidad}</p>
              <MaterialPalette materials={project.materials} />
            </ProjectChapter>
            <ProjectChapter id="planos" number="05" title="Planos">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">{project.chapters.planos}</p>
              <div className="relative w-full bg-[#E5E3DF] rounded-sm overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={project.gallery[0]}
                  alt={`Planos de ${project.title}`}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            </ProjectChapter>
            <ProjectChapter id="galeria" number="06" title="Galería">
              <p className="font-inter text-[#2C2C2C] leading-relaxed max-w-prose mb-8">{project.chapters.galeria}</p>
              <ImageGallery images={project.gallery} projectTitle={project.title} />
            </ProjectChapter>
            <ProjectChapter id="ficha" number="07" title="Ficha técnica">
              <TechnicalSheet data={project.technical} />
            </ProjectChapter>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="py-20 border-t border-[#E5E3DF] mt-8">
            <p className="font-mono-arch text-[0.6rem] tracking-[0.14em] text-[#8A8880] uppercase mb-8">Volúmenes relacionados</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {relatedProjects.map(rel => (
                <Link key={rel.id} href={`/proyectos/${rel.slug}`} className="group flex items-center gap-4">
                  <div className="w-3 h-16 rounded-sm flex-shrink-0" style={{ backgroundColor: rel.spineColor }} aria-hidden="true" />
                  <div>
                    <p className="font-mono-arch text-[0.55rem] tracking-[0.12em] text-[#8A8880]">Vol. {rel.volumeNumber}</p>
                    <p className="font-cormorant text-xl font-light text-[#111111] group-hover:text-[#C4673A] transition-colors">{rel.title}</p>
                    <p className="font-mono-arch text-[0.6rem] tracking-[0.08em] text-[#8A8880]">{rel.location} · {rel.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="py-20 text-center border-t border-[#E5E3DF]">
          <p className="font-cormorant text-3xl md:text-4xl font-light text-[#111111] mb-6">¿Empezamos el próximo volumen?</p>
          <Button href="/contacto">Cuéntanos tu proyecto</Button>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.seoDesc,
            image: project.coverImage,
            dateCreated: String(project.year),
            locationCreated: { '@type': 'Place', name: project.location },
            creator: { '@type': 'Organization', name: 'Tomo Studio' },
          }),
        }}
      />
    </article>
  )
}
