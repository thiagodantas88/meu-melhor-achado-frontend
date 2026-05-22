import Image from 'next/image'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import ComparisonCard from '@/components/ComparisonCard'
import { api, safeApiFetch } from '@/lib/api'

export default async function HomePage() {
  const [categories, articles, comparisons] = await Promise.all([
    safeApiFetch([], () => api.categories()),
    safeApiFetch([], () => api.articles(6)),
    safeApiFetch([], () => api.todayComparisons()),
  ])

  const featured = articles[0]
  const recent = articles.slice(1)

  return (
    <>
      <section style={{ backgroundColor: '#F5EFE6' }} className="border-b border-[#E8E0D5]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-12 md:grid-cols-2 md:gap-10 md:py-16 lg:py-20">
          {featured ? (
            <>
              <div>
                <span className="tag-oferta mb-4 inline-block">Em destaque</span>
                <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: '#1E3A5F' }}>
                  {featured.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#6B7280]">{featured.summary}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href={`/artigo/${featured.slug}`} className="btn-primary w-full sm:w-auto">
                    Ler artigo →
                  </Link>
                  <Link href="/ofertas" className="btn-secondary w-full sm:w-auto">
                    Ver ofertas →
                  </Link>
                  <span className="text-sm text-[#6B7280]">{featured.readingTime} min de leitura</span>
                </div>
              </div>
              {featured.imageUrl && (
                <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg sm:h-64 md:h-80">
                  <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover" priority />
                </div>
              )}
            </>
          ) : (
            <div className="md:col-span-2">
              <span className="tag-oferta mb-4 inline-block">Em breve</span>
              <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: '#1E3A5F' }}>
                Meu Melhor Achado
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]">
                Estamos carregando os artigos pela API. Volte em instantes para ver as recomendações atualizadas.
              </p>
            </div>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: '#1E3A5F' }} className="border-y border-[#162C4A]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
            Explorar por categoria
          </h2>
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border border-white/20 bg-[#FAFAFA] p-4 text-center transition-colors hover:border-[#D4A373] hover:bg-[#F5EFE6]"
              >
                <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1E3A5F' }}>
                    {cat.name}
                  </p>
                  {cat.description && <p className="mt-1 line-clamp-2 text-xs text-[#6B7280]">{cat.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Comparativos do dia</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
              Seleções recentes para comparar produtos parecidos e escolher com mais segurança.
            </p>
          </div>
          <Link href="/ofertas" className="btn-outline w-full sm:w-auto">
            Ver ofertas
          </Link>
        </div>

        {comparisons.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <ComparisonCard key={comparison.id} comparison={comparison} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-white px-4 py-10 text-center" style={{ borderColor: '#E8E0D5' }}>
            <p className="text-4xl">🏷️</p>
            <h3 className="mt-3 font-serif text-xl font-bold" style={{ color: '#1E3A5F' }}>
              Comparativos em preparação
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6B7280]">
              Novos comparativos aparecem aqui conforme as seleções forem atualizadas.
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Artigos recentes</h2>
        </div>
        {recent.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-white px-4 py-10 text-center" style={{ borderColor: '#E8E0D5' }}>
            <p className="text-sm text-[#6B7280]">Novos artigos aparecem aqui assim que forem publicados.</p>
          </div>
        )}
      </section>

      <section style={{ backgroundColor: '#F5EFE6' }} className="border-t border-[#E8E0D5]">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center sm:py-10">
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#6B7280]">
            🔍 O <strong>Meu Melhor Achado</strong> pesquisa, compara e indica os melhores produtos.
            Alguns links são de afiliados e ajudam a manter o site gratuito.{' '}
            <Link href="/politica-de-afiliados" className="underline hover:text-[#1E3A5F]">
              Saiba mais.
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
