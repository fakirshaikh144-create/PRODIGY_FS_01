"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type User = { id: string, name: string, email: string, role?: string } | null

const AuthContext = createContext<any>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const t = localStorage.getItem('token')
      if (!t) return
      setToken(t)

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${t}` }
        })
        const data = await res.json()
        if (data.user) {
          setUser(data.user)
        } else {
          setToken(null)
          localStorage.removeItem('token')
        }
      } catch (error) {
        setToken(null)
        localStorage.removeItem('token')
      }
    }

    loadUser()
  }, [])

  const setUserAndToken = (u: User, t: string) => {
    setUser(u); setToken(t); localStorage.setItem('token', t)
  }

  const logout = () => { setUser(null); setToken(null); localStorage.removeItem('token') }

  return (
    <AuthContext.Provider value={{ user, token, setUserAndToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
