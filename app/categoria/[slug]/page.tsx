import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/mock-data'
import ArticleCard from '@/components/ArticleCard'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.description,
  }
}

export default function CategoriaPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const articles = getArticlesByCategory(params.slug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">{category.icon}</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#1E3A5F' }}>
            {category.name}
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: '#6B7280' }}>{category.description}</p>
        <div className="mt-4 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4A373' }} />
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="py-16 text-center sm:py-20" style={{ color: '#6B7280' }}>
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-serif" style={{ color: '#1E3A5F' }}>Em breve por aqui</p>
          <p className="text-sm mt-2">Estamos preparando os primeiros artigos desta categoria.</p>
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
