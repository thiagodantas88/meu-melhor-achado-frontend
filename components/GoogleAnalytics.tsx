'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    dataLayer?: Array<IArguments | unknown[]>
    gtag?: (...args: unknown[]) => void
  }
}

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!GA_ID) return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('config', GA_ID, {
      page_path: window.location.pathname,
    })
  }, [GA_ID])

  if (!GA_ID) return null

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
  )
}
