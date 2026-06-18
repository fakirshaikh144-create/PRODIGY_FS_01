"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUserAndToken } = useAuth()

  const submit = async (e: any) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('All fields required')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch (parseErr) {
        throw new Error(`Unexpected server response: ${text}`)
      }
      if (!res.ok) throw new Error(data.message || 'Login failed')
      setUserAndToken(data.user, data.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="animated-fade mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">Secure login</p>
        <h1 className="text-3xl font-semibold text-slate-100">Welcome back</h1>
        <p className="text-slate-400">Sign in to your Prodigy dashboard and continue managing your account.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-medium text-slate-200">
          Email address
          <input
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="name@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Password
          <input
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button
          className="button-glow w-full rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </form>
    </section>
  )
}
