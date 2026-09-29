"use client"

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { submitForm } from "@/lib/submit-form"

const STORAGE_KEY = "desertsound-newsletter-prompt"
const CREAM = { r: 245, g: 245, b: 220 }
const LOGO_SRC = "/0-removebg-preview.png"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function hash(col: number, row: number) {
  const n = Math.imul(col + 1, 374761393) ^ Math.imul(row + 1, 668265263)
  return ((n ^ (n >>> 13)) >>> 0) / 4294967295
}

function composeMark(img: HTMLImageElement, cardW: number, cardH: number) {
  const ratio = img.naturalHeight / img.naturalWidth || 0.37
  let logoW = Math.min(340, cardW * 0.82)
  let logoH = logoW * ratio
  const maxH = Math.max(48, cardH - 28)
  if (logoH > maxH) {
    logoH = maxH
    logoW = logoH / ratio
  }
  const padX = 16
  const padY = 12
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(logoW + padX * 2))
  canvas.height = Math.max(1, Math.round(logoH + padY * 2))
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas
  ctx.fillStyle = "#F5F5DC"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, padX, padY, logoW, logoH)
  return canvas
}

function drawPixelImage(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceW: number,
  sourceH: number,
  x: number,
  y: number,
  pixel: number,
  keep = 1,
) {
  const cols = Math.max(1, Math.round(sourceW / pixel))
  const rows = Math.max(1, Math.round(sourceH / pixel))
  const sample = document.createElement("canvas")
  sample.width = cols
  sample.height = rows
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true })
  if (!sampleCtx) return
  sampleCtx.imageSmoothingEnabled = false
  sampleCtx.drawImage(source, 0, 0, cols, rows)
  const data = sampleCtx.getImageData(0, 0, cols, rows).data
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (keep < 1 && hash(col, row) > keep) continue
      const index = (row * cols + col) * 4
      if (data[index + 3] < 20) continue
      ctx.fillStyle = `rgb(${data[index]},${data[index + 1]},${data[index + 2]})`
      ctx.fillRect(Math.round(x + col * pixel), Math.round(y + row * pixel), pixel, pixel)
    }
  }
}

function drawExpanded(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  cardW: number,
  cardH: number,
  spread: number,
  pixel: number,
) {
  const drawW = sprite.width + (cardW - sprite.width) * spread
  const drawH = sprite.height + (cardH - sprite.height) * spread
  const originX = (cardW - drawW) / 2
  const originY = (cardH - drawH) / 2
  const mix = spread <= 0.5 ? 0 : Math.min(1, (spread - 0.5) / 0.5)
  const cols = Math.max(1, Math.round(drawW / pixel))
  const rows = Math.max(1, Math.round(drawH / pixel))
  const sample = document.createElement("canvas")
  sample.width = cols
  sample.height = rows
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true })
  if (!sampleCtx) return
  sampleCtx.imageSmoothingEnabled = false
  sampleCtx.drawImage(sprite, 0, 0, cols, rows)
  const data = sampleCtx.getImageData(0, 0, cols, rows).data
  const cellW = drawW / cols
  const cellH = drawH / rows
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = (row * cols + col) * 4
      if (data[index + 3] < 20) continue
      const r = Math.round(data[index] + (CREAM.r - data[index]) * mix)
      const g = Math.round(data[index + 1] + (CREAM.g - data[index + 1]) * mix)
      const b = Math.round(data[index + 2] + (CREAM.b - data[index + 2]) * mix)
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(
        Math.round(originX + col * cellW),
        Math.round(originY + row * cellH),
        Math.ceil(cellW),
        Math.ceil(cellH),
      )
    }
  }
}

function drawCream(ctx: CanvasRenderingContext2D, width: number, height: number, pixel: number) {
  for (let y = 0; y < height; y += pixel) {
    for (let x = 0; x < width; x += pixel) {
      const edge = x < pixel || y < pixel || x + pixel >= width - 1 || y + pixel >= height - 1
      ctx.fillStyle = edge ? "#E6E6C6" : "#F5F5DC"
      ctx.fillRect(x, y, Math.min(pixel, width - x), Math.min(pixel, height - y))
    }
  }
}

export function NewsletterPrompt() {
  const [mounted, setMounted] = useState(false)
  const [motion, setMotion] = useState<"in" | "out" | "off">("off")
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const closeAfterIn = useRef(false)

  useEffect(() => {
    let seen = true
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "seen"
    } catch {
      seen = true
    }
    if (seen) return

    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, "seen")
      } catch {
        // Show this visit even if storage is blocked.
      }
      const reduced = prefersReducedMotion()
      const image = new Image()
      image.onload = () => {
        setLogo(image)
        setMotion(reduced ? "off" : "in")
        setMounted(true)
      }
      image.onerror = () => {
        setMotion("off")
        setMounted(true)
      }
      image.src = LOGO_SRC
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mounted, motion])

  useLayoutEffect(() => {
    if (!mounted || motion === "off" || !logo) return
    const canvas = canvasRef.current
    const box = boxRef.current
    if (!canvas || !box) return

    const width = box.clientWidth
    const height = box.clientHeight
    if (width < 8 || height < 8) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const sprite = composeMark(logo, width, height)
    const spriteX = (width - sprite.width) / 2
    const spriteY = (height - sprite.height) / 2
    const clear = () => ctx.clearRect(0, 0, width, height)
    const mark = (pixel: number, keep = 1) => {
      clear()
      drawPixelImage(ctx, sprite, sprite.width, sprite.height, spriteX, spriteY, pixel, keep)
    }
    const grow = (spread: number, pixel: number) => {
      clear()
      drawExpanded(ctx, sprite, width, height, spread, pixel)
    }

    const frames =
      motion === "in"
        ? [
            { ms: 260, draw: () => mark(1) },
            { ms: 70, draw: () => mark(5) },
            { ms: 70, draw: () => mark(10) },
            { ms: 90, draw: () => grow(0.45, 11) },
            { ms: 90, draw: () => grow(0.82, 8) },
            { ms: 70, draw: () => { clear(); drawCream(ctx, width, height, 4) } },
          ]
        : [
            { ms: 60, draw: () => { clear(); drawCream(ctx, width, height, 5) } },
            { ms: 80, draw: () => grow(0.82, 10) },
            { ms: 80, draw: () => grow(0.4, 12) },
            { ms: 80, draw: () => mark(10) },
            { ms: 150, draw: () => mark(2) },
            { ms: 70, draw: () => mark(4, 0.42) },
            { ms: 60, draw: () => mark(8, 0.14) },
          ]

    let stop = false
    let timer = 0
    let index = 0
    const step = () => {
      if (stop) return
      if (index >= frames.length) {
        if (motion === "in" && closeAfterIn.current) {
          closeAfterIn.current = false
          setMotion("out")
        } else if (motion === "in") {
          setMotion("off")
        } else {
          setMounted(false)
        }
        return
      }
      frames[index].draw()
      const ms = frames[index].ms
      index += 1
      timer = window.setTimeout(step, ms)
    }
    step()

    return () => {
      stop = true
      window.clearTimeout(timer)
    }
  }, [mounted, motion, logo])

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "seen")
    } catch {
      // Closing still hides it for this visit.
    }
    if (!mounted || motion === "out") return
    if (motion === "in") {
      closeAfterIn.current = true
      return
    }
    if (prefersReducedMotion() || !logo) {
      setMounted(false)
      return
    }
    setMotion("out")
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await submitForm("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result = (await response.json()) as { error?: string; alreadySubscribed?: boolean }

      if (!response.ok) {
        throw new Error(result.error ?? "Subscription could not be completed.")
      }

      setMessageType("success")
      setMessage(result.alreadySubscribed ? "You’re already subscribed." : "Thank you for subscribing.")
      setEmail("")
      window.setTimeout(dismiss, 1400)
    } catch (error) {
      setMessageType("error")
      setMessage(error instanceof Error ? error.message : "Subscription could not be completed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[5.75rem] z-40 flex justify-center px-4 lg:top-[7.25rem]">
      <div ref={boxRef} className="pointer-events-auto relative w-full max-w-md">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 z-10 h-full w-full ${motion === "off" ? "hidden" : ""}`}
        />
        <section
          role="dialog"
          aria-label="Newsletter signup"
          className={`border border-black/10 bg-[#F5F5DC] px-3.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${
            motion === "off" ? "" : "invisible"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-black">Newsletter</p>
              <p className="mt-0.5 text-xs leading-relaxed text-black/60">
                You can also sign up at the bottom of this page.
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-black/50 transition-colors hover:text-black"
              aria-label="Close newsletter signup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-2.5 flex gap-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              autoComplete="email"
              className="min-w-0 flex-1 border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="shrink-0 bg-black px-3 py-2 text-xs font-medium text-[#F5F5DC] transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Sending" : "Sign up"}
            </button>
          </form>

          {message && (
            <p
              role="status"
              className={`mt-2 text-xs font-medium ${messageType === "success" ? "text-green-700" : "text-red-700"}`}
            >
              {message}
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
