import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArticleBySlug } from '@/lib/mock-data'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return { title: article.title, description: article.summary }
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default function ArtigoPage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#6B7280' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category.slug}`} className="hover:underline">{article.category.name}</Link>
        <span>/</span>
        <span className="truncate max-w-[200px]">{article.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="badge-gold">{article.category.icon} {article.category.name}</span>
        <span className="text-xs" style={{ color: '#6B7280' }}>
          {formatDate(article.publishedAt)} · {article.readingTime} min de leitura
        </span>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#1E3A5F' }}>
        {article.title}
      </h1>

      <p className="text-lg leading-relaxed mb-8" style={{ color: '#6B7280' }}>{article.summary}</p>

      {article.imageUrl && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="rounded-xl p-4 mb-10 text-sm flex gap-3 items-start"
        style={{ backgroundColor: '#F5EFE6', borderLeft: '3px solid #D4A373' }}>
        <span className="text-lg">🔍</span>
        <p style={{ color: '#6B7280' }}>
          <strong style={{ color: '#2D2D2D' }}>Transparência:</strong> Alguns links neste artigo
          direcionam para lojas parceiras. Isso nos ajuda a manter o site no ar, sem custo extra para você.{' '}
          <Link href="/politica-de-afiliados" className="underline">Saiba mais.</Link>
        </p>
      </div>

      {article.contentSections && article.contentSections.length > 0 && (
        <div className="mb-12 space-y-8">
          {article.contentSections.map((section, i) => {
            if (section.type === 'intro' || section.type === 'text') {
              return <p key={i} className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>{section.text}</p>
            }
            if (section.type === 'criteria' && section.items) {
              return (
                <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#F5EFE6', border: '1px solid #E8E0D5' }}>
                  {section.title && (
                    <h2 className="font-serif text-xl font-bold mb-4" style={{ color: '#1E3A5F' }}>{section.title}</h2>
                  )}
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm" style={{ color: '#2D2D2D' }}>
                        <span style={{ color: '#D4A373' }} className="mt-0.5 shrink-0">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            return null
          })}
        </div>
      )}

      {(!article.contentSections || article.contentSections.length === 0) && (
        <div className="mb-12">
          <p className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
            Este artigo está sendo preparado pela equipe do <strong>Meu Melhor Achado</strong>.
            Por enquanto, confira as indicações abaixo.
          </p>
        </div>
      )}

      {article.products && article.products.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: '#1E3A5F' }}>Nossas indicações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 pt-8 border-t" style={{ borderColor: '#E8E0D5' }}>
        <Link href={`/categoria/${article.category.slug}`} className="btn-outline">
          ← Ver mais em {article.category.name}
        </Link>
      </div>
    </article>
  )
}
