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
  {
    slug: 'bebidas',
    name: 'Bebidas',
    description: 'Seleções de bebidas de melhor qualidade para apreciar, presentear e escolher bem.',
    icon: '🍷',
    color: '#1E3A5F',
  },
  {
    slug: 'moda',
    name: 'Moda',
    description: 'Moda feminina com achados elegantes, versáteis e bom custo-benefício.',
    icon: '👗',
    color: '#D4A373',
  },
]

export const ARTICLES: Article[] = [
  {
    slug: 'melhor-notebook-custo-beneficio-ate-3000',
    title: 'Melhor notebook custo-benefício até R$ 3.000',
    summary: 'Para quem precisa de um notebook confiável para trabalho, estudos e uso diário sem gastar além do necessário. Testamos e selecionamos as melhores opções disponíveis no mercado brasileiro.',
    category: CATEGORIES[0],
    publishedAt: '2026-05-21',
    readingTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    contentSections: [
      {
        type: 'intro',
        text: 'Escolher um notebook até R$ 3.000 exige atenção aos detalhes certos. Nessa faixa de preço, você já encontra máquinas com processador moderno, memória RAM suficiente e armazenamento em SSD — que faz toda a diferença na velocidade do dia a dia. O erro mais comum é se deixar levar pelo número de GHz ou pela marca, quando o que realmente importa é o processador certo para o seu uso.',
      },
      {
        type: 'criteria',
        title: 'O que olhar antes de comprar',
        items: [
          'Processador: AMD Ryzen 5 ou Intel Core i5 de última geração são o mínimo aceitável nessa faixa',
          'RAM: 8 GB funciona, 16 GB é o ideal para quem abre muitas abas e usa ferramentas de videoconferência',
          'Armazenamento: SSD é obrigatório. HD convencional deixa qualquer notebook lento, independente do processador',
          'Tela: 15,6" é o tamanho mais confortável para trabalho. Full HD (1920x1080) sem negociação',
          'Bateria: acima de 40Wh para durar um turno completo sem carregar',
        ],
      },
      {
        type: 'text',
        text: 'Com base nesses critérios, avaliamos os modelos disponíveis nas principais lojas brasileiras em maio de 2026 e chegamos a três indicações claras — uma para cada perfil de uso.',
      },
    ],
    products: [
      {
        id: 'nb-1',
        name: 'Acer Aspire 5 (A515-45)',
        summary: 'AMD Ryzen 5 5500U, 8 GB RAM, SSD 512 GB, tela 15,6" Full HD. O melhor equilíbrio entre preço e desempenho nessa faixa. Roda bem qualquer tarefa de escritório, edição leve e videoconferências sem travar.',
        pros: [
          'Processador AMD Ryzen 5 eficiente e rápido',
          'SSD de 512 GB — boot em menos de 15 segundos',
          'Tela Full HD com boa luminosidade',
          'Custo-benefício imbatível na faixa',
        ],
        cons: [
          'Acabamento em plástico (não é premium)',
          'Webcam de qualidade mediana',
          'Sem leitor de cartão SD',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Acer+Aspire+5+A515+Ryzen+5&tag=meumelhoracha-20',
        price: 'R$ 2.399',
        badge: 'Melhor Custo-Benefício',
      },
      {
        id: 'nb-2',
        name: 'Lenovo IdeaPad 3i (Core i5)',
        summary: 'Intel Core i5-1235U, 8 GB RAM, SSD 256 GB, tela 15,6" Full HD. Mais leve e com design mais refinado que o Acer. Boa opção para quem precisa carregar o notebook para reuniões.',
        pros: [
          'Design mais slim e leve (1,7 kg)',
          'Processador Intel eficiente',
          'Teclado confortável e com retroiluminação',
          'Boa duração de bateria (até 7h em uso moderado)',
        ],
        cons: [
          'SSD de apenas 256 GB (menor que o concorrente)',
          'Placa de vídeo integrada apenas',
          'Preço ligeiramente acima do Acer',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Lenovo+IdeaPad+3i+Core+i5&tag=meumelhoracha-20',
        price: 'R$ 2.699',
        badge: 'Melhor para Mobilidade',
      },
      {
        id: 'nb-3',
        name: 'Samsung Galaxy Book4',
        summary: 'Intel Core i5-1335U, 8 GB RAM, SSD 256 GB, tela 15,6" Full HD. O mais premium dos três, com construção em alumínio e integração nativa com celulares Samsung.',
        pros: [
          'Construção em alumínio — muito mais resistente',
          'Tela com excelente reprodução de cores',
          'Integração com celulares Samsung Galaxy',
          'Visual mais refinado e profissional',
        ],
        cons: [
          'O mais caro dos três',
          'SSD de 256 GB — pode ser limitante',
          'Vantagem da integração Samsung só vale se você tiver celular Samsung',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Samsung+Galaxy+Book4&tag=meumelhoracha-20',
        price: 'R$ 2.899',
        badge: 'Mais Premium',
      },
    ],
  },
  {
    slug: 'melhor-fone-bluetooth-ate-300',
    title: 'Melhor fone de ouvido Bluetooth até R$ 300',
    summary: 'Nessa faixa de preço você já consegue qualidade de som real, cancelamento de ruído e bateria para um dia inteiro. Selecionamos os três melhores disponíveis no Brasil agora.',
    category: CATEGORIES[0],
    publishedAt: '2026-05-21',
    readingTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    contentSections: [
      {
        type: 'intro',
        text: 'O mercado de fones Bluetooth explodiu nos últimos anos e hoje é possível ter qualidade muito boa sem gastar fortunas. Até R$ 300, você encontra fones com qualidade de som decente, conexão estável e bateria que aguenta o dia de trabalho. O ponto crítico é saber o que priorizar: som, conforto, cancelamento de ruído ou duração de bateria.',
      },
      {
        type: 'criteria',
        title: 'O que importa nessa categoria',
        items: [
          'Tipo: over-ear (cobre o ouvido) tem melhor isolamento; in-ear (intra-auricular) é mais prático para academia',
          'Cancelamento de ruído ativo (ANC): útil para home office e transporte público — mas consome mais bateria',
          'Bateria: mínimo de 20h para uso diário sem preocupação',
          'Codec de áudio: AAC (iPhone) ou aptX (Android) melhora significativamente a qualidade do som',
          'Microfone: essencial para quem usa em chamadas de trabalho',
        ],
      },
    ],
    products: [
      {
        id: 'fone-1',
        name: 'JBL Tune 510BT',
        summary: 'Over-ear com 40h de bateria, som JBL Signature Sound, dobrável e leve. Simples, confiável e com o melhor custo-benefício da categoria.',
        pros: [
          '40h de bateria — o melhor da categoria',
          'Som equilibrado com grave presente',
          'Dobrável — fácil de carregar na mochila',
          'Marca reconhecida com boa assistência no Brasil',
        ],
        cons: [
          'Sem cancelamento de ruído ativo',
          'Microfone mediano para chamadas',
          'Almofadas de espuma simples (não couro)',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=JBL+Tune+510BT&tag=meumelhoracha-20',
        price: 'R$ 199',
        badge: 'Melhor Custo-Benefício',
      },
      {
        id: 'fone-2',
        name: 'Anker Soundcore Q20i',
        summary: 'Over-ear com cancelamento de ruído ativo, 40h de bateria e hi-res audio. O melhor custo-benefício para quem quer ANC nessa faixa.',
        pros: [
          'Cancelamento de ruído ativo que realmente funciona',
          '40h de bateria com ANC ativado',
          'Hi-res Audio certificado',
          'App para personalização do equalizador',
        ],
        cons: [
          'Marca menos conhecida no Brasil',
          'Design mais básico visualmente',
          'ANC não é tão potente quanto fones de R$ 800+',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Anker+Soundcore+Q20i&tag=meumelhoracha-20',
        price: 'R$ 249',
        badge: 'Melhor com Cancelamento de Ruído',
      },
      {
        id: 'fone-3',
        name: 'Xiaomi Redmi Buds 5 Pro',
        summary: 'In-ear com ANC de até 46dB, qualidade de som surpreendente e 38h de bateria total com o case.',
        pros: [
          'ANC potente para in-ear (46dB)',
          'Som muito bom para a faixa de preço',
          'Design compacto e confortável',
          '38h de bateria total com case',
        ],
        cons: [
          'In-ear não isola tanto quanto over-ear',
          'App disponível apenas para Android',
          'Pode incomodar em uso prolongado',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Xiaomi+Redmi+Buds+5+Pro&tag=meumelhoracha-20',
        price: 'R$ 279',
        badge: 'Melhor In-ear',
      },
    ],
  },
  {
    slug: 'melhor-power-bank-carregador-portatil',
    title: 'Melhor carregador portátil (power bank) para celular',
    summary: 'Sem bateria no celular na hora errada é frustrante. Um bom power bank resolve isso — e não precisa custar caro. Confira as melhores opções para cada necessidade.',
    category: CATEGORIES[0],
    publishedAt: '2026-05-21',
    readingTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80',
    contentSections: [
      {
        type: 'intro',
        text: 'Power bank é daqueles produtos que você só valoriza quando precisa. A escolha errada resulta em um tijolo pesado na mochila que carrega o celular uma vez e demora horas para recarregar. A escolha certa é compacta, carrega rápido e dura anos. O segredo está em dois números: capacidade (mAh) e potência de saída (W).',
      },
      {
        type: 'criteria',
        title: 'Como escolher o seu',
        items: [
          'Capacidade: 10.000 mAh carrega um celular comum 2-3 vezes. 20.000 mAh para viagens ou uso intenso',
          'Potência de saída: mínimo 18W para carga rápida. Abaixo disso é lento demais',
          'Potência de entrada: quanto maior, menos tempo para recarregar o próprio power bank',
          'Peso: 10.000 mAh fica em torno de 200g. 20.000 mAh já passa de 400g',
          'Certificação: prefira marcas com certificação ANATEL para uso no Brasil',
        ],
      },
    ],
    products: [
      {
        id: 'pb-1',
        name: 'Xiaomi Power Bank 3 — 10.000 mAh',
        summary: '10.000 mAh, carga rápida 22,5W, saída USB-A e USB-C, 220g. O mais vendido do mercado por um bom motivo: é confiável, compacto e carrega rápido para o preço.',
        pros: [
          'Compacto e leve (220g)',
          'Carga rápida 22,5W',
          'Duas saídas (USB-A + USB-C)',
          'Marca confiável com boa durabilidade',
        ],
        cons: [
          'Recarrega o próprio banco em ~3h (razoável)',
          'Sem display de porcentagem exata',
          'Apenas 10.000 mAh — não é para viagem longa',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Xiaomi+Power+Bank+3+10000mAh&tag=meumelhoracha-20',
        price: 'R$ 129',
        badge: 'Melhor Custo-Benefício',
      },
      {
        id: 'pb-2',
        name: 'Baseus Adaman 20.000 mAh',
        summary: '20.000 mAh, 65W de saída (carrega notebook!), display digital, 440g. Para quem viaja ou usa muito fora de casa.',
        pros: [
          '65W — carrega notebook e celular ao mesmo tempo',
          'Display digital com porcentagem exata',
          '20.000 mAh — autonomia para vários dias',
          'Recarrega em ~2h com carregador 65W',
        ],
        cons: [
          'Mais pesado (440g)',
          'Preço mais alto',
          'Tamanho maior — não cabe em bolso',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Baseus+Adaman+20000mAh+65W&tag=meumelhoracha-20',
        price: 'R$ 219',
        badge: 'Melhor para Viagem',
      },
      {
        id: 'pb-3',
        name: 'Anker PowerCore Slim 10.000 mAh',
        summary: '10.000 mAh, formato slim (fino como um celular), 20W, 180g. O mais fácil de carregar no bolso.',
        pros: [
          'O mais fino e leve dos três (180g)',
          'Cabe no bolso da calça',
          'Marca com excelente reputação',
          'Acabamento premium para o preço',
        ],
        cons: [
          '20W de saída — menos rápido que os concorrentes',
          'Apenas uma saída USB-C',
          'Preço um pouco acima do Xiaomi',
        ],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Anker+PowerCore+Slim+10000&tag=meumelhoracha-20',
        price: 'R$ 169',
        badge: 'Mais Compacto',
      },
    ],
  },
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
        id: 'c-1',
        name: 'Anker 737 GaN 120W',
        summary: 'Carrega MacBook Pro, iPhone e outro dispositivo ao mesmo tempo.',
        pros: ['120W no total', 'GaN — não esquenta muito', 'Compacto'],
        cons: ['Preço mais alto', 'Cabo não incluso'],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Anker+737+GaN+120W&tag=meumelhoracha-20',
        price: 'R$ 289',
        badge: 'Melhor Geral',
      },
      {
        id: 'c-2',
        name: 'Baseus 65W GaN',
        summary: 'Para quem só precisa de uma porta poderosa.',
        pros: ['Ótimo custo-benefício', 'Tamanho de bolso', 'GaN'],
        cons: ['Apenas uma porta USB-C'],
        affiliateUrl: 'https://www.amazon.com.br/s?k=Baseus+65W+GaN&tag=meumelhoracha-20',
        price: 'R$ 129',
        badge: 'Melhor Custo-Benefício',
      },
    ],
  },
  {
    slug: 'melhor-air-fryer-custo-beneficio',
    title: 'Melhor air fryer custo-benefício até R$ 500',
    summary: 'Fritadeiras que cabem no orçamento e entregam resultado de verdade.',
    category: CATEGORIES[1],
    publishedAt: '2025-05-10',
    readingTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
  },
  {
    slug: 'como-organizar-home-office-gastando-pouco',
    title: 'Como organizar o home office gastando pouco',
    summary: 'Itens que fazem diferença real no dia a dia de quem trabalha em casa.',
    category: CATEGORIES[3],
    publishedAt: '2025-05-08',
    readingTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
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
