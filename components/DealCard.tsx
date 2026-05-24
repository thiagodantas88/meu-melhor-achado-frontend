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
  const dealPrice = formatMoney(deal.dealPrice)
  const hasDiscount =
    typeof deal.originalPrice === 'number' &&
    deal.originalPrice > deal.dealPrice &&
    typeof deal.discountPct === 'number' &&
    deal.discountPct > 0
  const originalPrice = hasDiscount ? formatMoney(deal.originalPrice) : null
  const savings = hasDiscount ? formatMoney(deal.originalPrice! - deal.dealPrice) : null
  const affiliateUrl = deal.affiliateUrl ?? ''
  const hasValidUrl = affiliateUrl.startsWith('https://')
  const cardClass =
    'group flex min-h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg'
  const cardStyle = { borderColor: '#E8E0D5' }

  const content = (
    <>
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
        {hasDiscount && (
          <div
            className="absolute right-0 top-0 flex flex-col items-center rounded-bl-lg px-3 py-1.5 text-white"
            style={{ backgroundColor: '#1E3A5F' }}
          >
            <span className="text-lg font-black leading-none">-{deal.discountPct}%</span>
            <span className="text-[9px] font-semibold uppercase text-white/75">off</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug" style={{ color: '#2D2D2D' }}>
          {deal.productName}
        </p>

        {hasDiscount ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>
                DE
              </span>
              <span className="text-sm line-through" style={{ color: '#9CA3AF' }}>
                {originalPrice}
              </span>
              <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>
                POR
              </span>
              <span className="text-lg font-black" style={{ color: '#1E3A5F' }}>
                {dealPrice || 'Oferta disponível'}
              </span>
            </div>

            {savings && (
              <div
                className="flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <span className="text-sm">💰</span>
                <span className="text-xs font-bold" style={{ color: '#92400E' }}>
                  Economize {savings} ({deal.discountPct}% off)
                </span>
              </div>
            )}
          </div>
        ) : (
          <span className="text-lg font-black" style={{ color: '#1E3A5F' }}>
            {dealPrice || 'Oferta disponível'}
          </span>
        )}

        <div className="mt-auto flex items-center justify-end gap-3 border-t pt-3" style={{ borderColor: '#E8E0D5' }}>
          <span className="w-full rounded-lg px-3 py-2.5 text-center text-xs font-bold text-white" style={{ backgroundColor: '#D4A373' }}>
            {hasValidUrl ? 'Ver oferta →' : 'Oferta em validação'}
          </span>
        </div>
      </div>
    </>
  )

  if (!hasValidUrl) {
    return (
      <div className={cardClass} style={cardStyle}>
        {content}
      </div>
    )
  }

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cardClass}
      style={cardStyle}
    >
      {content}
    </a>
  )
}
