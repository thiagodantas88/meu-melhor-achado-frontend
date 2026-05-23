import type { MetadataRoute } from 'next'
import { api } from '@/lib/api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://meumelhorachado.com.br'

const staticRoutes = ['', '/sobre', '/politica-de-afiliados', '/ofertas']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const urls: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/ofertas' ? 'daily' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))

  try {
    const [categories, articles] = await Promise.all([api.categories(), api.articles(100)])

    urls.push(
      ...categories.map((category) => ({
        url: `${SITE_URL}/categoria/${category.slug}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })),
      ...articles.map((article) => ({
        url: `${SITE_URL}/artigo/${article.slug}`,
        lastModified: article.publishedAt ? new Date(`${article.publishedAt}T00:00:00-03:00`) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })),
    )
  } catch (error) {
    console.error('Erro ao gerar sitemap dinamico', error)
  }

  return urls
}
