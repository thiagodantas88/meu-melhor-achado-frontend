import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o Meu Melhor Achado — um projeto de recomendações honestas, sem enrolação.',
}

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="mb-4 font-serif text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1E3A5F' }}>
        O que é o Meu Melhor Achado?
      </h1>
      <div className="h-1 w-14 rounded-full mb-8" style={{ backgroundColor: '#D4A373' }} />

      <div className="space-y-6 text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
        <p>
          O <strong>Meu Melhor Achado</strong> nasceu de um objetivo simples: ajudar você a comprar melhor,
          sem precisar gastar horas pesquisando em fóruns e sites complicados.
        </p>
        <p>
          Aqui você encontra comparativos, guias de compra e recomendações diretas — com prós, contras e
          links para comprar. Sem enrolação.
        </p>
        <p>
          Cobrimos quatro categorias por enquanto: <strong>Tecnologia</strong>, <strong>Casa</strong>,{' '}
          <strong>Carro</strong> e <strong>Home Office</strong>. O objetivo é sempre o mesmo: custo-benefício real,
          indicações honestas.
        </p>

        <div className="my-8 rounded-lg p-5 sm:p-6" style={{ backgroundColor: '#F5EFE6', border: '1px solid #E8E0D5' }}>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: '#1E3A5F' }}>
            Sobre os links de afiliados
          </h2>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Alguns dos links neste site são links de afiliados. Isso significa que, se você comprar
            através deles, podemos receber uma comissão — sem nenhum custo adicional para você.
            Essa é a forma de manter o site no ar gratuitamente.
          </p>
          <p className="text-sm mt-3" style={{ color: '#6B7280' }}>
            Importante: nossas indicações são independentes. Indicamos o que achamos bom, não o que
            paga mais comissão.
          </p>
          <Link href="/politica-de-afiliados" className="text-sm underline mt-3 inline-block" style={{ color: '#1E3A5F' }}>
            Ler política completa de afiliados →
          </Link>
        </div>
      </div>
    </div>
  )
}
