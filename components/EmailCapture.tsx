'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const saved = JSON.parse(localStorage.getItem('mma_leads') || '[]')
      if (!saved.includes(email)) {
        saved.push(email)
        localStorage.setItem('mma_leads', JSON.stringify(saved))
      }
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-lg px-5 py-7 md:px-8 md:py-8" style={{ backgroundColor: '#1E3A5F' }}>
      <div className="mx-auto max-w-xl text-center">
        <h3 className="font-serif text-xl font-bold text-white md:text-2xl">
          Receba os melhores achados da semana
        </h3>
        <p className="mb-6 mt-2 text-sm text-white/70">
          Só o que vale a pena, sem spam e sem enrolação.
        </p>

        {status === 'ok' ? (
          <p className="font-semibold text-white">
            Ótimo. Você está na lista.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              required
              className="min-h-11 flex-1 rounded-lg px-4 py-3 text-sm outline-none"
              style={{ color: '#2D2D2D' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="min-h-11 shrink-0 rounded-lg px-6 py-3 text-sm font-bold transition-colors hover:brightness-95 disabled:opacity-70"
              style={{ backgroundColor: '#D4A373', color: '#fff' }}
            >
              {loading ? 'Salvando...' : 'Quero receber'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-200">Algo deu errado. Tente novamente.</p>
        )}
      </div>
    </section>
  )
}
