"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize, ArrowUpRight } from "lucide-react"

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
  },
]

export function ProjectsSlideshow() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 8000)
    return () => clearInterval(timer)
  }, [currentProject])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentProject) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentProject(index)
      setIsTransitioning(false)
    }, 300)
  }

  const project = projects[currentProject]

  return (
    <section id="projects" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            Our recent work
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Transforming spaces into extraordinary experiences
          </p>
        </div>

        {/* Project Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: Project Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[550px] rounded-xl overflow-hidden group">
            {projects.map((p, index) => (
              <div
                key={p.id}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === currentProject
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
            ))}
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Project counter */}
            <div className="absolute bottom-6 left-6 text-white/80 text-sm font-light tracking-wider">
              <span className="text-white font-medium">{String(currentProject + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Right: Project Details */}
          <div className="flex flex-col justify-between py-2 lg:py-4">
            {/* Content */}
            <div 
              className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Category */}
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4">
                {project.category}
              </p>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                {project.description}
              </p>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Maximize className="w-4 h-4" />
                  <span className="text-sm">{project.size}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-lg text-sm font-medium transition-all duration-300 hover:opacity-90 hover:gap-4 group">
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 mt-auto border-t border-border/40">
              {/* Arrows */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentProject
                        ? "w-8 bg-foreground"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm uppercase tracking-[0.15em] transition-colors duration-300 group">
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
