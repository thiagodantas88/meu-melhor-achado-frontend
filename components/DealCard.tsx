import type { Deal } from '@/types'

const SOURCE_LABEL: Record<string, string> = {
  amazon: 'Amazon',
  magalu: 'Magalu',
}

const CATEGORY_ICON: Record<string, string> = {
  tecnologia: '💻',
  casa: '🏠',
  carro: '🚗',
  'home-office': '🖥️',
  bebidas: '🍷',
  moda: '👗',
}

function formatMoney(value?: number | null) {
  if (typeof value !== 'number') return null
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function DealCard({ deal }: { deal: Deal }) {
  const originalPrice = formatMoney(deal.originalPrice)
  const dealPrice = formatMoney(deal.dealPrice)
  const savings =
    typeof deal.originalPrice === 'number' && deal.originalPrice > deal.dealPrice
      ? formatMoney(deal.originalPrice - deal.dealPrice)
      : null

  return (
    <a
      href={deal.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group flex min-h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
      style={{ borderColor: '#E8E0D5' }}
    >
      <div
        className="relative flex h-40 w-full flex-col items-center justify-center gap-2"
        style={{ backgroundColor: '#F5EFE6' }}
      >
        <span className="text-4xl">{CATEGORY_ICON[deal.category] || '🛒'}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: '#E8E0D5', color: '#6B7280' }}
        >
          {SOURCE_LABEL[deal.source] || deal.source}
        </span>
        {!!deal.discountPct && deal.discountPct > 0 && (
          <span
            className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: '#D4A373' }}
          >
            -{deal.discountPct}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug" style={{ color: '#2D2D2D' }}>
          {deal.productName}
        </p>
        <div className="flex flex-wrap items-end gap-2">
          <span className="text-lg font-bold" style={{ color: '#1E3A5F' }}>
            {dealPrice || 'Oferta disponível'}
          </span>
          {originalPrice && deal.originalPrice && deal.originalPrice > deal.dealPrice && (
            <span className="text-xs line-through" style={{ color: '#6B7280' }}>
              {originalPrice}
            </span>
          )}
        </div>
        {savings && (
          <p className="text-xs" style={{ color: '#B8855A' }}>
            Economia de {savings}
          </p>
        )}
        <div className="mt-auto flex items-center justify-end gap-3 border-t pt-3" style={{ borderColor: '#E8E0D5' }}>
          <span className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: '#D4A373' }}>
            Ver oferta →
          </span>
        </div>
      </div>
    </a>
  )
}
