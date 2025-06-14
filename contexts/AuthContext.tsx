"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { AuthService, User } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, username: string, password: string, isStaff?: boolean) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
  login: async () => ({ success: false }),
  register: async () => ({ success: false })
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkSession = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token')
      if (!sessionToken) {
        setLoading(false)
        return
      }

      const user = await AuthService.validateSession(sessionToken)
      if (user) {
        setUser(user)
      } else {
        localStorage.removeItem('session_token')
      }
    } catch (error) {
      console.error('Session validation error:', error)
      localStorage.removeItem('session_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password)
    if (result.success && result.user && result.token) {
      setUser(result.user)
      localStorage.setItem('session_token', result.token)
    }
    return result
  }

  const register = async (email: string, username: string, password: string, isStaff: boolean = false) => {
    const result = await AuthService.register(email, username, password, isStaff)
    if (result.success && result.user && result.token) {
      setUser(result.user)
      localStorage.setItem('session_token', result.token)
    }
    return result
  }

  const signOut = async () => {
    const sessionToken = localStorage.getItem('session_token')
    if (sessionToken) {
      await AuthService.logout(sessionToken)
      localStorage.removeItem('session_token')
    }
    setUser(null)
  }

  const refreshUser = async () => {
    await checkSession()
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshUser, login, register }}>
      {children}
    </AuthContext.Provider>
  )
}