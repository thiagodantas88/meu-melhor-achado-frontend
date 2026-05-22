import Link from 'next/link'
import DealCard from '@/components/DealCard'
import { api, safeApiFetch } from '@/lib/api'

type Props = {
  searchParams?: {
    categoria?: string
  }
}

export const metadata = {
  title: 'Ofertas do dia',
  description: 'Seleção atualizada de oportunidades em lojas parceiras.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function OfertasPage({ searchParams }: Props) {
  const selectedCategory = searchParams?.categoria
  const [categories, deals] = await Promise.all([
    safeApiFetch([], () => api.categories()),
    safeApiFetch([], () => api.deals(selectedCategory, 30)),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="tag-oferta mb-3 inline-block">Ofertas</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#1E3A5F' }}>
            Ofertas do dia
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
            Seleção atualizada de oportunidades em lojas parceiras, com links diretos para conferir os detalhes.
          </p>
        </div>
        <Link href="/" className="btn-outline w-full md:w-auto">
          Voltar para a home
        </Link>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <Link
          href="/ofertas"
          className="shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
          style={{
            borderColor: '#E8E0D5',
            backgroundColor: !selectedCategory ? '#1E3A5F' : '#fff',
            color: !selectedCategory ? '#fff' : '#1E3A5F',
          }}
        >
          Todas
        </Link>
        {categories.map((category) => {
          const active = selectedCategory === category.slug
          return (
            <Link
              key={category.slug}
              href={`/ofertas?categoria=${category.slug}`}
              className="shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: '#E8E0D5',
                backgroundColor: active ? '#1E3A5F' : '#fff',
                color: active ? '#fff' : '#1E3A5F',
              }}
            >
              {category.icon} {category.name}
            </Link>
          )
        })}
      </div>

      {deals.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-white px-4 py-16 text-center" style={{ borderColor: '#E8E0D5' }}>
          <p className="text-5xl">🏷️</p>
          <h2 className="mt-4 font-serif text-2xl font-bold" style={{ color: '#1E3A5F' }}>
            Ofertas em atualização
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6B7280]">
            Novas oportunidades aparecerão aqui assim que estiverem disponíveis.
          </p>
        </div>
      )}
    </div>
  )
}
