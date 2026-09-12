"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const libraryOptions = [
  {
    id: "commercial",
    title: "Commercial Projects",
    subtitle: "Explore curated AV and automation builds for business-focused spaces.",
    href: "/projects/commercial",
    image: "/Pictures Final/Projects/Commercial/Cafe Flow/IMG_2933.JPG",
  },
  {
    id: "residential",
    title: "Residential Projects",
    subtitle: "Discover cinema and smart-home installs crafted for private living.",
    href: "/projects/residential",
    image: "/luxury-home-theater-with-leather-recliners-and-amb.jpg",
  },
]

export function ProjectLibraryChooser() {
  return (
    <section id="projects" className="bg-background pt-16 pb-10 lg:pt-24 lg:pb-12">
      <div className="max-w-[90%] mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-14"
        >
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-5">
            Project Categories
          </span>
          <h2 className="text-3xl lg:text-6xl font-light text-foreground mb-3">Select a Project Category</h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl">
            Select a category to open its dedicated project library.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {libraryOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={option.href}
                className="group relative block rounded-2xl overflow-hidden min-h-[22rem] lg:min-h-[30rem]"
              >
                <Image
                  src={option.image}
                  alt={option.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={1600}
                height={1067}
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">Category</p>
                  <h3 className="text-2xl lg:text-4xl font-light mb-3">{option.title}</h3>
                  <p className="text-white/75 text-sm lg:text-base leading-relaxed max-w-md mb-8">{option.subtitle}</p>

                  <span className="inline-flex items-center gap-2 text-xs lg:text-sm uppercase tracking-widest border-b border-white/40 pb-1 w-fit transition-all duration-300 group-hover:gap-3">
                    Open Library
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
