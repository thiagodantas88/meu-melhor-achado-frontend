import type { Article, Category, Comparison, Deal } from '@/types'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://meu-melhor-achado-backend-production.up.railway.app'

async function apiFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate } })
  if (!response.ok) {
    throw new Error(`API error: ${path} -> ${response.status}`)
  }
  return response.json()
}

export async function safeApiFetch<T>(fallback: T, request: () => Promise<T>): Promise<T> {
  try {
    return await request()
  } catch (error) {
    console.error(error)
    return fallback
  }
}

export const api = {
  categories: () => apiFetch<Category[]>('/categories/'),
  category: (slug: string) => apiFetch<Category>(`/categories/${slug}`),
  articles: (limit = 10) => apiFetch<Article[]>(`/articles/?limit=${limit}`),
  articlesByCategory: (slug: string, limit = 10) =>
    apiFetch<Article[]>(`/articles/?category=${slug}&limit=${limit}`),
  recentArticles: (limit = 5) => apiFetch<Article[]>(`/articles/recent?limit=${limit}`),
  article: (slug: string) => apiFetch<Article>(`/articles/${slug}`),
  todayComparisons: () => apiFetch<Comparison[]>('/comparisons/today', 1800),
  deals: (category?: string, limit = 20) => {
    const params = new URLSearchParams({ limit: String(limit) })
    if (category) params.set('category', category)
    return apiFetch<Deal[]>(`/deals/?${params.toString()}`, 1800)
  },
}
