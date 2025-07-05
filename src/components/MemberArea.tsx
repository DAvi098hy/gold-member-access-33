import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { VideoPlayer } from './VideoPlayer'
import { LogOut, Play, CheckCircle2 } from 'lucide-react'
import courseHero from '@/assets/course-hero.jpg'

interface Course {
  id: number
  title: string
  videoUrl: string
  thumbnail: string
  description: string
  completed: boolean
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introdução ao Checkout Próprio",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: courseHero,
    description: "Aprenda os fundamentos para criar seu próprio sistema de checkout.",
    completed: false
  },
  {
    id: 2,
    title: "Caderno Atividades Grafismo Fonético Nível 1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/lovable-uploads/095764ed-bee5-40a8-9621-9ad879bec498.png",
    description: "Atividades práticas para desenvolvimento do grafismo fonético.",
    completed: false
  },
  {
    id: 3,
    title: "Subindo seu Checkout",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: courseHero,
    description: "Passo a passo para colocar seu checkout no ar.",
    completed: false
  },
  {
    id: 4,
    title: "Adicionando Produto, Editando Checkout e OrderBumps",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
    thumbnail: courseHero,
    description: "Otimize suas vendas com produtos adicionais e customizações avançadas.",
    completed: false
  }
]

export const MemberArea = () => {
  const { user, logout } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseList, setCourseList] = useState(courses)

  const handleCourseComplete = (courseId: number) => {
    // Find next course before updating state
    const currentIndex = courseList.findIndex(c => c.id === courseId)
    const nextCourse = courseList[currentIndex + 1]
    
    setCourseList(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, completed: true }
          : course
      )
    )
    
    // Auto advance to next course
    if (nextCourse) {
      setTimeout(() => setSelectedCourse(nextCourse), 1000)
    }
  }

  const completedCount = courseList.filter(c => c.completed).length
  const progressPercentage = (completedCount / courseList.length) * 100

  if (selectedCourse) {
    return (
      <VideoPlayer 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)}
        onComplete={() => handleCourseComplete(selectedCourse.id)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-gold">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Membros Checkout Próprio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, {user?.email}
                </p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center space-x-2 hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Seu Progresso</h2>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {completedCount}/{courseList.length} aulas
              </Badge>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-gold"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(progressPercentage)}% concluído
            </p>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courseList.map((course, index) => (
            <Card 
              key={course.id} 
              className="course-card cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-glow backdrop-blur-sm">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>

                  {/* Completion badge */}
                  {course.completed && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 text-foreground line-clamp-2">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={course.completed ? "default" : "secondary"}>
                    {course.completed ? "Concluída" : "Pendente"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Aula {course.id}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}