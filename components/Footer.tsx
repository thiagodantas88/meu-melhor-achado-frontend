import Link from 'next/link'
import Logo from './Logo'
import { CATEGORIES } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1E3A5F' }} className="text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <Logo />
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Recomendações honestas para você encontrar os melhores produtos com confiança — sem enrolação e sem custo extra.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Categorias</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`} className="text-white/75 hover:text-white text-sm transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-white/75 hover:text-white text-sm transition-colors">
                  Sobre o Meu Melhor Achado
                </Link>
              </li>
              <li>
                <Link href="/politica-de-afiliados" className="text-white/75 hover:text-white text-sm transition-colors">
                  Política de Afiliados
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Meu Melhor Achado. Todos os direitos reservados.</p>
          <p>
            Contém links de afiliados.{' '}
            <Link href="/politica-de-afiliados" className="underline hover:text-white/70">
              Saiba mais.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
