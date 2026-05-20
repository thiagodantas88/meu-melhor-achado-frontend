import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6">🔍</p>
      <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: '#1E3A5F' }}>
        Página não encontrada
      </h1>
      <p className="mb-8" style={{ color: '#7A7A7A' }}>
        Este conteúdo não existe ou foi removido.
      </p>
      <Link href="/" className="btn-gold">
        Voltar para o início
      </Link>
    </div>
  )
}
