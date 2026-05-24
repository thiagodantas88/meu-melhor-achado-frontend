import Link from 'next/link'
import type { Article } from '@/types'

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="mt-14 border-t pt-8" style={{ borderColor: '#E8E0D5' }}>
      <h2 className="mb-5 font-serif text-xl font-bold" style={{ color: '#1E3A5F' }}>
        Leia também
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/artigo/${article.slug}`}
            className="group flex items-start gap-3 rounded-lg border p-4 transition-shadow hover:shadow-md"
            style={{ borderColor: '#E8E0D5', backgroundColor: '#FAFAFA' }}
          >
            <span className="shrink-0 text-2xl">{article.category.icon}</span>
            <div>
              <p
                className="text-sm font-semibold leading-snug transition-opacity group-hover:opacity-80"
                style={{ color: '#1E3A5F' }}
              >
                {article.title}
              </p>
              <p className="mt-1 text-xs" style={{ color: '#6B7280' }}>
                {article.category.name} · {article.readingTime} min
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
