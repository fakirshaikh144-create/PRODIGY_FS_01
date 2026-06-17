import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import AuthProvider from '../components/AuthProvider'

export const metadata = {
  title: 'Prodigy Auth',
  description: 'Enterprise authentication system with secure login, registration, and dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
