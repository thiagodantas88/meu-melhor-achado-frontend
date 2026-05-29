import type { Comparison } from '@/types'

function formatPublishedAt(value?: string | null) {
  if (!value) return null
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(new Date(value.endsWith('Z') ? value : `${value}Z`))
}

export default function ComparisonCard({ comparison }: { comparison: Comparison }) {
  const publishedAt = formatPublishedAt(comparison.publishedAt)

  return (
    <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: '#E8E0D5' }}>
      <div className="border-b px-5 pb-3 pt-5" style={{ borderColor: '#E8E0D5' }}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="badge-gold block w-fit text-[10px]">Comparativo do dia</span>
          {publishedAt ? <span className="text-[11px] text-[#6B7280]">{publishedAt}</span> : null}
        </div>
        <h3 className="font-serif text-base font-bold leading-snug" style={{ color: '#1E3A5F' }}>
          {comparison.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: '#6B7280' }}>
          {comparison.summary}
        </p>
        {comparison.criteria ? (
          <p className="mt-3 rounded-lg bg-[#F5EFE6] p-3 text-xs leading-relaxed text-[#6B7280]">
            <strong className="text-[#2D2D2D]">O que considerar: </strong>
            {comparison.criteria}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 divide-y min-[520px]:grid-cols-2 min-[520px]:divide-x min-[520px]:divide-y-0" style={{ borderColor: '#E8E0D5' }}>
        {[comparison.productA, comparison.productB].map((product, index) => (
          <div key={`${product.name}-${index}`} className="flex flex-col gap-3 p-4">
            <div>
              <p className="line-clamp-2 text-xs font-semibold leading-snug" style={{ color: '#2D2D2D' }}>
                {product.name}
              </p>
              <p className="mt-1 text-sm font-bold" style={{ color: '#D4A373' }}>
                {product.price}
              </p>
            </div>
            <ul className="space-y-1">
              {(product.pros || []).slice(0, 3).map((pro) => (
                <li key={pro} className="flex gap-1 text-[11px]" style={{ color: '#6B7280' }}>
                  <span style={{ color: '#D4A373' }}>✦</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
            {product.affiliate_url ? (
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-auto rounded-lg px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: '#1E3A5F' }}
              >
                Ver oferta →
              </a>
            ) : (
              <span className="mt-auto rounded-lg bg-[#E8E0D5] px-3 py-2 text-center text-xs font-semibold text-[#6B7280]">
                Oferta em validação
              </span>
            )}
          </div>
        ))}
      </div>
      {comparison.verdict ? (
        <div className="border-t bg-[#FAFAFA] px-5 py-4 text-xs leading-relaxed text-[#6B7280]" style={{ borderColor: '#E8E0D5' }}>
          <strong className="text-[#1E3A5F]">Leitura rápida: </strong>
          {comparison.verdict}
        </div>
      ) : null}
    </div>
  )
}
