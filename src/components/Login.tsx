import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    console.log('Login attempt:', { email, password })

    const success = await login(email, password)
    console.log('Login result:', success)
    
    if (success) {
      console.log('Login successful, user should be redirected')
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo à área de membros premium.",
      })
    } else {
      console.log('Login failed')
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Use a senha: acesso123",
        variant: "destructive"
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card animate-shimmer"></div>
      
      {/* Floating elements for futuristic feel */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
      
      <Card className="w-full max-w-md glass-card relative z-10 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <span className="text-2xl font-bold text-primary-foreground">M</span>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Membros Checkout Próprio
          </CardTitle>
          <p className="text-muted-foreground">
            Acesse sua área de membros premium
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-card/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-premium text-primary-foreground font-semibold py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar na Área Premium'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Senha: <span className="text-primary font-mono">acesso123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}