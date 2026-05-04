'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert('Magic link gönderildi → mailini kontrol et')
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
      />

      <button onClick={login} disabled={loading}>
        {loading ? 'Gönderiliyor...' : 'Login'}
      </button>
    </div>
  )
}
