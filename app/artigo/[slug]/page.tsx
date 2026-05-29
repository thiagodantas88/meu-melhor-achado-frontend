import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import RelatedArticles from '@/components/RelatedArticles'
import ShareWhatsApp from '@/components/ShareWhatsApp'
import { api } from '@/lib/api'
import type { Article } from '@/types'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://meumelhorachado.com.br'

function absoluteImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return undefined
  return imageUrl.startsWith('http') ? imageUrl : `${SITE_URL}${imageUrl}`
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await api.article(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return {}

  const url = `${SITE_URL}/artigo/${article.slug}`
  const imageUrl = absoluteImageUrl(article.imageUrl)
  const images = imageUrl ? [{ url: imageUrl, alt: article.title }] : undefined

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      images,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.summary,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

function parsePublishedAt(dateStr: string) {
  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(dateStr)
  return new Date(hasTimeZone ? dateStr : `${dateStr}Z`)
}

function formatDate(dateStr: string) {
  return parsePublishedAt(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Fortaleza',
  })
}

function formatDateTime(dateStr: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(parsePublishedAt(dateStr))
}

function buildEditorialGuide(article: Article) {
  const category = article.category.slug
  const productNames = (article.products || []).slice(0, 3).map((product) => product.name)
  const productsText = productNames.length > 0 ? productNames.join(', ') : 'as opções selecionadas'

  const guides: Record<string, { title: string; paragraphs: string[]; items: string[] }> = {
    moda: {
      title: 'Como escolher sem errar no uso real',
      paragraphs: [
        'Em moda, a melhor compra raramente é só a mais bonita na foto. Vale pensar em conforto, material, possibilidade de combinar com peças que você já tem e se o produto funciona para mais de uma ocasião.',
        `Neste guia, use ${productsText} como ponto de partida. Compare forma, acabamento, avaliações e política de troca antes de decidir, principalmente quando houver variação de tamanho entre marcas.`,
      ],
      items: ['Confira a tabela de medidas e comentários sobre forma', 'Prefira cores e materiais que combinem com sua rotina', 'Leia avaliações com fotos quando estiverem disponíveis', 'Considere troca fácil se for calçado ou peça com modelagem ajustada'],
    },
    casa: {
      title: 'Como avaliar custo-benefício de verdade',
      paragraphs: [
        'Produtos para casa precisam resolver uma tarefa repetida sem virar dor de cabeça. Capacidade, potência, consumo, facilidade de limpeza e assistência contam tanto quanto o preço da oferta.',
        `Ao comparar ${productsText}, pense na sua rotina: quantidade de pessoas, espaço disponível e frequência de uso. Um modelo barato pode sair caro se for pequeno demais ou difícil de limpar.`,
      ],
      items: ['Verifique dimensões antes da compra', 'Compare potência, capacidade e consumo', 'Observe disponibilidade de peças e garantia', 'Leia reclamações sobre ruído, limpeza e durabilidade'],
    },
    bebidas: {
      title: 'Como comparar bebidas além do preço',
      paragraphs: [
        'Em bebidas, preço baixo chama atenção, mas volume, origem, perfil de sabor e ocasião de consumo mudam bastante a percepção de valor.',
        `Para escolher entre ${productsText}, veja se a compra é para presentear, servir em encontro, experimentar algo novo ou repor uma bebida que você já conhece.`,
      ],
      items: ['Compare preço por litro ou unidade', 'Confira volume da garrafa ou quantidade de cápsulas', 'Observe avaliações sobre sabor e autenticidade', 'Verifique prazo, embalagem e condições de entrega'],
    },
    tecnologia: {
      title: 'Como evitar compra incompatível',
      paragraphs: [
        'Em tecnologia, o menor preço só vale se o produto for compatível com o que você já usa. Potência, conexão, geração do padrão e garantia fazem diferença no dia a dia.',
        `Ao avaliar ${productsText}, confirme especificações e leia comentários recentes. Muitas devoluções acontecem por cabo errado, carregador fraco ou acessório incompatível.`,
      ],
      items: ['Confira compatibilidade com seu aparelho', 'Priorize marcas e certificados quando houver energia envolvida', 'Veja avaliações recentes, não só nota média', 'Compare garantia e política de devolução'],
    },
    carro: {
      title: 'Como escolher acessório automotivo com segurança',
      paragraphs: [
        'No carro, acessório bom precisa ser compatível, firme e seguro. Um suporte barato que solta ou um carregador fraco atrapalha mais do que ajuda.',
        `Ao comparar ${productsText}, verifique fixação, material, tipo de encaixe e se o produto atende ao modelo do seu veículo ou celular.`,
      ],
      items: ['Confira tipo de fixação e compatibilidade', 'Evite acessórios que obstruem visão ou comandos', 'Leia avaliações sobre estabilidade em movimento', 'Prefira produtos com construção mais firme'],
    },
    'home-office': {
      title: 'Como pensar em conforto de longo prazo',
      paragraphs: [
        'No home office, conforto e ergonomia aparecem depois de algumas horas de uso. Por isso, ajuste, altura, apoio e material são mais importantes do que aparência isolada.',
        `Ao olhar ${productsText}, pense em quantas horas por dia você usa o item e se ele melhora postura, organização ou concentração.`,
      ],
      items: ['Observe medidas e ajustes disponíveis', 'Priorize conforto para uso prolongado', 'Confira avaliações de quem usa todos os dias', 'Considere espaço disponível na mesa ou ambiente'],
    },
  }

  return guides[category] || guides.tecnologia
}

export default async function ArtigoPage({ params }: Props) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await api.articlesByCategory(article.category.slug, 5)
    .then((list) => list.filter((item) => item.slug !== article.slug).slice(0, 4))
    .catch(() => [])

  const articleUrl = `${SITE_URL}/artigo/${article.slug}`
  const imageUrl = absoluteImageUrl(article.imageUrl)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Meu Melhor Achado',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meu Melhor Achado',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8 flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category.slug}`} className="hover:underline">{article.category.name}</Link>
        <span>/</span>
        <span className="max-w-[200px] truncate">{article.title}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="badge-gold">{article.category.icon} {article.category.name}</span>
        <span className="text-xs" style={{ color: '#6B7280' }}>
          Publicado em {formatDateTime(article.publishedAt)} · {article.readingTime} min de leitura
        </span>
      </div>

      <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:text-4xl" style={{ color: '#1E3A5F' }}>
        {article.title}
      </h1>

      <p className="mb-8 text-lg leading-relaxed" style={{ color: '#6B7280' }}>{article.summary}</p>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <ShareWhatsApp title={article.title} url={articleUrl} />
      </div>

      {article.imageUrl && (
        <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg md:h-80">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
        </div>
      )}

      <div
        className="mb-10 flex items-start gap-3 rounded-lg p-4 text-sm"
        style={{ backgroundColor: '#F5EFE6', borderLeft: '3px solid #D4A373' }}
      >
        <span className="text-lg">🔍</span>
        <p style={{ color: '#6B7280' }}>
          <strong style={{ color: '#2D2D2D' }}>Transparência:</strong> Alguns links neste artigo direcionam
          para lojas parceiras. Isso nos ajuda a manter o site no ar, sem custo extra para você.{' '}
          <Link href="/politica-de-afiliados" className="underline">Saiba mais.</Link>
        </p>
      </div>

      {article.contentSections && article.contentSections.length > 0 ? (
        <div className="mb-12 space-y-8">
          {article.contentSections.map((section, index) => {
            if (section.type === 'intro' || section.type === 'text') {
              return (
                <p key={index} className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
                  {section.text}
                </p>
              )
            }
            if (section.type === 'criteria' && section.items) {
              return (
                <div key={index} className="rounded-lg border p-6" style={{ backgroundColor: '#F5EFE6', borderColor: '#E8E0D5' }}>
                  {section.title && (
                    <h2 className="mb-4 font-serif text-xl font-bold" style={{ color: '#1E3A5F' }}>
                      {section.title}
                    </h2>
                  )}
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm" style={{ color: '#2D2D2D' }}>
                        <span style={{ color: '#D4A373' }} className="mt-0.5 shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            return null
          })}
        </div>
      ) : (
        <div className="mb-12">
          <p className="text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
            Este artigo está sendo preparado pela equipe do <strong>Meu Melhor Achado</strong>.
            Por enquanto, confira as indicações abaixo.
          </p>
        </div>
      )}

      <section className="mb-12 rounded-lg border bg-white p-6" style={{ borderColor: '#E8E0D5' }}>
        {(() => {
          const guide = buildEditorialGuide(article)
          return (
            <>
              <h2 className="mb-4 font-serif text-2xl font-bold" style={{ color: '#1E3A5F' }}>
                {guide.title}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#2D2D2D' }}>
                {guide.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: '#F5EFE6' }}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ color: '#1E3A5F' }}>
                  Checklist antes de comprar
                </h3>
                <ul className="space-y-2">
                  {guide.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm" style={{ color: '#2D2D2D' }}>
                      <span style={{ color: '#D4A373' }} className="mt-0.5 shrink-0">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )
        })()}
      </section>

      {article.products && article.products.length > 0 && (
        <section>
          <h2 className="mb-6 font-serif text-2xl font-bold" style={{ color: '#1E3A5F' }}>Nossas indicações</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {article.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <RelatedArticles articles={related} />

      <div className="mt-14 border-t pt-8" style={{ borderColor: '#E8E0D5' }}>
        <Link href={`/categoria/${article.category.slug}`} className="btn-outline">
          ← Ver mais em {article.category.name}
        </Link>
      </div>
    </article>
  )
}
