"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'

export default function Dashboard() {
  const { user, token, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token) router.push('/login')
  }, [token, router])

  if (!token) return <p className="text-slate-300">Checking authentication...</p>

  return (
    <section className="animated-fade space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-100">Welcome back, {user?.name}</h1>
            <p className="mt-3 text-slate-400 max-w-2xl">Your access level is <span className="font-semibold text-cyan-300">{user?.role || 'user'}</span>. Manage your secure workflow from one place.</p>
          </div>
          <button
            onClick={() => logout()}
            className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card p-6 text-slate-200">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Account</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{user?.email}</h2>
          <p className="mt-3 text-slate-400">Your authentication token is stored securely for this session with JWT-based access control.</p>
        </div>
        <div className="glass-card p-6 text-slate-200">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Security</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Bcrypt hashing</h2>
          <p className="mt-3 text-slate-400">Passwords are hashed and stored safely using bcrypt with configurable salt rounds.</p>
        </div>
        <div className="glass-card p-6 text-slate-200">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Admin</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Role based</h2>
          <p className="mt-3 text-slate-400">Admin-only API routes are supported so you can build enterprise workflows securely.</p>
        </div>
      </div>
    </section>
  )
}
