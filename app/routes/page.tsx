'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Route = {
  id: string
  origin: string
  destination: string
  max_price: number
  active: boolean
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createClient()

  const fetchRoutes = async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.from('routes').select('*')

    if (error) {
      setError(error.message)
    } else {
      setRoutes(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    // Önce session kontrolü yap
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }
      fetchRoutes()
    })
  }, [])

  const addRoute = async () => {
    const { error } = await supabase.from('routes').insert({
      origin: 'IST',
      destination: 'LON',
      max_price: 200,
      active: true,
    })

    if (error) {
      alert('Eklenemedi: ' + error.message)
      return
    }

    fetchRoutes()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Routes</h1>
        <button onClick={logout}>Çıkış</button>
      </div>

      <button onClick={addRoute} style={{ marginBottom: 16 }}>
        + IST → LON Ekle
      </button>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>Hata: {error}</p>}

      {!loading && routes.length === 0 && <p>Henüz rota yok.</p>}

      {routes.map((r) => (
        <div
          key={r.id}
          style={{
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <strong>{r.origin} → {r.destination}</strong>
          <span style={{ marginLeft: 16, color: '#666' }}>
            Max: ${r.max_price} | {r.active ? '✅ Aktif' : '⏸ Pasif'}
          </span>
        </div>
      ))}
    </div>
  )
}
