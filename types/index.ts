export type Category = {
  id?: number
  slug: string
  name: string
  description?: string
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
  source?: string
}

export type ContentSection = {
  type: 'intro' | 'text' | 'criteria'
  text?: string
  title?: string
  items?: string[]
}

export type Article = {
  id?: number
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

export type ComparisonProduct = {
  name: string
  price: string
  affiliate_url: string
  pros: string[]
}

export type Comparison = {
  id: number
  title: string
  summary: string
  category: string
  productA: ComparisonProduct
  productB: ComparisonProduct
  date?: string
}

export type Deal = {
  id: number
  productName: string
  originalPrice?: number | null
  dealPrice: number
  discountPct?: number | null
  affiliateUrl: string
  source: string
  category: string
  imageUrl?: string | null
}
