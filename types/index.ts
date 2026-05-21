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
  rating?: number
  badge?: string
}

export type ContentSection = {
  type: 'intro' | 'text' | 'criteria'
  text?: string
  title?: string
  items?: string[]
}

export type Article = {
  slug: string
  title: string
  summary: string
  category: Category
  publishedAt: string
  readingTime: number
  imageUrl?: string
  contentSections?: ContentSection[]
  products?: Product[]
}
