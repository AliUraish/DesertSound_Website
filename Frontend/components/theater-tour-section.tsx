"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react"

const videos = [
  {
    id: "LUD17UiAaIM",
    src: "/theater-tour/LUD17UiAaIM.mp4",
    poster: "/theater-tour/LUD17UiAaIM.jpg",
    title: "Bespoke Home Theatre Solutions",
  },
  {
    id: "c6gsFbNvYqk",
    src: "/theater-tour/c6gsFbNvYqk.mp4",
    poster: "/theater-tour/c6gsFbNvYqk.jpg",
    title: "Our Project Home Theatre Portfolio",
  },
  {
    id: "qWrnXwWF2a4",
    src: "/theater-tour/qWrnXwWF2a4.mp4",
    poster: "/theater-tour/qWrnXwWF2a4.jpg",
    title: "Home Theatre with Ambient Lighting",
  },
] as const

function getFullscreenElement() {
  return (
    document.fullscreenElement ??
    (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ??
    null
  )
}

function requestElementFullscreen(element: HTMLElement) {
  const request =
    element.requestFullscreen?.bind(element) ||
    (
      element as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void> | void
      }
    ).webkitRequestFullscreen?.bind(element)

  if (!request) return Promise.reject(new Error("Fullscreen is not available"))
  return Promise.resolve(request())
}

function exitElementFullscreen() {
  const exit =
    document.exitFullscreen?.bind(document) ||
    (document as Document & { webkitExitFullscreen?: () => Promise<void> | void }).webkitExitFullscreen?.bind(
      document
    )

  if (!exit) return Promise.resolve()
  return Promise.resolve(exit())
}

function TourVideoCard({
  src,
  poster,
  title,
  isUnmuted,
  onToggleSound,
}: {
  src: string
  poster: string
  title: string
  isUnmuted: boolean
  onToggleSound: () => void
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const node = frameRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { rootMargin: "200px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !inView) return
    video.muted = !isUnmuted
    if (isUnmuted) video.volume = 1
    void video.play().catch(() => undefined)
  }, [inView, isUnmuted])

  const syncFullscreenState = useCallback(() => {
    setIsFullscreen(getFullscreenElement() === frameRef.current)
  }, [])

  useEffect(() => {
    document.addEventListener("fullscreenchange", syncFullscreenState)
    document.addEventListener("webkitfullscreenchange", syncFullscreenState)
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState)
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState)
    }
  }, [syncFullscreenState])

  const toggleFullscreen = useCallback(async () => {
    const frame = frameRef.current
    if (!frame) return

    try {
      if (getFullscreenElement() === frame) {
        await exitElementFullscreen()
        return
      }
      await requestElementFullscreen(frame)
    } catch {
      // Fullscreen can be blocked by the browser; the film still plays in place.
    }
  }, [])

  return (
    <article className="group">
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
      >
        <video
          ref={videoRef}
          src={inView ? src : undefined}
          poster={poster}
          muted={!isUnmuted}
          loop
          playsInline
          preload={inView ? "auto" : "metadata"}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-black shadow-lg"
            aria-label={isUnmuted ? `Mute ${title}` : `Unmute ${title}`}
          >
            {isUnmuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-black shadow-lg"
            aria-label={isFullscreen ? `Exit full screen ${title}` : `Open ${title} full screen`}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-base font-light text-foreground md:text-lg">{title}</h3>
    </article>
  )
}

export function TheaterTourSection() {
  const [unmutedId, setUnmutedId] = useState<string | null>(null)

  return (
    <section id="theater-tour" aria-label="Theater Tour" className="bg-background pb-16 lg:pb-24">
      <div className="mx-auto max-w-[90%] px-4 lg:px-8">
        <div className="mb-6 lg:mb-8">
          <span className="mb-3 inline-block rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide text-background">
            Theater Tour
          </span>
          <h2 className="text-2xl font-light text-foreground lg:text-4xl">Recent rooms, playing now</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {videos.map((video) => (
            <TourVideoCard
              key={video.id}
              src={video.src}
              poster={video.poster}
              title={video.title}
              isUnmuted={unmutedId === video.id}
              onToggleSound={() =>
                setUnmutedId((current) => (current === video.id ? null : video.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
