import Link from 'next/link'
import Image from 'next/image'
import { ARTICLES, CATEGORIES } from '@/lib/mock-data'
import ArticleCard from '@/components/ArticleCard'

export default function HomePage() {
  const featured = ARTICLES[0]
  const recent   = ARTICLES.slice(1)

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#F5EFE6' }} className="border-b border-[#E8E0D5]">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="tag-oferta mb-4 inline-block">Em destaque</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight" style={{ color: '#1E3A5F' }}>
              {featured.title}
            </h1>
            <p className="mt-4 text-base text-[#6B7280] leading-relaxed">{featured.summary}</p>
            <div className="mt-8 flex items-center gap-3">
              <Link href={`/artigo/${featured.slug}`} className="btn-primary">
                Ler artigo →
              </Link>
              <span className="text-sm text-[#6B7280]">{featured.readingTime} min de leitura</span>
            </div>
          </div>
          {featured.imageUrl && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="section-title mb-6">Explorar por categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="card p-5 flex flex-col items-center text-center gap-3 hover:border-[#D4A373] group"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#1E3A5F' }}>
                  {cat.name}
                </p>
                <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ARTIGOS RECENTES ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Artigos recentes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── BANNER AFILIADOS ── */}
      <section style={{ backgroundColor: '#F5EFE6' }} className="border-t border-[#E8E0D5]">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <p className="text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
            🔍 O <strong>Meu Melhor Achado</strong> pesquisa, compara e indica os melhores produtos.
            Alguns links são de afiliados — isso nos ajuda a manter o site gratuito, sem custo algum para você.{' '}
            <Link href="/politica-de-afiliados" className="underline hover:text-[#1E3A5F]">
              Saiba mais.
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
