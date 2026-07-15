'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://meu-melhor-achado-backend-production.up.railway.app'

type MobiliaOffer = {
  id: number
  title: string
  price?: number | null
  originalPrice?: number | null
  discountPct?: number | null
  source: string
  sourceType: string
  url?: string | null
  imageUrl?: string | null
  couponCode?: string | null
  couponNote?: string | null
  shippingNote?: string | null
  isPartner: boolean
  createdAt?: string | null
}

type MobiliaSearch = {
  id: number
  productName?: string | null
  productModel?: string | null
  productType?: string | null
  description?: string | null
  query: string
  cep: string
  resultsCount: number
  createdAt?: string | null
  offers: MobiliaOffer[]
}

type SearchForm = {
  productName: string
  productModel: string
  productType: string
  description: string
}

const emptyForm: SearchForm = {
  productName: '',
  productModel: '',
  productType: '',
  description: '',
}

function formatMoney(value?: number | null) {
  if (typeof value !== 'number') return 'Preço não informado'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(value?: string | null) {
  if (!value) return '-'
  const hasTimeZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(value)
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(new Date(hasTimeZone ? value : `${value}Z`))
}

function authHeader(email: string, password: string) {
  return `Basic ${window.btoa(`${email}:${password}`)}`
}

export default function MobiliaPanel() {
  const [email, setEmail] = useState('thiagodantas@outlook.com')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState('')
  const [form, setForm] = useState<SearchForm>(emptyForm)
  const [currentSearch, setCurrentSearch] = useState<MobiliaSearch | null>(null)
  const [history, setHistory] = useState<MobiliaSearch[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const currentOffers = currentSearch?.offers || []
  const partnerCount = useMemo(() => currentOffers.filter((offer) => offer.isPartner).length, [currentOffers])

  useEffect(() => {
    const savedAuth = window.sessionStorage.getItem('mobilia_auth')
    if (savedAuth) {
      setAuth(savedAuth)
      loadHistory(savedAuth)
    }
  }, [])

  async function mobiliaFetch<T>(path: string, options: RequestInit = {}, authValue = auth): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authValue,
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

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/mobilia/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error('Login inválido.')
      }
      const nextAuth = authHeader(email, password)
      window.sessionStorage.setItem('mobilia_auth', nextAuth)
      setAuth(nextAuth)
      setPassword('')
      setMessage('Login realizado.')
      await loadHistory(nextAuth)
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Erro ao entrar.')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    window.sessionStorage.removeItem('mobilia_auth')
    setAuth('')
    setCurrentSearch(null)
    setHistory([])
    setMessage('')
    setError('')
  }

  async function loadHistory(authValue = auth) {
    if (!authValue) return
    const data = await mobiliaFetch<MobiliaSearch[]>('/mobilia/history?limit=20', {}, authValue)
    setHistory(data)
  }

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const hasQuery = Object.values(form).some((value) => value.trim().length > 0)
    if (!hasQuery) {
      setError('Preencha pelo menos um campo para iniciar a busca.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('Buscando ofertas em lojas brasileiras...')

    try {
      const data = await mobiliaFetch<MobiliaSearch>('/mobilia/search', {
        method: 'POST',
        body: JSON.stringify({ ...form, cep: '59091-130' }),
      })
      setCurrentSearch(data)
      setMessage(`${data.resultsCount} oferta(s) encontradas para "${data.query}".`)
      await loadHistory()
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'Erro ao buscar ofertas.')
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  async function download(format: 'csv' | 'xlsx') {
    setError('')
    try {
      const response = await fetch(`${API_URL}/mobilia/export.${format}?limit=100`, {
        headers: { Authorization: auth },
        cache: 'no-store',
      })
      if (!response.ok) throw new Error(`Erro ao baixar ${format.toUpperCase()}.`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `mobilia-ofertas.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Erro ao baixar histórico.')
    }
  }

  if (!auth) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-12">
        <section className="card w-full p-6 sm:p-8">
          <span className="tag-oferta mb-4 inline-block">Acesso restrito</span>
          <h1 className="font-serif text-3xl font-bold text-[#1E3A5F]">Mobília</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Entre para pesquisar móveis e guardar histórico de ofertas para o apartamento novo.
          </p>

          <form onSubmit={login} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="email">Usuário</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1E3A5F]" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
                style={{ borderColor: '#E8E0D5' }}
              />
            </div>
            {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="tag-oferta mb-3 inline-block">Radar de Mobília</span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: '#1E3A5F' }}>
            Buscar móveis para o apartamento
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6B7280]">
            Pesquise por nome, modelo, tipo ou descrição. Parceiros aparecem primeiro; depois, os menores preços encontrados.
            Frete é considerado quando a loja informa na listagem, sempre pensando no CEP 59091-130.
          </p>
        </div>
        <button type="button" onClick={logout} className="btn-outline w-full sm:w-auto">Sair</button>
      </div>

      <section className="mb-6 rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
        <form onSubmit={search} className="grid gap-4 lg:grid-cols-2">
          <Field label="Nome do produto" value={form.productName} onChange={(value) => setForm({ ...form, productName: value })} placeholder="Ex.: sofá retrátil, rack, mesa de jantar" />
          <Field label="Modelo do produto" value={form.productModel} onChange={(value) => setForm({ ...form, productModel: value })} placeholder="Ex.: 3 lugares, 180 cm, madeira freijó" />
          <Field label="Tipo do produto" value={form.productType} onChange={(value) => setForm({ ...form, productType: value })} placeholder="Ex.: sofá, cama queen, cadeira, guarda-roupa" />
          <Field label="Descrição do produto" value={form.description} onChange={(value) => setForm({ ...form, description: value })} placeholder="Ex.: bege, compacto, com baú, entregue no Brasil" />

          <div className="flex flex-col gap-3 lg:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
              {loading ? 'Pesquisando...' : 'Buscar ofertas'}
            </button>
            <button type="button" onClick={() => setForm(emptyForm)} className="btn-outline w-full sm:w-auto">
              Limpar
            </button>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => download('csv')} className="btn-outline w-full sm:w-auto">Baixar CSV</button>
              <button type="button" onClick={() => download('xlsx')} className="btn-outline w-full sm:w-auto">Baixar XLSX</button>
            </div>
          </div>
        </form>
        {message ? <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      </section>

      <section className="mb-8">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Resultados da busca</h2>
            {currentSearch ? (
              <p className="mt-1 text-sm text-[#6B7280]">
                {currentSearch.resultsCount} resultado(s), {partnerCount} parceiro(s), CEP {currentSearch.cep}.
              </p>
            ) : (
              <p className="mt-1 text-sm text-[#6B7280]">As ofertas aparecem aqui logo após a pesquisa.</p>
            )}
          </div>
        </div>

        {currentOffers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentOffers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        ) : (
          <div className="rounded-lg border bg-white px-4 py-12 text-center" style={{ borderColor: '#E8E0D5' }}>
            <p className="font-semibold text-[#1E3A5F]">Nenhuma busca executada nesta sessão.</p>
            <p className="mt-2 text-sm text-[#6B7280]">Preencha qualquer campo acima para iniciar.</p>
          </div>
        )}
      </section>

      <section className="rounded-lg border bg-white p-4 sm:p-5" style={{ borderColor: '#E8E0D5' }}>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1E3A5F]">Histórico recente</h2>
            <p className="mt-1 text-sm text-[#6B7280]">Últimas buscas salvas para comparação futura.</p>
          </div>
          <button type="button" onClick={() => loadHistory()} className="btn-outline w-full sm:w-auto">Atualizar histórico</button>
        </div>

        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCurrentSearch(item)}
                className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-[#F5EFE6]"
                style={{ borderColor: '#E8E0D5' }}
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold text-[#1E3A5F]">{item.query}</p>
                    <p className="mt-1 text-xs text-[#6B7280]">{formatDate(item.createdAt)} · {item.resultsCount} oferta(s)</p>
                  </div>
                  <span className="badge-blue w-fit">{item.cep}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6B7280]">Nenhum histórico encontrado ainda.</p>
        )}
      </section>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1E3A5F]">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-[#1E3A5F]"
        style={{ borderColor: '#E8E0D5' }}
      />
    </div>
  )
}

function OfferCard({ offer }: { offer: MobiliaOffer }) {
  const hasDiscount =
    typeof offer.originalPrice === 'number' &&
    typeof offer.price === 'number' &&
    offer.originalPrice > offer.price
  const content = (
    <>
      <div className="relative h-44 bg-[#F5EFE6]">
        {offer.imageUrl ? (
          <img src={offer.imageUrl} alt={offer.title} className="h-full w-full object-contain p-3" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">🛋️</div>
        )}
        {offer.isPartner ? <span className="badge-gold absolute left-3 top-3">Parceiro</span> : null}
        {offer.discountPct ? <span className="badge-blue absolute right-3 top-3">-{offer.discountPct}%</span> : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="line-clamp-3 text-sm font-semibold leading-snug text-[#2D2D2D]">{offer.title}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">{offer.source}</p>
        </div>
        <div>
          {hasDiscount ? (
            <p className="text-xs text-[#6B7280]">
              De <span className="line-through">{formatMoney(offer.originalPrice)}</span>
            </p>
          ) : null}
          <p className="text-2xl font-black text-[#1E3A5F]">{formatMoney(offer.price)}</p>
        </div>
        {offer.couponCode || offer.couponNote ? (
          <div className="rounded-lg bg-[#FEF3C7] px-3 py-2 text-xs text-[#92400E]">
            {offer.couponCode ? <strong>Cupom: {offer.couponCode}. </strong> : null}
            {offer.couponNote || 'Cupom/promoção indicado pela loja.'}
          </div>
        ) : null}
        {offer.shippingNote ? (
          <p className="rounded-lg bg-[#F5EFE6] px-3 py-2 text-xs leading-relaxed text-[#6B7280]">{offer.shippingNote}</p>
        ) : null}
        <span className="mt-auto rounded-lg px-3 py-2.5 text-center text-xs font-bold text-white" style={{ backgroundColor: '#D4A373' }}>
          Ver oferta →
        </span>
      </div>
    </>
  )

  if (!offer.url) {
    return <div className="card flex min-h-full flex-col">{content}</div>
  }

  return (
    <a href={offer.url} target="_blank" rel="noopener noreferrer nofollow" className="card flex min-h-full flex-col">
      {content}
    </a>
  )
}
