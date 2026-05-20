import { Article, Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    slug: 'tecnologia',
    name: 'Tecnologia',
    description: 'Celulares, notebooks, acessórios e tudo que conecta você ao mundo.',
    icon: '💻',
    color: '#1E3A5F',
  },
  {
    slug: 'casa',
    name: 'Casa',
    description: 'Eletrodomésticos, decoração e produtos que fazem a diferença no seu lar.',
    icon: '🏠',
    color: '#1E3A5F',
  },
  {
    slug: 'carro',
    name: 'Carro',
    description: 'Pneus, acessórios e produtos automotivos com custo-benefício real.',
    icon: '🚗',
    color: '#1E3A5F',
  },
  {
    slug: 'home-office',
    name: 'Home Office',
    description: 'Cadeiras, mesas, iluminação e tudo para trabalhar bem de casa.',
    icon: '🖥️',
    color: '#D4A373',
  },
]

export const ARTICLES: Article[] = [
  {
    slug: 'melhor-carregador-usb-c-iphone-macbook',
    title: 'Melhor carregador USB-C para iPhone e MacBook',
    summary: 'Testamos os principais carregadores do mercado e indicamos os que valem cada centavo — sem enrolação.',
    category: CATEGORIES[0],
    publishedAt: '2025-05-15',
    readingTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    products: [
      {
        id: '1',
        name: 'Anker 737 GaN 120W',
        summary: 'Carrega MacBook Pro, iPhone e outro dispositivo ao mesmo tempo. Compacto para a potência que entrega.',
        pros: ['120W no total', 'GaN — não esquenta muito', 'Compacto'],
        cons: ['Preço mais alto', 'Cabo não incluso'],
        affiliateUrl: '#',
        price: 'R$ 289',
        badge: 'Melhor Geral',
      },
      {
        id: '2',
        name: 'Baseus 65W GaN',
        summary: 'Para quem só precisa de uma porta poderosa. Carrega MacBook Air e iPhone sem problema.',
        pros: ['Ótimo custo-benefício', 'Tamanho de bolso', 'GaN'],
        cons: ['Apenas uma porta USB-C'],
        affiliateUrl: '#',
        price: 'R$ 129',
        badge: 'Melhor Custo-Benefício',
      },
    ],
  },
  {
    slug: 'melhor-cabo-usb-c-resistente',
    title: 'Melhor cabo USB-C resistente para uso diário',
    summary: 'Cabo que não estraga em 3 meses? Existe. Veja quais realmente aguentam o tranco do dia a dia.',
    category: CATEGORIES[0],
    publishedAt: '2025-05-12',
    readingTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    slug: 'melhor-air-fryer-custo-beneficio',
    title: 'Melhor air fryer custo-benefício até R$ 500',
    summary: 'Fritadeiras que cabem no orçamento e entregam resultado de verdade. Comparamos as principais opções.',
    category: CATEGORIES[1],
    publishedAt: '2025-05-10',
    readingTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
  },
  {
    slug: 'como-organizar-home-office-gastando-pouco',
    title: 'Como organizar o home office gastando pouco',
    summary: 'Itens que fazem diferença real no dia a dia de quem trabalha em casa, sem precisar gastar muito.',
    category: CATEGORIES[3],
    publishedAt: '2025-05-08',
    readingTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  },
  {
    slug: 'melhor-notebook-trabalho-administrativo',
    title: 'Melhor notebook custo-benefício para trabalho administrativo',
    summary: 'Para quem usa Word, planilhas e reuniões online: o que realmente importa na hora de escolher.',
    category: CATEGORIES[0],
    publishedAt: '2025-05-05',
    readingTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  },
  {
    slug: 'como-escolher-pneu-jeep-compass',
    title: 'Como escolher pneu para Jeep Compass sem errar',
    summary: 'Qual pneu comprar sem errar? Explicamos os critérios que importam e indicamos os melhores da faixa.',
    category: CATEGORIES[2],
    publishedAt: '2025-05-02',
    readingTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByCategory(slug: string): Article[] {
  return ARTICLES.filter((a) => a.category.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
