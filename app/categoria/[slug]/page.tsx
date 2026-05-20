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
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#1E3A5F' }}>
            {category.name}
          </h1>
        </div>
        <p className="text-base" style={{ color: '#6B7280' }}>{category.description}</p>
        <div className="mt-4 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4A373' }} />
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="text-center py-20" style={{ color: '#6B7280' }}>
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-serif" style={{ color: '#1E3A5F' }}>Em breve por aqui</p>
          <p className="text-sm mt-2">Estamos preparando os primeiros artigos desta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
