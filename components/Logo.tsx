// Logo oficial — Meu Melhor Achado
// "MEU" → Azul Petróleo | "MELHOR" → Grafite | "ACHADO" → Dourado
// Ícone: lupa minimalista com estrela integrada

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-3xl' : 'text-xl'
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 28 : 22

  return (
    <span className={`inline-flex items-center gap-2 font-serif font-bold ${textSize} leading-none`}>
      {/* Ícone: lupa + estrela */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Lupa */}
        <circle cx="10" cy="10" r="6" stroke="#1E3A5F" strokeWidth="2" />
        <line x1="14.5" y1="14.5" x2="20" y2="20" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" />
        {/* Estrela pequena integrada ao topo da lupa */}
        <path
          d="M10 4.5 L10.4 5.8 L11.8 5.8 L10.7 6.6 L11.1 7.9 L10 7.1 L8.9 7.9 L9.3 6.6 L8.2 5.8 L9.6 5.8 Z"
          fill="#D4A373"
        />
      </svg>

      {/* Texto */}
      <span>
        <span style={{ color: '#1E3A5F' }}>MEU </span>
        <span style={{ color: '#2D2D2D' }}>MELHOR </span>
        <span style={{ color: '#D4A373' }}>ACHADO</span>
      </span>
    </span>
  )
}
