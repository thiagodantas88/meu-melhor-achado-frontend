import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Afiliados',
  description: 'Entenda como funcionam os links de afiliados no Meu Melhor Achado.',
}

export default function PoliticaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="mb-4 font-serif text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1E3A5F' }}>
        Política de Afiliados
      </h1>
      <div className="h-1 w-14 rounded-full mb-8" style={{ backgroundColor: '#D4A373' }} />

      <div className="space-y-8 text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
        <section>
          <h2 className="mb-2 font-serif text-lg font-bold sm:text-xl" style={{ color: '#1E3A5F' }}>O que são links de afiliados?</h2>
          <p style={{ color: '#6B7280' }}>
            Links de afiliados são links rastreados que nos permitem receber uma comissão quando você
            realiza uma compra através deles. Essa comissão é paga pelo vendedor — não por você.
            O preço que você paga é exatamente o mesmo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-lg font-bold sm:text-xl" style={{ color: '#1E3A5F' }}>Como isso nos afeta?</h2>
          <p style={{ color: '#6B7280' }}>
            As comissões são o que mantém o <strong>Meu Melhor Achado</strong> gratuito e funcionando.
            Sem elas, precisaríamos cobrar pelo acesso ou veicular anúncios invasivos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-lg font-bold sm:text-xl" style={{ color: '#1E3A5F' }}>Isso afeta nossas indicações?</h2>
          <p style={{ color: '#6B7280' }}>
            Não. Indicamos produtos que consideramos genuinamente bons, independentemente da comissão
            que oferecem. Nossa credibilidade depende da honestidade das nossas recomendações.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-lg font-bold sm:text-xl" style={{ color: '#1E3A5F' }}>Programas de afiliados</h2>
          <p style={{ color: '#6B7280' }}>
            Participamos de programas como Amazon Associates e outros programas de afiliados de lojas
            brasileiras. Todos os links marcados como afiliados são identificados no contexto do artigo.
          </p>
        </section>

        <div className="rounded-lg p-5 text-sm" style={{ backgroundColor: '#F5EFE6', border: '1px solid #E8E0D5', color: '#6B7280' }}>
          <strong style={{ color: '#2D2D2D' }}>Em resumo:</strong> você não paga a mais, nós conseguimos
          manter o site no ar, e você recebe recomendações honestas. Todo mundo sai ganhando.
        </div>
      </div>
    </div>
  )
}
