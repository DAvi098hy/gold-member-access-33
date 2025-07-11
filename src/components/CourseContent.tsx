import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, CheckCircle2, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Course {
  id: number
  title: string
  videoUrl: string
  thumbnail: string
  description: string
  completed: boolean
}

interface PDF {
  id: number
  title: string
  description: string
  url: string
  size: string
}

interface CourseContentProps {
  course: Course
  onBack: () => void
  onComplete: () => void
}

// PDFs disponíveis para download
const coursePDFs: { [key: number]: PDF[] } = {
  2: [
    {
      id: 3,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel l - Letra Cursiva",
      description: "Atividades práticas para desenvolvimento",
      url: "https://drive.google.com/file/d/1DFsJqwLqUbcPZxcCHnhNg57oVvxT0Gry/preview",
      size: "5.2 MB"
    },
    {
      id: 4,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel l - Bastão",
      description: "Templates para criar novos exercícios",
      url: "https://drive.google.com/file/d/1-A7wxU_iYDFGgq-N2ZdKQs1V3XFaYLz3/preview",
      size: "3.4 MB"
    }
  ],
  3: [
    {
      id: 5,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel 2 - Letra Cursiva",
      description: "Atividades práticas para desenvolvimento",
      url: "https://drive.google.com/file/d/1fpwXF3ItkTWNJelS0RoylbDRGQ9dUhrw/preview",
      size: "5.2 MB"
    },
    {
      id: 6,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel 2 - Bastão",
      description: "Templates para criar novos exercícios",
      url: "https://drive.google.com/file/d/1GHQlE8SoOhQFQ4feBRCrZrtV0PEK8wzw/preview",
      size: "3.4 MB"
    }
  ],
  4: [
    {
      id: 7,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel 3 - Letra Cursiva",
      description: "Atividades práticas para desenvolvimento",
      url: "https://drive.google.com/file/d/1oXVfSPa1G68xWf2blN3e4y8knroX3bY-/preview",
      size: "5.2 MB"
    },
    {
      id: 8,
      title: "Caderno de Atividades - Grafismos Fonéticos Nivel 3 - Bastão",
      description: "Templates para criar novos exercícios",
      url: "https://drive.google.com/file/d/17HvORDb4546oZ00qDtgjtE94q6_nRrer/preview",
      size: "3.4 MB"
    }
  ],
  5: [
    {
      id: 9,
      title: "BÔNUS - atividades_para_colorir",
      description: "Atividades para colorir",
      url: "https://drive.google.com/file/d/1F5AwfDDQbVXJnj3O448gkBV2S2sE3aCK/preview",
      size: "2.1 MB"
    },
    {
      id: 10,
      title: "BÔNUS - formando palavras",
      description: "Atividades de formação de palavras",
      url: "https://drive.google.com/file/d/1c1ok9--xZICXde1iV-Ngd0_ZlmTRUbPS/preview",
      size: "1.8 MB"
    },
    {
      id: 11,
      title: "BÔNUS - descobrindo_o_alfabeto",
      description: "Descobrindo o alfabeto",
      url: "https://drive.google.com/file/d/1IeDB63Tv9myZwxJODk-WiMgzCp4uDosH/preview",
      size: "2.5 MB"
    },
    {
      id: 12,
      title: "BÔNUS - caderno_silabas_simples",
      description: "Caderno de sílabas simples",
      url: "https://drive.google.com/file/d/1aofgCnr3S3mlUXmK5VjpVUhSGmxr2S1Q/preview",
      size: "3.2 MB"
    },
    {
      id: 13,
      title: "BÔNUS - caderno_alfabeto_tracado",
      description: "Caderno de alfabeto tracejado",
      url: "https://drive.google.com/file/d/1HDBhh7Tg4J0xti9wTJzGg0dM7ppXwxB_/preview",
      size: "2.7 MB"
    },
    {
      id: 14,
      title: "BÔNUS - alfabeto ilustrado",
      description: "Alfabeto com ilustrações",
      url: "https://drive.google.com/file/d/1IOqYkt1EE_NDdXa69zXXD4xRzFz_FmJW/preview",
      size: "3.1 MB"
    },
    {
      id: 15,
      title: "BÔNUS - alfabeto_com_relogio",
      description: "Alfabeto com relógio",
      url: "https://drive.google.com/file/d/1VZI8LaBq_cygh-Hs2tMGAr8YuHMZHMNm/preview",
      size: "2.3 MB"
    },
    {
      id: 16,
      title: "BÔNUS - alfabeto_com_pintura",
      description: "Alfabeto com pintura",
      url: "https://drive.google.com/file/d/1EIWnB3C52S1qGrVE4G3lXh_GTDKbKzcb/preview",
      size: "2.9 MB"
    },
    {
      id: 17,
      title: "BÔNUS - alfabeto_com_imagem",
      description: "Alfabeto com imagens",
      url: "https://drive.google.com/file/d/1p8kU2ZuNRd-X5bcz7PLbJmE3bhDR-0RS/preview",
      size: "2.6 MB"
    },
    {
      id: 18,
      title: "BÔNUS - Alfabeto com carinhas",
      description: "Alfabeto com carinhas",
      url: "https://drive.google.com/file/d/1YRghmYMsu5FC2xbPH9pA9qFQOT_Hm1Im/preview",
      size: "2.4 MB"
    }
  ]
}

export const CourseContent = ({ course, onBack, onComplete }: CourseContentProps) => {
  const { toast } = useToast()
  const pdfs = coursePDFs[course.id] || []
  const [selectedPdf, setSelectedPdf] = useState<PDF | null>(null)

  const handleDownload = (pdf: PDF) => {
    // Aqui você implementaria o download real do PDF
    toast({
      title: "Download iniciado",
      description: `Baixando: ${pdf.title}`,
    })
  }

  const handleMarkComplete = () => {
    onComplete()
    toast({
      title: "Aula concluída!",
      description: "Parabéns por completar esta aula.",
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
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">
                {course.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Aula {course.id} - {course.description}
              </p>
            </div>

            {course.completed && (
              <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Concluída
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Conteúdo Principal */}
        <div className="space-y-6">
          {/* Imagem da Aula */}
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={course.id === 1 ? "/lovable-uploads/c30c78d8-0dc8-43d9-aded-8008219a6169.png" : course.id === 3 || course.id === 4 || course.id === 5 ? "/lovable-uploads/0e6b7c1d-b227-42e5-9731-6fd403794507.png" : "/lovable-uploads/7a9eec2f-cb74-4d8b-8ca9-440cc38ccc25.png"}
                  alt={course.title}
                  className={`w-full rounded-lg ${course.id === 1 ? 'h-auto object-contain' : 'h-[400px] object-cover'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                
                {/* Overlay com informações */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {course.title}
                  </h2>
                  <p className="text-white/90 text-lg">
                    {course.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materiais da Aula - Agora embaixo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Materiais da Aula</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.id === 1 ? (
                // Video embed for course 1
                <div className="w-full">
                  <div className="space-y-3 w-full">
                    <div className="text-sm">
                      <h4 className="font-medium text-xs sm:text-sm break-words">Aula Prática</h4>
                      <p className="text-muted-foreground text-xs">Vídeo demonstrativo da aula prática</p>
                    </div>
                    <div className="w-full overflow-hidden">
                      <iframe 
                        src={course.videoUrl}
                        width="100%" 
                        height="400"
                        className="border border-border/50 rounded-lg w-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px]"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                </div>
              ) : (course.id === 2 || course.id === 3 || course.id === 4 || course.id === 5) ? (
                // Embedded PDF viewer for course 2
                <div className="w-full">
                  {/* PDF Selector */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">Selecionar PDF:</label>
                    <div className="flex flex-col gap-2 w-full">
                      {pdfs.map((pdf) => (
                        <Button
                          key={pdf.id}
                          variant={selectedPdf?.id === pdf.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPdf(pdf)}
                          className="text-left justify-start w-full text-xs sm:text-sm px-3 py-2 h-auto whitespace-normal break-words"
                        >
                          {pdf.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* PDF Embed */}
                  {selectedPdf && (
                    <div className="space-y-3 w-full">
                      <div className="text-sm">
                        <h4 className="font-medium text-xs sm:text-sm break-words">{selectedPdf.title}</h4>
                        <p className="text-muted-foreground text-xs">{selectedPdf.description}</p>
                      </div>
                      <div className="w-full overflow-hidden">
                        <iframe 
                          src={selectedPdf.url}
                          width="100%" 
                          height="400"
                          className="border border-border/50 rounded-lg w-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px]"
                          allow="autoplay"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Regular download buttons for other courses
                pdfs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pdfs.map((pdf) => (
                      <div 
                        key={pdf.id}
                        className="p-4 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm">
                              {pdf.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {pdf.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Tamanho: {pdf.size}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(pdf)}
                            className="ml-2 flex-shrink-0"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum material disponível para esta aula.
                  </p>
                )
              )}
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Sobre esta Aula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Módulo:</span>
                <span className="ml-2 font-medium">Aula {course.id}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2">
                  {course.completed ? (
                    <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Concluída
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Em Progresso
                    </Badge>
                  )}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Materiais:</span>
                <span className="ml-2 font-medium">{pdfs.length} PDF(s)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão de Conclusão - Agora abaixo dos PDFs */}
        {!course.completed && (
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">
                  Pronto para marcar como concluída?
                </h3>
                <p className="text-muted-foreground">
                  Ao marcar esta aula como concluída, você avançará automaticamente para a próxima.
                </p>
                <Button 
                  onClick={handleMarkComplete}
                  variant="premium"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marcar como Concluída
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}