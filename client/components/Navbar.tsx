"use client"
import Link from 'next/link'
import { useAuth } from './AuthProvider'

export default function Navbar() {
  const { token, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-50">
          Prodigy<span className="text-cyan-400">Labs</span>
        </Link>

        <div className="flex items-center gap-3 text-slate-200">
          <Link href="/" className="transition hover:text-white">Home</Link>
          {!token && <Link href="/register" className="transition hover:text-white">Register</Link>}
          {!token && <Link href="/login" className="transition hover:text-white">Login</Link>}
          {token && <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>}
        </div>

        {token ? (
          <button
            onClick={logout}
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            Sign out
          </button>
        ) : null}
      </div>
    </nav>
  )
}
