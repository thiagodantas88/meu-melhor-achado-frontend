import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { api } from '@/lib/api'
import type { Article } from '@/types'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await api.article(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return {}
  return { title: article.title, description: article.summary }
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArtigoPage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-8 flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category.slug}`} className="hover:underline">{article.category.name}</Link>
        <span>/</span>
        <span className="max-w-[200px] truncate">{article.title}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="badge-gold">{article.category.icon} {article.category.name}</span>
        <span className="text-xs" style={{ color: '#6B7280' }}>
          {formatDate(article.publishedAt)} · {article.readingTime} min de leitura
        </span>
      </div>

      <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:text-4xl" style={{ color: '#1E3A5F' }}>
        {article.title}
      </h1>

      <p className="mb-8 text-lg leading-relaxed" style={{ color: '#6B7280' }}>{article.summary}</p>

      {article.imageUrl && (
        <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg md:h-80">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      <div
        className="mb-10 flex items-start gap-3 rounded-lg p-4 text-sm"
        style={{ backgroundColor: '#F5EFE6', borderLeft: '3px solid #D4A373' }}
      >
        <span className="text-lg">🔍</span>
        <p style={{ color: '#6B7280' }}>
          <strong style={{ color: '#2D2D2D' }}>Transparência:</strong> Alguns links neste artigo direcionam
          para lojas parceiras. Isso nos ajuda a manter o site no ar, sem custo extra para você.{' '}
          <Link href="/politica-de-afiliados" className="underline">Saiba mais.</Link>
        </p>
      </div>

      {article.contentSections && article.contentSections.length > 0 ? (
        <div className="mb-12 space-y-8">
          {article.contentSections.map((section, index) => {
            if (section.type === 'intro' || section.type === 'text') {
              return (
                <p key={index} className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
                  {section.text}
                </p>
              )
            }
            if (section.type === 'criteria' && section.items) {
              return (
                <div key={index} className="rounded-lg border p-6" style={{ backgroundColor: '#F5EFE6', borderColor: '#E8E0D5' }}>
                  {section.title && (
                    <h2 className="mb-4 font-serif text-xl font-bold" style={{ color: '#1E3A5F' }}>
                      {section.title}
                    </h2>
                  )}
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm" style={{ color: '#2D2D2D' }}>
                        <span style={{ color: '#D4A373' }} className="mt-0.5 shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            return null
          })}
        </div>
      ) : (
        <div className="mb-12">
          <p className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
            Este artigo está sendo preparado pela equipe do <strong>Meu Melhor Achado</strong>.
            Por enquanto, confira as indicações abaixo.
          </p>
        </div>
      )}

      {article.products && article.products.length > 0 && (
        <section>
          <h2 className="mb-6 font-serif text-2xl font-bold" style={{ color: '#1E3A5F' }}>Nossas indicações</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {article.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 border-t pt-8" style={{ borderColor: '#E8E0D5' }}>
        <Link href={`/categoria/${article.category.slug}`} className="btn-outline">
          ← Ver mais em {article.category.name}
        </Link>
      </div>
    </article>
  )
}
