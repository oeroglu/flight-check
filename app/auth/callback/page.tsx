'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      // 🔥 session'ı al
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        console.error(error.message)
        router.push('/login')
        return
      }

      // 🔥 session gerçekten oluştu mu kontrol et
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        router.push('/login')
        return
      }

      router.push('/')
    }

    run()
  }, [router])

  return <p>Logging in...</p>
}
