'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      // 🔥 HASH'ten token al
      const hash = window.location.hash

      if (hash) {
        const params = new URLSearchParams(hash.replace('#', ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (access_token && refresh_token) {
          await supabase.auth.setSession({
            access_token,
            refresh_token,
          })

          router.push('/')
          return
        }
      }

      // 🔥 fallback (code flow varsa)
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        console.error(error.message)
        router.push('/login')
        return
      }

      router.push('/')
    }

    run()
  }, [router])

  return <p>Logging in...</p>
}
