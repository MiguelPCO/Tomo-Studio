import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { journalPosts } from '@/data/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tomostudio.es'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/proyectos`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/estudio`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/servicios`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/proceso`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/archivo`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contacto`, lastModified: new Date(), priority: 0.6 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: new Date(),
    priority: 0.85,
  }))

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map(p => ({
    url: `${base}/archivo/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...journalRoutes]
}
