'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const login = async () => {
    if (loading || sent) return

    if (!email) {
      alert('Email gir')
      return
    }

    setLoading(true)

    // 🔥 BURASI KRİTİK
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://flight-check-omega.vercel.app'

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setSent(true)
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <button onClick={login} disabled={loading || sent}>
        {sent ? 'Mail gönderildi' : loading ? 'Gönderiliyor...' : 'Login'}
      </button>
    </div>
  )
}
