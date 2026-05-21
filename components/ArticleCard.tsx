import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artigo/${article.slug}`} className="card group block">
      <div className="relative h-44 w-full overflow-hidden sm:h-48" style={{ backgroundColor: '#F5EFE6' }}>
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {article.category.icon}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge bg-white text-xs font-semibold shadow-sm px-2.5 py-1 rounded-full" style={{ color: '#1E3A5F' }}>
            {article.category.icon} {article.category.name}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3
          className="font-serif text-lg font-bold leading-snug line-clamp-2 transition-colors group-hover:opacity-80"
          style={{ color: '#1E3A5F' }}
        >
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: '#6B7280' }}>
          {article.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: '#6B7280' }}>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime} min de leitura</span>
        </div>
      </div>
    </Link>
  )
}
