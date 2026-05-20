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
  return {
    title: article.title,
    description: article.summary,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default function ArtigoPage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#6B7280' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category.slug}`} className="hover:underline">
          {article.category.name}
        </Link>
        <span>/</span>
        <span className="truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Category + meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="badge-gold">{article.category.icon} {article.category.name}</span>
        <span className="text-xs" style={{ color: '#6B7280' }}>
          {formatDate(article.publishedAt)} · {article.readingTime} min de leitura
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#1E3A5F' }}>
        {article.title}
      </h1>

      {/* Summary */}
      <p className="text-lg leading-relaxed mb-8" style={{ color: '#6B7280' }}>
        {article.summary}
      </p>

      {/* Hero image */}
      {article.imageUrl && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Affiliate notice */}
      <div className="rounded-xl p-4 mb-10 text-sm flex gap-3 items-start" style={{ backgroundColor: '#F5EFE6', borderLeft: '3px solid #D4A373' }}>
        <span className="text-lg">🔍</span>
        <p style={{ color: '#6B7280' }}>
          <strong style={{ color: '#2D2D2D' }}>Transparência:</strong> Alguns links neste artigo são de afiliados.
          Isso nos ajuda a manter o site no ar, sem custo extra para você.{' '}
          <Link href="/politica-de-afiliados" className="underline">Saiba mais.</Link>
        </p>
      </div>

      {/* Content placeholder */}
      <div className="prose prose-lg max-w-none mb-12" style={{ color: '#2D2D2D' }}>
        <p>
          Este artigo está sendo preparado pela equipe do <strong>Meu Melhor Achado</strong>.
          Em breve, você terá aqui um guia completo com comparativos, critérios de escolha e as melhores indicações.
        </p>
        <p className="mt-4">
          Por enquanto, confira as indicações abaixo — já pesquisamos e selecionamos as melhores opções.
        </p>
      </div>

      {/* Products */}
      {article.products && article.products.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: '#1E3A5F' }}>
            Nossas indicações
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Back */}
      <div className="mt-14 pt-8 border-t" style={{ borderColor: '#E8E0D5' }}>
        <Link href={`/categoria/${article.category.slug}`} className="btn-outline">
          ← Ver mais em {article.category.name}
        </Link>
      </div>
    </article>
  )
}
