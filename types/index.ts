export type Category = {
  slug: string
  name: string
  description: string
  icon: string
  color: string
}

export type Product = {
  id: string
  name: string
  summary: string
  pros: string[]
  cons: string[]
  affiliateUrl: string
  imageUrl?: string
  price?: string
  badge?: string
}

export type Article = {
  slug: string
  title: string
  summary: string
  category: Category
  publishedAt: string
  readingTime: number
  imageUrl?: string
  content?: string
  products?: Product[]
}
