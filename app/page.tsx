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
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-12 md:grid-cols-2 md:gap-10 md:py-16 lg:py-20">
          <div>
            <span className="tag-oferta mb-4 inline-block">Em destaque</span>
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: '#1E3A5F' }}>
              {featured.title}
            </h1>
            <p className="mt-4 text-base text-[#6B7280] leading-relaxed">{featured.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={`/artigo/${featured.slug}`} className="btn-primary w-full sm:w-auto">
                Ler artigo →
              </Link>
              <span className="text-sm text-[#6B7280]">{featured.readingTime} min de leitura</span>
            </div>
          </div>
          {featured.imageUrl && (
            <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg sm:h-64 md:h-80">
              <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </section>

      {/* ── CATEGORIAS ── */}
      <section style={{ backgroundColor: '#1E3A5F' }} className="border-y border-[#162C4A]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
            Explorar por categoria
          </h2>
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border border-white/20 bg-[#FAFAFA] p-4 text-center transition-colors hover:border-[#D4A373] hover:bg-[#F5EFE6] sm:p-5"
              >
                <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1E3A5F' }}>
                    {cat.name}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIGOS RECENTES ── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Artigos recentes</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {recent.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* ── BANNER AFILIADOS ── */}
      <section style={{ backgroundColor: '#F5EFE6' }} className="border-t border-[#E8E0D5]">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:py-10">
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
