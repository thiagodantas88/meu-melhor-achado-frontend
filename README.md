# Meu Melhor Achado — Frontend

Site de recomendações e guias de compra com links de afiliados.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Deploy:** Vercel

## Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| Azul Petróleo | `#1E3A5F` | Principal, navbar, títulos |
| Champagne | `#F5EFE6` | Fundo secundário, seções |
| Dourado Suave | `#D4A373` | Botões, destaques, logo |
| Cinza Grafite | `#2D2D2D` | Textos |
| Branco Neve | `#FAFAFA` | Fundo principal |

## Fontes

- **Lora** — títulos e logo (serif)
- **DM Sans** — corpo e interface (sans-serif)

## Como rodar localmente

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Acesse: http://localhost:3000

## Estrutura de páginas

| Rota | Descrição |
|---|---|
| `/` | Home |
| `/categoria/[slug]` | Artigos por categoria |
| `/artigo/[slug]` | Artigo completo |
| `/sobre` | Sobre o projeto |
| `/politica-de-afiliados` | Política de afiliados |

## Fase atual

Ambiente de testes com dados mockados (`lib/mock-data.ts`).  
Quando o backend estiver pronto, trocar `NEXT_PUBLIC_DATA_MODE=mock` por `api`.

## Deploy (Vercel)

1. Criar repositório no GitHub com este código
2. Importar no Vercel → Connect GitHub Repository
3. Vercel detecta Next.js automaticamente
4. Deploy automático a cada push na `main`
