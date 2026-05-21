import Link from 'next/link'
import Logo from './Logo'
import { CATEGORIES } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F5EFE6' }} className="mt-20 border-t border-brand-border">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">

          <div>
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
              Recomendações honestas para você encontrar os melhores produtos com confiança — sem enrolação e sem custo extra.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-brand-blue mb-4">Categorias</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`} className="text-brand-muted hover:text-brand-blue text-sm transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-brand-blue mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-brand-muted hover:text-brand-blue text-sm transition-colors">
                  Sobre o Meu Melhor Achado
                </Link>
              </li>
              <li>
                <Link href="/politica-de-afiliados" className="text-brand-muted hover:text-brand-blue text-sm transition-colors">
                  Política de Afiliados
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-brand-border pt-6 text-xs text-brand-muted sm:items-center md:flex-row">
          <p>© {new Date().getFullYear()} Meu Melhor Achado. Todos os direitos reservados.</p>
          <p>
            Contém links de afiliados.{' '}
            <Link href="/politica-de-afiliados" className="underline hover:text-brand-blue">
              Saiba mais.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
