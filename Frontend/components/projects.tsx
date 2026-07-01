"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, MapPin, Calendar, Maximize } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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
    image: "/modern-smart-home-living-room-with-automated-light.jpg",
    description: "Complete smart home transformation with integrated lighting, climate control, and voice-activated controls.",
    year: "2024",
    size: "3,200 sq ft",
  },
]

// Mobile Project Card - vertical layout with tap to expand
function MobileProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5]"
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
        <p className="text-xs uppercase tracking-wider text-white/70 mb-1.5">
          {project.category}
        </p>
        <h3 className="text-xl font-light mb-3 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {project.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={12} /> {project.size}
          </span>
        </div>

        <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide w-fit">
          View Case Study <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.div>
  )
}

// Mobile Projects Layout
function MobileProjects() {
  return (
    <section id="projects" className="py-16 bg-background">
      {/* Header */}
      <div className="px-5 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-5">
            Selected Works
          </span>
          <h2 className="text-3xl font-light text-foreground mb-3">
            Recent Projects
          </h2>
          <p className="text-muted-foreground text-base max-w-sm">
            Explore our portfolio of premium installations and smart home solutions.
          </p>
        </motion.div>
      </div>

      {/* Vertical Cards Grid */}
      <div className="px-5 grid grid-cols-1 gap-5">
        {projects.map((project, index) => (
          <MobileProjectCard key={project.id} project={project} index={index} />
        ))}
        
        {/* View All Card */}
        <motion.a
          href="/projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden bg-foreground text-background flex items-center justify-center py-16"
        >
          <div className="text-center">
            <span className="block text-5xl font-light mb-3">→</span>
            <span className="text-sm uppercase tracking-widest border-b border-background/20 pb-1">
              View All Projects
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  )
}

// Desktop Projects with horizontal scroll
function DesktopProjects() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  // Transform vertical scroll into horizontal movement
  const x = useTransform(scrollYProgress, [0.25, 0.95], ["0%", "-95%"])

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="max-w-[90%] mx-auto w-full px-4 lg:px-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-row items-end justify-between gap-6"
          >
            <div>
              <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
                Selected Works
              </span>
              <h2 className="text-5xl lg:text-6xl font-light text-foreground">
                Recent Projects
              </h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm">
              Explore our portfolio of premium installations and smart home solutions.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-8 px-[10%] w-max">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
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
                  <h3 className="text-3xl font-light mb-4 leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                    <p className="text-white/80 text-base leading-relaxed mb-6 max-w-md">
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
          <div className="h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden bg-foreground text-background flex items-center justify-center">
            <a href="/projects" className="text-center group cursor-pointer">
              <span className="block text-8xl font-light mb-4 transition-transform duration-500 group-hover:scale-110">
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

export function ProjectsSlideshow() {
  const isMobile = useIsMobile()

  // Show mobile layout on mobile devices
  if (isMobile) {
    return <MobileProjects />
  }

  // Show desktop layout with horizontal scroll on larger screens
  return <DesktopProjects />
}
