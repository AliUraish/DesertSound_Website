"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, X } from "lucide-react"

const videos = [
  {
    id: "2oBKLgLRRE0",
    title: "Desert Sound home theater / sound system experience",
  },
  {
    id: "_a4IIzXZ52o",
    title: "State of the Art Home Theatres",
  },
  {
    id: "qWrnXwWF2a4",
    title: "Home Theatre with Ambient Lighting",
  },
] as const

function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function youtubeEmbedSrc(id: string) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), iframe, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.tabIndex !== -1)
}

interface VideoPlayerDialogProps {
  videoId: string
  title: string
  onClose: () => void
}

function VideoPlayerDialog({ videoId, title, onClose }: VideoPlayerDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"

    const inertSiblings: HTMLElement[] = []
    for (const child of Array.from(document.body.children)) {
      if (child instanceof HTMLElement && child !== dialog) {
        child.inert = true
        inertSiblings.push(child)
      }
    }

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab") return

      const focusable = getFocusableElements(dialog)
      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (active === last || !dialog.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = overflow
      for (const sibling of inertSiblings) {
        sibling.inert = false
      }
      previouslyFocused?.focus()
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 md:top-8 md:right-8"
        aria-label="Close video"
      >
        <X size={24} />
      </button>

      <div
        className="relative aspect-video w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <iframe
          src={youtubeEmbedSrc(videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          tabIndex={0}
          className="h-full w-full rounded-lg"
        />
      </div>
    </div>,
    document.body
  )
}

export function TheaterTourSection() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[number] | null>(null)

  return (
    <>
      <section id="theater-tour" className="bg-background pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto max-w-[90%] px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 lg:mb-14"
          >
            <h2 className="text-3xl font-light text-foreground lg:text-6xl">Theater Tour</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  className="group block w-full text-left"
                  aria-label={`Play ${video.title}`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                    <Image
                      src={youtubeThumbnail(video.id)}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-colors duration-300 group-hover:bg-white md:h-20 md:w-20">
                        <Play className="ml-1 h-8 w-8 text-black" fill="currentColor" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-light text-foreground transition-colors duration-300 group-hover:text-foreground/80 md:text-lg">
                    {video.title}
                  </h3>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoPlayerDialog
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}
