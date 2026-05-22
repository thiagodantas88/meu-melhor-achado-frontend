'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

const NAV_CATEGORIES = [
  { slug: 'tecnologia', name: 'Tecnologia', icon: '💻' },
  { slug: 'casa', name: 'Casa', icon: '🏠' },
  { slug: 'carro', name: 'Carro', icon: '🚗' },
  { slug: 'home-office', name: 'Home Office', icon: '🖥️' },
  { slug: 'bebidas', name: 'Bebidas', icon: '🍷' },
  { slug: 'moda', name: 'Moda', icon: '👗' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: '#FAFAFA' }} className="sticky top-0 z-50 border-b border-brand-border shadow-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" aria-label="Ir para a home" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="rounded-lg px-2.5 py-2 text-sm text-brand-blue transition-colors hover:bg-brand-champagne hover:text-brand-gold xl:px-3"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/sobre"
            className="rounded-lg px-2.5 py-2 text-sm text-brand-muted transition-colors hover:bg-brand-champagne hover:text-brand-blue xl:px-3"
          >
            Sobre
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/ofertas"
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-blue"
            style={{ backgroundColor: '#D4A373' }}
          >
            🏷️ Ofertas
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="min-h-11 min-w-11 rounded-lg p-2 text-brand-blue hover:bg-brand-champagne lg:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div style={{ backgroundColor: '#FAFAFA' }} className="border-t border-brand-border lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            <Link
              href="/ofertas"
              onClick={() => setMenuOpen(false)}
              className="mb-1 rounded-lg px-3 py-3 text-sm font-bold text-white"
              style={{ backgroundColor: '#D4A373' }}
            >
              🏷️ Ofertas do dia
            </Link>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-brand-blue transition-colors hover:bg-brand-champagne hover:text-brand-gold"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <Link
              href="/sobre"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-brand-muted hover:bg-brand-champagne hover:text-brand-blue"
            >
              Sobre
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
