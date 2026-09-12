"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

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

function TourVideoCard({
  src,
  poster,
  title,
}: {
  src: string
  poster: string
  title: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [withSound, setWithSound] = useState(false)

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
    video.muted = true
    void video.play().catch(() => undefined)
  }, [inView])

  const muteAndKeepPlaying = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    void video.play().catch(() => undefined)
    setWithSound(false)
  }, [])

  const playWithSound = useCallback(async () => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1
    void video.play().catch(() => undefined)
    setWithSound(true)

    if (!frame) return

    try {
      await requestElementFullscreen(frame)
    } catch {
      // Sound still starts in-place if fullscreen is blocked.
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => {
      const active =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement
      if (!active || active !== frameRef.current) {
        muteAndKeepPlaying()
      }
    }

    document.addEventListener("fullscreenchange", onFullscreenChange)
    document.addEventListener("webkitfullscreenchange", onFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange)
    }
  }, [muteAndKeepPlaying])

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
          muted
          loop
          playsInline
          preload={inView ? "auto" : "metadata"}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {!withSound ? (
          <button
            type="button"
            onClick={playWithSound}
            className="absolute inset-0 z-10 flex flex-col items-end justify-end bg-black/15 p-4 text-left transition-colors duration-500 hover:bg-black/25"
            aria-label={`Play ${title} with sound`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black shadow-lg">
              <Volume2 size={13} />
              Tap for sound
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (document.fullscreenElement) {
                void document.exitFullscreen()
                return
              }
              muteAndKeepPlaying()
            }}
            className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg"
            aria-label={`Mute ${title}`}
          >
            <VolumeX size={16} />
          </button>
        )}
      </div>

      <h3 className="mt-4 text-base font-light text-foreground md:text-lg">{title}</h3>
    </article>
  )
}

export function TheaterTourSection() {
  return (
    <section id="theater-tour" aria-label="Theater Tour" className="bg-background pb-16 lg:pb-24">
      <div className="mx-auto max-w-[90%] px-4 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-3 inline-block rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide text-background">
              Theater Tour
            </span>
            <h2 className="text-2xl font-light text-foreground lg:text-4xl">Recent rooms, playing now</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground lg:text-base">
            The films keep running quietly. Tap one to open it full screen with sound.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {videos.map((video) => (
            <TourVideoCard key={video.id} src={video.src} poster={video.poster} title={video.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
