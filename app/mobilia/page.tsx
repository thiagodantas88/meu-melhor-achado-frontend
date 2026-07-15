import MobiliaPanel from './MobiliaPanel'

export const metadata = {
  title: 'Mobília',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default function MobiliaPage() {
  return <MobiliaPanel />
}
