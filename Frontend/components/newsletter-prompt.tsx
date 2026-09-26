"use client"

import { FormEvent, useEffect, useState } from "react"
import { X } from "lucide-react"
import { submitForm } from "@/lib/submit-form"

const STORAGE_KEY = "desertsound-newsletter-prompt"

export function NewsletterPrompt() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

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
      setOpen(true)
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "seen")
    } catch {
      // Closing still hides it for this visit.
    }
    setOpen(false)
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

  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[5.75rem] z-40 flex justify-center px-4 lg:top-[7.25rem]">
      <section
        role="dialog"
        aria-label="Newsletter signup"
        className="pointer-events-auto w-full max-w-md border border-black/10 bg-[#F5F5DC] px-3.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
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
  )
}
