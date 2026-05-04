'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const login = async () => {
    await supabase.auth.signInWithOtp({ email })
    alert('Magic link gönderildi')
  }
  return (
    <div>
      <h1>Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}
