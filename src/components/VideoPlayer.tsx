import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle2, SkipForward } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Course {
  id: number
  title: string
  videoUrl: string
  thumbnail: string
  description: string
  completed: boolean
}

interface VideoPlayerProps {
  course: Course
  onBack: () => void
  onComplete: () => void
}

export const VideoPlayer = ({ course, onBack, onComplete }: VideoPlayerProps) => {
  const [watchProgress, setWatchProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Simulate video progress
    const interval = setInterval(() => {
      setWatchProgress(prev => {
        const newProgress = prev + 2
        if (newProgress >= 100 && !isCompleted) {
          setIsCompleted(true)
          // Use setTimeout to avoid setState during render
          setTimeout(() => {
            toast({
              title: "Aula concluída!",
              description: "Parabéns! Você completou esta aula.",
            })
          }, 0)
        }
        return Math.min(newProgress, 100)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isCompleted])

  const handleComplete = () => {
    onComplete()
    toast({
      title: "Progresso salvo!",
      description: "Avançando para a próxima aula...",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center space-x-2 hover:bg-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground line-clamp-1">
                {course.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Aula {course.id} • Checkout Próprio
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Video Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="glass-card overflow-hidden">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={course.videoUrl}
                  title={course.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </Card>

            {/* Video Progress */}
            <Card className="glass-card mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Progresso da Aula</h3>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(watchProgress)}%
                  </span>
                </div>
                
                <Progress 
                  value={watchProgress} 
                  className="mb-4 h-3"
                />
                
                <div className="flex items-center justify-between">
                  {isCompleted ? (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Aula concluída!</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      Assistindo...
                    </span>
                  )}
                  
                  {isCompleted && (
                    <Button 
                      onClick={handleComplete}
                      className="btn-premium flex items-center space-x-2"
                    >
                      <span>Próxima Aula</span>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Sobre esta Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duração:</span>
                    <span className="text-foreground">~15 minutos</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Módulo:</span>
                    <span className="text-foreground">Checkout Próprio</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nível:</span>
                    <span className="text-foreground">Intermediário</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Recursos da Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">Material de apoio incluído</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">Vídeo em alta definição</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">Acesso vitalício</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">Suporte incluído</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}