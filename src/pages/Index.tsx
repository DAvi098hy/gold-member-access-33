import { useAuth } from '@/hooks/useAuth'
import { Login } from '@/components/Login'
import { MemberArea } from '@/components/MemberArea'

const Index = () => {
  const { isAuthenticated, loading } = useAuth()
  
  console.log('Index component - State:', { isAuthenticated, loading })

  if (loading) {
    console.log('Showing loading screen')
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full animate-glow-pulse"></div>
          <p className="text-muted-foreground animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  console.log('Rendering based on authentication:', isAuthenticated ? 'MemberArea' : 'Login')
  return isAuthenticated ? <MemberArea /> : <Login />
}

export default Index
