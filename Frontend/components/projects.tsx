"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MapPin, Calendar, Maximize } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Desert Oasis Cinema",
    category: "Luxury Villa Theatre",
    location: "Karachi, Pakistan",
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    description: "A state-of-the-art home cinema featuring 4K projection, Dolby Atmos surround sound, and custom Italian leather seating.",
    year: "2024",
    size: "450 sq ft",
  },
  {
    id: 2,
    title: "Smart Living Integration",
    category: "Penthouse Automation",
    location: "Lahore, Pakistan",
    image: "/modern-smart-home-minimalist-blue-tones.jpg",
    description: "Complete smart home transformation with integrated lighting, climate control, and voice-activated controls.",
    year: "2024",
    size: "3,200 sq ft",
  },
  {
    id: 3,
    title: "Executive Boardroom AV",
    category: "Corporate Installation",
    location: "Islamabad, Pakistan",
    image: "/corporate-boardroom-premium-av-equipment-modern.jpg",
    description: "Professional-grade audiovisual setup with wireless presentation systems and automated room controls.",
    year: "2023",
    size: "800 sq ft",
  },
  {
    id: 4,
    title: "Riverside Residence",
    category: "Home Automation",
    location: "Dubai, UAE",
    image: "/luxury-home-theater-cinematic-lighting.jpg",
    description: "A seamless blend of technology and design, featuring automated shades, lighting scenes, and multi-room audio.",
    year: "2024",
    size: "5,000 sq ft",
  },
]

export function ProjectsSlideshow() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  // Transform vertical scroll into horizontal movement
  // Adjusted timing: start the scroll later (0.25) so the first card is fully visible before moving
  const x = useTransform(scrollYProgress, [0.25, 0.95], ["0%", "-95%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="max-w-[90%] mx-auto w-full px-4 lg:px-8 mb-12 pt-16 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6 mt-8 md:mt-0">
                Selected Works
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground">
                Recent Projects
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm">
              Explore our portfolio of premium installations and smart home solutions.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-4 md:px-[10%] w-max">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative h-[50vh] md:h-[60vh] aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-sm uppercase tracking-wider text-white/70 mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                      <span className="flex items-center gap-2">
                        <MapPin size={14} /> {project.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={14} /> {project.year}
                      </span>
                      <span className="flex items-center gap-2">
                        <Maximize size={14} /> {project.size}
                      </span>
                    </div>

                    <button className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:gap-3 transition-all">
                      View Case Study <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* "View All" Card */}
          <div className="h-[50vh] md:h-[60vh] aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden bg-foreground text-background flex items-center justify-center">
            <a href="/projects" className="text-center group cursor-pointer">
              <span className="block text-6xl md:text-8xl font-light mb-4 transition-transform duration-500 group-hover:scale-110">
                →
              </span>
              <span className="text-lg uppercase tracking-widest border-b border-background/20 pb-1 group-hover:border-background transition-colors">
                View All Projects
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
