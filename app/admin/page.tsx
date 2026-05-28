import AdminPanel from './AdminPanel'

export const metadata = {
  title: 'Administração',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return <AdminPanel />
}
