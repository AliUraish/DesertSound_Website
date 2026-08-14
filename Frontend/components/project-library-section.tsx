"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, MapPin, Maximize } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Project } from "@/lib/projects-data"

type ProjectLibrarySectionProps = {
  badge: string
  title: string
  description: string
  projects: Project[]
}

const caseStudyRoutes: Record<string, string> = {
  "cafe-flow": "/projects/commercial/cafe-flow",
  crossfit: "/projects/commercial/crossfit",
  "new-theatre": "/projects/residential/new-theatre",
  "project-6": "/projects/residential/project-6",
  "project-10": "/projects/residential/project-10",
  "project-12": "/projects/residential/project-12",
  "project-13": "/projects/residential/project-13",
  "project-14": "/projects/residential/project-14",
  "project-15": "/projects/residential/project-15",
  "project-16": "/projects/residential/project-16",
  "project-17": "/projects/residential/project-17",
  "project-18": "/projects/residential/project-18",
  "project-19": "/projects/residential/project-19",
  "project-20": "/projects/residential/project-20",
  "project-21": "/projects/residential/project-21",
  "project-platinum": "/projects/residential/project-platinum",
  residency: "/projects/residential/residency",
  xanders: "/projects/commercial/xanders",
  "stanley-seats": "/projects/residential/stanley-seats",
  "studio-vellari": "/projects/residential/studio-vellari",
}

function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  const caseStudyHref = caseStudyRoutes[project.slug]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden bg-muted aspect-[4/5]"
    >
      <Image
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={1600}
                height={1067}
              />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 group-hover:opacity-95" />

      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
        <p className="text-xs uppercase tracking-wider text-white/70 mb-1.5">{project.category}</p>
        <h3 className="text-xl font-light mb-3 leading-tight">{project.title}</h3>

        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-600 ease-out group-hover:max-h-64 group-hover:opacity-100">
          <p className="text-white/80 text-sm leading-relaxed mb-4">{project.description}</p>
        </div>

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

        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 hover:gap-3"
          >
            View Case Study <ArrowUpRight size={12} />
          </Link>
        ) : (
          <button className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 hover:gap-3" type="button">
            View Case Study <ArrowUpRight size={12} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

function MobileLibrary({ badge, title, description, projects }: ProjectLibrarySectionProps) {
  return (
    <section id="projects" className="py-16 bg-background">
      <div className="max-w-[90%] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">{badge}</p>
          <h1 className="text-4xl font-light text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground text-base max-w-md">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5">
          {projects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DesktopLibrary({ badge, title, description, projects }: ProjectLibrarySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      track.scrollLeft += event.deltaY
    }

    track.addEventListener("wheel", onWheel, { passive: false })
    return () => track.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <section id="projects" className="h-[calc(100dvh-6rem)] bg-background">
      <div className="max-w-[90%] mx-auto h-full w-full px-4 lg:px-8 pt-6 pb-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-row items-end justify-between gap-6 mb-8"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">{badge}</p>
            <h1 className="text-5xl lg:text-6xl font-light text-foreground">{title}</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-md">{description}</p>
        </motion.div>

        <div
          ref={trackRef}
          className="flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-8 h-full w-max pr-[8%]">
            {projects.map((project) => {
              const caseStudyHref = caseStudyRoutes[project.slug]

              return (
                <div key={project.id} className="group relative h-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                width={1600}
                height={1067}
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-700 group-hover:opacity-95" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <p className="text-sm uppercase tracking-wider text-white/70 mb-2">{project.category}</p>
                  <h3 className="text-3xl font-light mb-4 leading-tight">{project.title}</h3>

                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-600 ease-out group-hover:max-h-64 group-hover:opacity-100">
                    <p className="text-white/80 text-base leading-relaxed mb-6 max-w-md">{project.description}</p>
                  </div>

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

                    {caseStudyHref ? (
                      <Link
                        href={caseStudyHref}
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:gap-3"
                      >
                        View Case Study <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      <button className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:gap-3" type="button">
                        View Case Study <ArrowUpRight size={14} />
                      </button>
                    )}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectLibrarySection(props: ProjectLibrarySectionProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileLibrary {...props} />
  }

  return <DesktopLibrary {...props} />
}
