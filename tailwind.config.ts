import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:       '#1E3A5F',  // Azul Petróleo — principal
          'blue-dark':'#162C4A',  // hover do azul
          gold:       '#D4A373',  // Dourado — destaque
          'gold-dark':'#B8855A',  // hover do dourado
          champagne:  '#F5EFE6',  // secundária
          graphite:   '#2D2D2D',  // textos
          snow:       '#FAFAFA',  // fundo
          muted:      '#6B7280',  // textos secundários
          border:     '#E8E0D5',  // bordas
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
