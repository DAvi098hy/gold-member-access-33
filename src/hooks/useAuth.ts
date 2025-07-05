import { useState, useEffect } from 'react'

interface User {
  email: string
  isAuthenticated: boolean
}

const STORAGE_KEY = 'gold-member-auth'
const VALID_PASSWORD = 'acesso123'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored)
        setUser(parsedUser)
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('useAuth login called with:', { email, password })
    console.log('Checking against valid password:', VALID_PASSWORD)
    
    if (password === VALID_PASSWORD && email.includes('@')) {
      const userData = { email, isAuthenticated: true }
      console.log('Login validation passed, setting user:', userData)
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      console.log('User data saved to localStorage')
      return true
    }
    console.log('Login validation failed')
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user?.isAuthenticated
  }
}