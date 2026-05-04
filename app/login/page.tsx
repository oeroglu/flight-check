'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async () => {
    if (loading || sent) return
    if (!email.trim()) {
      setError('Email adresi gerekli')
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        // window.location.origin yerine doğrudan env değişkeni
        // ya da relative path kullan — Supabase bunu otomatik resolve eder
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSent(true)
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '0 16px' }}>
      <h1>Flight Check — Giriş</h1>

      {sent ? (
        <p>✅ Mail gönderildi. Gelen kutunu kontrol et.</p>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Email adresin"
            disabled={loading}
            style={{ display: 'block', width: '100%', marginBottom: 8 }}
          />

          {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}

          <button onClick={login} disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Magic Link Gönder'}
          </button>
        </>
      )}
    </div>
  )
}
