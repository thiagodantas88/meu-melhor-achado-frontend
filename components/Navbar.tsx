'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import { CATEGORIES } from '@/lib/mock-data'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ backgroundColor: '#1E3A5F' }} className="sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" aria-label="Ir para a home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="text-sm text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/sobre"
            className="text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            Sobre
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
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
        <div style={{ backgroundColor: '#162C4A' }} className="md:hidden border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-lg transition-colors text-sm"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <Link
              href="/sobre"
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white px-3 py-2.5 text-sm"
            >
              Sobre
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
