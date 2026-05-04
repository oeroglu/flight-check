'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/login')
        return
      }

      router.push('/')
    }

    run()
  }, [router])

  return <p>Logging in...</p>
}
