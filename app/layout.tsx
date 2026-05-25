import type { Metadata } from 'next'
import { Lora, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Meu Melhor Achado — Recomendações em que você pode confiar',
    template: '%s | Meu Melhor Achado',
  },
  description:
    'Comparativos, guias de compra e recomendações honestas para ajudar você a escolher produtos com confiança e bom custo-benefício.',
  keywords: ['recomendações', 'comparativo de produtos', 'guia de compra', 'afiliados', 'tecnologia', 'casa', 'carro', 'home office'],
  openGraph: {
    siteName: 'Meu Melhor Achado',
    locale: 'pt_BR',
    type: 'website',
  },
  verification: {
    google: 'qKIzuWA5hxXYwl1l7anU0YSdnY2xTDKkLCldHCRAdmw',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
