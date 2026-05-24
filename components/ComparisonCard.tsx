import type { Comparison } from '@/types'

export default function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: '#E8E0D5' }}>
      <div className="border-b px-5 pb-3 pt-5" style={{ borderColor: '#E8E0D5' }}>
        <span className="badge-gold mb-2 block w-fit text-[10px]">Comparativo do dia</span>
        <h3 className="font-serif text-base font-bold leading-snug" style={{ color: '#1E3A5F' }}>
          {comparison.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: '#6B7280' }}>
          {comparison.summary}
        </p>
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
              {(product.pros || []).slice(0, 2).map((pro) => (
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
    </div>
  )
}
