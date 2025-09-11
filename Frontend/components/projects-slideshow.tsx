"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Play, ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Desert Oasis Cinema",
    category: "Luxury Villa Theatre",
    location: "Karachi, Pakistan",
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    description:
      "A state-of-the-art home cinema featuring 4K projection, Dolby Atmos surround sound, and custom Italian leather seating for the ultimate viewing experience.",
    year: "2024",
    size: "450 sq ft",
    investment: "PKR 2.5M",
  },
  {
    id: 2,
    title: "Smart Living Integration",
    category: "Penthouse Automation",
    location: "Lahore, Pakistan",
    image: "/modern-smart-home-minimalist-blue-tones.jpg",
    description:
      "Complete smart home transformation with integrated lighting, climate control, security systems, and voice-activated controls throughout the residence.",
    year: "2024",
    size: "3,200 sq ft",
    investment: "PKR 1.8M",
  },
  {
    id: 3,
    title: "Executive Boardroom AV",
    category: "Corporate Installation",
    location: "Islamabad, Pakistan",
    image: "/corporate-boardroom-premium-av-equipment-modern.jpg",
    description:
      "Professional-grade audiovisual setup with wireless presentation systems, video conferencing, and automated room controls for seamless business operations.",
    year: "2023",
    size: "800 sq ft",
    investment: "PKR 3.2M",
  },
]

export function ProjectsSlideshow() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 8000) // Slower for premium feel
    
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setIsAutoPlaying(false)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlaying(false)
  }

  const goToProject = (index: number) => {
    setCurrentProject(index)
    setIsAutoPlaying(false)
  }

  const currentProjectData = projects[currentProject]

  return (
    <section id="projects" className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="text-premium text-muted-foreground mb-6 animate-fade-in-up">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground max-w-5xl animate-fade-in-up">
            Transforming spaces into
            <span className="accent-text text-muted-foreground block mt-2"> extraordinary experiences.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Project Image */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[4/3] overflow-hidden surface-floating rounded-xl lg:rounded-2xl">
              <img
                src={currentProjectData.image || "/placeholder.svg"}
                alt={currentProjectData.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button className="glass-effect border border-white/30 rounded-full p-6 hover:bg-white/20 transition-all duration-300 hover-lift group/play">
                  <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform duration-300" />
                </button>
              </div>

              {/* Project Number Indicator */}
              <div className="absolute top-6 left-6 glass-effect border border-border/30 px-4 py-2 rounded-lg">
                <span className="text-premium text-foreground">
                  {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-10">
            {/* Category & Title */}
            <div className="space-y-4">
              <div className="text-premium text-[color:var(--color-accent-gold)]">
                {currentProjectData.category}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                {currentProjectData.title}
              </h3>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                {currentProjectData.description}
              </p>
            </div>

            {/* Project Stats */}
            <div className="surface-elevated border border-border/50 rounded-xl p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <div className="text-premium text-muted-foreground mb-2">Location</div>
                  <div className="text-foreground font-medium">{currentProjectData.location}</div>
                </div>
                <div>
                  <div className="text-premium text-muted-foreground mb-2">Year</div>
                  <div className="text-foreground font-medium">{currentProjectData.year}</div>
                </div>
                <div>
                  <div className="text-premium text-muted-foreground mb-2">Size</div>
                  <div className="text-foreground font-medium">{currentProjectData.size}</div>
                </div>
                <div>
                  <div className="text-premium text-muted-foreground mb-2">Investment</div>
                  <div className="text-foreground font-medium">{currentProjectData.investment}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground p-0 h-auto text-premium group"
                  onClick={prevProject}
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="group-hover:tracking-wider transition-all duration-300">Previous</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground p-0 h-auto text-premium group"
                  onClick={nextProject}
                >
                  <span className="group-hover:tracking-wider transition-all duration-300">Next</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Project Indicators */}
              <div className="flex space-x-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 hover-lift ${
                      index === currentProject 
                        ? "bg-[color:var(--color-accent-gold)] w-12" 
                        : "bg-border hover:bg-muted-foreground w-2"
                    }`}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="surface-elevated hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-8 py-4 text-premium transition-all duration-500 hover-lift group inline-flex items-center space-x-3">
                <span className="group-hover:tracking-wider transition-all duration-300">
                  View Project Details
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-20 lg:mt-28 flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-premium text-muted-foreground">Autoplay</span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`w-12 h-6 rounded-full border transition-all duration-300 relative ${
                isAutoPlaying 
                  ? 'bg-[color:var(--color-accent-gold)] border-[color:var(--color-accent-gold)]' 
                  : 'bg-muted border-border'
              }`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                  isAutoPlaying ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="text-center">
            <button className="glass-effect text-foreground hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-10 py-4 text-premium transition-all duration-700 hover-lift group">
              <span className="group-hover:tracking-wider transition-all duration-300">
                View All Projects
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
