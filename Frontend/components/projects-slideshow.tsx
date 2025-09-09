"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Play } from "lucide-react"

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProjectData = projects[currentProject]

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <div className="text-sm text-white/60 font-light tracking-widest uppercase mb-4">Featured Projects</div>
          <h2 className="text-4xl md:text-6xl font-light leading-tight text-white max-w-4xl mb-8">
            Transforming spaces into
            <span className="text-white/60 italic"> extraordinary experiences.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Project Image */}
          <div className="relative group">
            <div className="aspect-[4/3] overflow-hidden bg-white/5 border border-white/10">
              <img
                src={currentProjectData.image || "/placeholder.svg"}
                alt={currentProjectData.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-white/60 font-light tracking-widest uppercase mb-2">
                {currentProjectData.category}
              </div>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                {currentProjectData.title}
              </h3>
              <p className="text-white/70 font-light leading-relaxed text-lg mb-6">{currentProjectData.description}</p>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-8 py-6 border-t border-b border-white/10">
              <div>
                <div className="text-white/40 text-xs font-light tracking-wider uppercase mb-1">Location</div>
                <div className="text-white font-light">{currentProjectData.location}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs font-light tracking-wider uppercase mb-1">Year</div>
                <div className="text-white font-light">{currentProjectData.year}</div>
              </div>
              <div>
                <div className="text-white/40 text-xs font-light tracking-wider uppercase mb-1">Size</div>
                <div className="text-white font-light">{currentProjectData.size}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white/80 p-0 h-auto font-light tracking-wide"
                  onClick={prevProject}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white/80 p-0 h-auto font-light tracking-wide"
                  onClick={nextProject}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-px transition-all duration-300 ${
                      index === currentProject ? "bg-white" : "bg-white/30"
                    }`}
                    onClick={() => setCurrentProject(index)}
                  />
                ))}
              </div>
            </div>

            <button className="bg-white text-black px-8 py-3 font-medium tracking-wider hover:bg-white/90 transition-all duration-300 hover:scale-105">
              View Project Details
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
