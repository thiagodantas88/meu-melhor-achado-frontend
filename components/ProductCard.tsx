import { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border rounded-2xl p-6 flex flex-col gap-4" style={{ borderColor: '#E8E0D5' }}>
      <div>
        {product.badge && (
          <span className="badge-gold mb-2 block w-fit">{product.badge}</span>
        )}
        <h3 className="font-serif text-lg font-bold" style={{ color: '#1E3A5F' }}>{product.name}</h3>
        {product.price && (
          <p className="font-semibold text-sm mt-1" style={{ color: '#D4A373' }}>{product.price}</p>
        )}
      </div>

      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{product.summary}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold mb-2 text-green-700">✓ Pontos positivos</p>
          <ul className="space-y-1">
            {product.pros.map((pro) => (
              <li key={pro} className="flex gap-1.5" style={{ color: '#6B7280' }}>
                <span className="text-green-500 mt-0.5">•</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2" style={{ color: '#B8855A' }}>⚠ Cuidados</p>
          <ul className="space-y-1">
            {product.cons.map((con) => (
              <li key={con} className="flex gap-1.5" style={{ color: '#6B7280' }}>
                <span style={{ color: '#D4A373' }} className="mt-0.5">•</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-primary justify-center text-center mt-auto"
      >
        Ver oferta →
      </a>

      <p className="text-xs text-center" style={{ color: '#6B7280' }}>
        Link de afiliado — sem custo extra para você
      </p>
    </div>
  )
}
