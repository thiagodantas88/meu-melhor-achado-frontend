import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { api } from '@/lib/api'
import type { Category } from '@/types'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

async function getCategory(slug: string): Promise<Category | null> {
  try {
    return await api.category(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug)
  if (!category) return {}
  return {
    title: category.name,
    description: category.description,
  }
}

export default async function CategoriaPage({ params }: Props) {
  const category = await getCategory(params.slug)
  if (!category) notFound()

  const articles = await api.articlesByCategory(params.slug, 12).catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">{category.icon}</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#1E3A5F' }}>
            {category.name}
          </h1>
        </div>
        {category.description && (
          <p className="max-w-2xl text-base leading-relaxed" style={{ color: '#6B7280' }}>
            {category.description}
          </p>
        )}
        <div className="mt-4 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4A373' }} />
      </div>

      {articles.length === 0 ? (
        <div className="py-16 text-center sm:py-20" style={{ color: '#6B7280' }}>
          <p className="mb-4 text-5xl">🔍</p>
          <p className="font-serif text-lg" style={{ color: '#1E3A5F' }}>Em breve por aqui</p>
          <p className="mt-2 text-sm">Estamos preparando os primeiros artigos desta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
