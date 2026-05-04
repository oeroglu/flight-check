'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // URL'deki tokenları alıp session'a çevirir
        const { error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        })

        if (error) {
          console.error(error.message)
          router.push('/login')
          return
        }

        // başarılı login → dashboard/home
        router.push('/')
      } catch (err) {
        console.error(err)
        router.push('/login')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div style={{ padding: 20 }}>
      <h2>Logging you in...</h2>
    </div>
  )
}
