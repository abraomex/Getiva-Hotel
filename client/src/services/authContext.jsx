import { createContext, useContext, useState, useEffect } from 'react'
import { api } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('getva_admin_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('getva_admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verify() {
      if (token) {
        try {
          const profile = await api.getMe()
          setUser(profile)
        } catch (err) {
          console.warn('Session verification error, signing out')
          logout()
        }
      }
      setLoading(false)
    }
    verify()
  }, [token])

  const login = async (email, password) => {
    const res = await api.login(email, password)
    setUser(res.user)
    setToken(res.token)
    return res
  }

  const logout = async () => {
    await api.logout()
    setUser(null)
    setToken(null)
  }

  const isAuthenticated = Boolean(user && token)

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
