"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"

const YOUTUBE_ORIGIN = "https://www.youtube.com"

const videos = [
  {
    id: "LUD17UiAaIM",
    title: "Bespoke Home Theatre Solutions",
  },
  {
    id: "c6gsFbNvYqk",
    title: "Our Project Home Theatre Portfolio",
  },
  {
    id: "qWrnXwWF2a4",
    title: "Home Theatre with Ambient Lighting",
  },
] as const

function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function youtubePreviewSrc(id: string, origin: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    iv_load_policy: "3",
    enablejsapi: "1",
    origin,
  })
  return `${YOUTUBE_ORIGIN}/embed/${id}?${params.toString()}`
}

function sendPlayerCommand(iframe: HTMLIFrameElement | null, func: string, args: unknown[] = []) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), YOUTUBE_ORIGIN)
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

function TourVideoCard({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [origin, setOrigin] = useState("")
  const [inView, setInView] = useState(false)
  const [withSound, setWithSound] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

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

  const muteAndKeepPlaying = useCallback(() => {
    sendPlayerCommand(iframeRef.current, "mute")
    sendPlayerCommand(iframeRef.current, "playVideo")
    setWithSound(false)
  }, [])

  const playWithSound = useCallback(async () => {
    const frame = frameRef.current
    sendPlayerCommand(iframeRef.current, "unMute")
    sendPlayerCommand(iframeRef.current, "setVolume", [100])
    sendPlayerCommand(iframeRef.current, "playVideo")
    setWithSound(true)

    if (!frame) return

    try {
      await requestElementFullscreen(frame)
    } catch {
      // iOS and some desktop browsers block programmatic fullscreen.
      // Sound still starts in-place from the tap.
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => {
      const active = document.fullscreenElement ?? (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement
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

  const handleIframeLoad = () => {
    const startMuted = () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id }),
        YOUTUBE_ORIGIN
      )
      sendPlayerCommand(iframeRef.current, "mute")
      sendPlayerCommand(iframeRef.current, "playVideo")
    }

    startMuted()
    window.setTimeout(startMuted, 500)
    window.setTimeout(startMuted, 1400)
  }

  return (
    <article className="group">
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
      >
        <Image
          src={youtubeThumbnail(id)}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        {inView && origin ? (
          <iframe
            ref={iframeRef}
            src={youtubePreviewSrc(id, origin)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            onLoad={handleIframeLoad}
            className={`absolute inset-0 h-full w-full border-0 ${withSound ? "pointer-events-auto" : "pointer-events-none"}`}
          />
        ) : null}

        {!withSound ? (
          <button
            type="button"
            onClick={playWithSound}
            className="absolute inset-0 z-10 flex flex-col items-end justify-end bg-black/20 p-4 text-left transition-colors duration-500 hover:bg-black/30"
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
            <TourVideoCard key={video.id} id={video.id} title={video.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
