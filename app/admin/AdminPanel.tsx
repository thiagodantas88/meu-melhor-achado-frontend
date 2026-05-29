'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import type { Category } from '@/types'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://meu-melhor-achado-backend-production.up.railway.app'

type RunMode = 'general' | 'category' | 'product' | 'reference'

type ScraperLog = {
  runId: string
  startedAt: string | null
  finishedAt: string | null
  dealsFound: number
  dealsPublished: number
  dealsFallback: number
  amazonFound: number
  magaluFound: number
  errors: number
  status: string
  notes?: string | null
}

type HistoryItem = {
  id: number
  productName: string
  price: number
  source: string
  category: string
  affiliateUrl?: string | null
  recordedAt: string | null
  scraperRun?: string | null
}

type ArticleHistoryItem = {
  id: number
  slug: string
  title: string
  category?: string | null
  categoryName?: string | null
  publishedAt: string | null
  readingTime: number
  isFeatured: boolean
  isAuto: boolean
  isOffer: boolean
}

type ComparisonHistoryItem = {
  id: number
  title: string
  category: string
  date: string
  publishedAt: string | null
  summary?: string | null
  verdict?: string | null
}

type RunResponse = {
  status: string
  mode?: string
  runId?: string
  category?: string
  terms?: string[]
  amazonFound?: number
  magaluFound?: number
  dealsPublished?: number
}

const ADMIN_TIME_ZONE = 'America/Fortaleza'

function parseBackendDate(value: string) {
  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(value)
  return new Date(hasTimeZone ? value : `${value}Z`)
}

function formatDateTime(value?: string | null) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: ADMIN_TIME_ZONE,
  }).format(parseBackendDate(value))
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function todayISO() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: ADMIN_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

function groupHistoryByRun(items: HistoryItem[]) {
  return items.reduce<Record<string, HistoryItem[]>>((groups, item) => {
    const key = item.scraperRun || (item.recordedAt ? formatDateTime(item.recordedAt) : 'sem-rodada')
    groups[key] = groups[key] || []
    groups[key].push(item)
    return groups
  }, {})
}

export default function AdminPanel() {
  const [apiKey, setApiKey] = useState('')
  const [rememberKey, setRememberKey] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [logs, setLogs] = useState<ScraperLog[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [articleHistory, setArticleHistory] = useState<ArticleHistoryItem[]>([])
  const [comparisonHistory, setComparisonHistory] = useState<ComparisonHistoryItem[]>([])
  const [historyDate, setHistoryDate] = useState(todayISO())
  const [historyCategory, setHistoryCategory] = useState('')
  const [historySource, setHistorySource] = useState('')
  const [mode, setMode] = useState<RunMode>('general')
  const [runCategory, setRunCategory] = useState('bebidas')
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const groupedHistory = useMemo(() => groupHistoryByRun(history), [history])
  const selectedCategoryName =
    categories.find((category) => category.slug === runCategory)?.name || runCategory

  useEffect(() => {
    const savedKey = window.localStorage.getItem('mma_admin_key')
    if (savedKey) setApiKey(savedKey)

    fetch(`${API_URL}/categories/`)
      .then((response) => response.json())
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
        ...(options.headers || {}),
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(body?.detail || `Erro ${response.status}`)
    }

    return response.json()
  }

  async function refreshData() {
    if (!apiKey.trim()) {
      setError('Informe a chave de administração.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (rememberKey) {
        window.localStorage.setItem('mma_admin_key', apiKey)
      } else {
        window.localStorage.removeItem('mma_admin_key')
      }

      const params = new URLSearchParams({ limit: '300' })
      if (historyDate) params.set('date', historyDate)
      if (historyCategory) params.set('category', historyCategory)
      if (historySource) params.set('source', historySource)

      const [nextLogs, nextHistory, nextArticles, nextComparisons] = await Promise.all([
        adminFetch<ScraperLog[]>('/admin/scraper-logs?limit=20'),
        adminFetch<HistoryItem[]>(`/admin/offers-history?${params.toString()}`),
        adminFetch<ArticleHistoryItem[]>('/admin/articles-history?limit=30'),
        adminFetch<ComparisonHistoryItem[]>('/admin/comparisons-history?limit=30'),
      ])

      setLogs(nextLogs)
      setHistory(nextHistory)
      setArticleHistory(nextArticles)
      setComparisonHistory(nextComparisons)
      setMessage('Dados atualizados.')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  async function runRobot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!apiKey.trim()) {
      setError('Informe a chave de administração.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const payload =
      mode === 'general'
        ? { mode }
        : mode === 'category'
          ? { mode, category: runCategory }
          : { mode, category: runCategory, term: term.trim() }

    try {
      if ((mode === 'product' || mode === 'reference') && !term.trim()) {
        throw new Error('Informe o produto, termo ou referência.')
      }

      const result = await adminFetch<RunResponse>('/admin/run-manual', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setMessage(
        result.mode === 'general'
          ? 'Robô geral executado com sucesso.'
          : `Rodada executada em ${selectedCategoryName}. Publicadas: ${result.dealsPublished ?? 0}.`,
      )
      await refreshData()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao rodar o robô.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="tag-oferta mb-3 inline-block">Admin</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#1E3A5F' }}>
            Administração de ofertas
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
            Controle operacional para rodadas manuais, histórico diário e diagnóstico das fontes.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshData}
          disabled={loading}
          className="btn-secondary w-full disabled:opacity-60 sm:w-auto"
        >
          {loading ? 'Atualizando...' : 'Atualizar dados'}
        </button>
      </div>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border bg-white p-4" style={{ borderColor: '#E8E0D5' }}>
          <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="admin-key">
            Chave de administração
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="admin-key"
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className="min-h-11 flex-1 rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
              style={{ borderColor: '#E8E0D5' }}
              placeholder="Cole a chave ADMIN_API_KEY"
            />
            <button type="button" onClick={refreshData} disabled={loading} className="btn-primary disabled:opacity-60">
              Entrar
            </button>
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
            <input
              type="checkbox"
              checked={rememberKey}
              onChange={(event) => setRememberKey(event.target.checked)}
              className="h-4 w-4"
            />
            Manter chave neste navegador
          </label>
        </div>

        <div className="rounded-lg border bg-white p-4" style={{ borderColor: '#E8E0D5' }}>
          <h2 className="text-sm font-semibold text-[#1E3A5F]">Status</h2>
          {error ? <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
          {message ? <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
          {!error && !message ? <p className="mt-3 text-sm text-[#6B7280]">Aguardando ação.</p> : null}
        </div>
      </section>

      <section className="mb-8 rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Rodar robô</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              Escolha o tipo de rodada e envie para a API.
            </p>
          </div>
        </div>

        <form onSubmit={runRobot} className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="run-mode">
              Tipo de rodada
            </label>
            <select
              id="run-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as RunMode)}
              className="mt-2 min-h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-[#1E3A5F]"
              style={{ borderColor: '#E8E0D5' }}
            >
              <option value="general">Geral</option>
              <option value="category">Categoria completa</option>
              <option value="product">Produto/termo específico</option>
              <option value="reference">Referência ou modelo</option>
            </select>
          </div>

          {mode !== 'general' ? (
            <div>
              <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="run-category">
                Categoria
              </label>
              <select
                id="run-category"
                value={runCategory}
                onChange={(event) => setRunCategory(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              >
                {categories.length === 0 ? <option value="bebidas">Bebidas</option> : null}
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="hidden lg:block" />
          )}

          {mode === 'product' || mode === 'reference' ? (
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="run-term">
                {mode === 'reference' ? 'Referência/modelo' : 'Produto ou termo'}
              </label>
              <input
                id="run-term"
                type="text"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
                placeholder={mode === 'reference' ? 'Ex.: RI3104, AFN-40-BI, 3 corações' : 'Ex.: whisky, air fryer, bolsa feminina'}
              />
            </div>
          ) : null}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 lg:w-auto">
            {loading ? 'Rodando...' : 'Rodar agora'}
          </button>
        </form>
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
          <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Histórico de artigos</h2>
          <p className="mt-1 text-sm text-[#6B7280]">Últimos artigos publicados, com data e flags editoriais.</p>
          <div className="mt-4 space-y-3">
            {articleHistory.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Nenhum artigo carregado.</p>
            ) : (
              articleHistory.map((article) => (
                <article key={article.id} className="rounded-lg border p-3" style={{ borderColor: '#E8E0D5' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <a
                        href={`/artigo/${article.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-[#1E3A5F] hover:underline"
                      >
                        {article.title}
                      </a>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {article.categoryName || article.category} · {formatDateTime(article.publishedAt)} · {article.readingTime} min
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1">
                      {article.isFeatured ? <span className="badge-blue text-[10px]">Destaque</span> : null}
                      {article.isAuto ? <span className="badge-gold text-[10px]">Auto</span> : null}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
          <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Histórico de comparativos</h2>
          <p className="mt-1 text-sm text-[#6B7280]">Registro das comparações geradas nas rodadas do robô.</p>
          <div className="mt-4 space-y-3">
            {comparisonHistory.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Nenhum comparativo carregado.</p>
            ) : (
              comparisonHistory.map((comparison) => (
                <article key={comparison.id} className="rounded-lg border p-3" style={{ borderColor: '#E8E0D5' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-[#1E3A5F]">{comparison.title}</h3>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {comparison.category} · {formatDateTime(comparison.publishedAt)}
                      </p>
                    </div>
                    <span className="badge-gold shrink-0 text-[10px]">{comparison.date}</span>
                  </div>
                  {comparison.summary ? <p className="mt-3 text-xs leading-relaxed text-[#6B7280]">{comparison.summary}</p> : null}
                  {comparison.verdict ? (
                    <p className="mt-2 rounded-lg bg-[#F5EFE6] p-2 text-xs leading-relaxed text-[#6B7280]">
                      {comparison.verdict}
                    </p>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
          <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Últimas rodadas</h2>
          <div className="mt-4 space-y-3">
            {logs.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Nenhuma rodada carregada.</p>
            ) : (
              logs.map((log) => (
                <article key={log.runId} className="rounded-lg border p-3" style={{ borderColor: '#E8E0D5' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-[#1E3A5F]">Rodada {formatDateTime(log.startedAt)}</h3>
                      <p className="mt-1 text-xs text-[#6B7280]">{log.runId}</p>
                    </div>
                    <span className="rounded-full bg-[#E6EDF5] px-2.5 py-1 text-xs font-semibold text-[#1E3A5F]">
                      {log.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
                    <span>Publicadas: {log.dealsPublished}</span>
                    <span>Amazon: {log.amazonFound}</span>
                    <span>Magalu: {log.magaluFound}</span>
                    <span>Erros: {log.errors}</span>
                  </div>
                  {log.notes ? <p className="mt-3 rounded-lg bg-[#F5EFE6] p-2 text-xs text-[#6B7280]">{log.notes}</p> : null}
                </article>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
          <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Histórico de ofertas</h2>
              <p className="mt-1 text-sm text-[#6B7280]">Consulta por dia, categoria e fonte.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <input
                type="date"
                value={historyDate}
                onChange={(event) => setHistoryDate(event.target.value)}
                className="min-h-11 rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              />
              <select
                value={historyCategory}
                onChange={(event) => setHistoryCategory(event.target.value)}
                className="min-h-11 rounded-lg border bg-white px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={historySource}
                onChange={(event) => setHistorySource(event.target.value)}
                className="min-h-11 rounded-lg border bg-white px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              >
                <option value="">Todas fontes</option>
                <option value="amazon">Amazon</option>
                <option value="magalu">Magalu</option>
              </select>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="rounded-lg border px-4 py-12 text-center" style={{ borderColor: '#E8E0D5' }}>
              <p className="font-semibold text-[#1E3A5F]">Nenhuma oferta carregada para os filtros atuais.</p>
              <p className="mt-2 text-sm text-[#6B7280]">Atualize os dados ou altere os filtros.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(groupedHistory).map(([runId, items]) => (
                <div key={runId}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-[#1E3A5F]">Rodada {formatDateTime(items[0]?.recordedAt)}</h3>
                    <span className="text-xs text-[#6B7280]">{items.length} ofertas</span>
                  </div>
                  <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#E8E0D5' }}>
                    <table className="min-w-[760px] w-full text-left text-sm">
                      <thead className="bg-[#F5EFE6] text-xs uppercase text-[#1E3A5F]">
                        <tr>
                          <th className="px-3 py-3">Produto</th>
                          <th className="px-3 py-3">Preço</th>
                          <th className="px-3 py-3">Categoria</th>
                          <th className="px-3 py-3">Fonte</th>
                          <th className="px-3 py-3">Horário</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-t" style={{ borderColor: '#E8E0D5' }}>
                            <td className="max-w-[320px] px-3 py-3">
                              <a
                                href={item.affiliateUrl || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-[#1E3A5F] hover:underline"
                              >
                                {item.productName}
                              </a>
                            </td>
                            <td className="px-3 py-3 font-semibold text-[#2D2D2D]">{formatPrice(item.price)}</td>
                            <td className="px-3 py-3 text-[#6B7280]">{item.category}</td>
                            <td className="px-3 py-3 text-[#6B7280]">{item.source}</td>
                            <td className="px-3 py-3 text-[#6B7280]">{formatDateTime(item.recordedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
