'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import { CATEGORIES } from '@/lib/mock-data'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: '#FAFAFA' }} className="sticky top-0 z-50 border-b border-brand-border shadow-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">

        <Link href="/" aria-label="Ir para a home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="text-sm text-brand-blue hover:text-brand-gold hover:bg-brand-champagne px-3 py-2 rounded-lg transition-colors"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/sobre"
            className="text-sm text-brand-muted hover:text-brand-blue hover:bg-brand-champagne px-3 py-2 rounded-lg transition-colors"
          >
            Sobre
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden min-h-11 min-w-11 rounded-lg p-2 text-brand-blue hover:bg-brand-champagne"
          aria-label="Abrir menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#FAFAFA' }} className="md:hidden border-t border-brand-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {CATEGORIES.map((cat) => (
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
