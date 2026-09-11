"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const videos = [
  {
    id: "2oBKLgLRRE0",
    title: "Desert Sound home theater / sound system experience",
    thumbnail: `https://img.youtube.com/vi/2oBKLgLRRE0/maxresdefault.jpg`,
  },
  {
    id: "_a4IIzXZ52o",
    title: "State of the Art Home Theatres",
    thumbnail: `https://img.youtube.com/vi/_a4IIzXZ52o/maxresdefault.jpg`,
  },
  {
    id: "qWrnXwWF2a4",
    title: "Home Theatre with Ambient Lighting",
    thumbnail: `https://img.youtube.com/vi/qWrnXwWF2a4/maxresdefault.jpg`,
  },
]

interface VideoLightboxProps {
  videoId: string
  onClose: () => void
}

function VideoLightbox({ videoId, onClose }: VideoLightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        aria-label="Close video"
      >
        <X size={24} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </motion.div>
    </motion.div>
  )
}

interface VideoCardProps {
  video: typeof videos[0]
  index: number
  onClick: () => void
}

function VideoCard({ video, index, onClick }: VideoCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors duration-300"
          >
            <Play size={32} className="text-black ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Video title */}
      <h3 className="mt-4 text-base md:text-lg font-light text-foreground group-hover:text-foreground/80 transition-colors duration-300">
        {video.title}
      </h3>
    </motion.div>
  )
}

export function TheaterTourSection() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <>
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
              Theater Tour
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
              Experience our installations
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Take a virtual tour through our premium home theater installations and see the quality of our work
            </p>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                onClick={() => setSelectedVideoId(video.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedVideoId && (
          <VideoLightbox
            videoId={selectedVideoId}
            onClose={() => setSelectedVideoId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
