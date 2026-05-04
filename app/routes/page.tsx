'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RoutesPage() {
  const [routes, setRoutes] = useState<any[]>([])

  const fetchRoutes = async () => {
    const { data } = await supabase.from('routes').select('*')
    setRoutes(data || [])
  }

  useEffect(() => {
    fetchRoutes()
  }, [])

  const addRoute = async () => {
    await supabase.from('routes').insert({
      origin: 'IST',
      destination: 'LON',
      max_price: 200,
      active: true
    })
    fetchRoutes()
  }

  return (
    <div>
      <h1>Routes</h1>
      <button onClick={addRoute}>Add</button>
      {routes.map(r => (
        <div key={r.id}>
          {r.origin} → {r.destination}
        </div>
      ))}
    </div>
  )
}
