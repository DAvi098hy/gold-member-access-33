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
      
      // Save to localStorage first
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      
      // Then update state using functional update to ensure it triggers re-render
      setUser(prevUser => {
        console.log('Setting user state from:', prevUser, 'to:', userData)
        return userData
      })
      
      console.log('User data saved and state updated')
      return true
    }
    console.log('Login validation failed')
    return false
  }

  const logout = () => {
    console.log('Logout function called')
    console.log('Current user before logout:', user)
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    console.log('User logged out successfully')
    
    // Force a page reload to ensure clean state
    window.location.reload()
  }

  const isAuthenticated = !!user?.isAuthenticated
  console.log('useAuth hook state:', { user, loading, isAuthenticated })

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  }
}