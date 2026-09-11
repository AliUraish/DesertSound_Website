"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { socialLinks } from "@/lib/seo"

const currentYear = new Date().getFullYear()

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const [messageType, setMessageType] = useState<"success" | "error">("success")

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result = (await response.json()) as { error?: string; alreadySubscribed?: boolean }

      if (!response.ok) {
        throw new Error(result.error ?? "Subscription could not be completed.")
      }

      setMessageType("success")
      setMessage(result.alreadySubscribed ? "You’re already subscribed." : "Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      setMessageType("error")
      setMessage(error instanceof Error ? error.message : "Subscription could not be completed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-[#F5F5DC]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <Image
              src="/0-removebg-preview.png"
              alt="Desert Sound"
              className="mb-8 h-16 w-auto object-contain lg:h-20"
                width={820}
                height={304}
              />

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black lg:text-4xl">Newsletter</h3>
              <p className="max-w-md text-sm leading-relaxed text-black/60">
                Subscribe to receive <span className="font-medium text-black/85">early access</span> to premium
                releases, <span className="font-medium text-black/85">limited drops</span>, and private launch
                notifications before anyone else.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-md">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full border border-black/10 bg-white px-4 py-3 pr-11 text-sm text-black shadow-sm transition-colors placeholder:text-black/40 focus:border-black/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded border border-black/10 bg-white text-black/60 transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      isSubmitting ? "translate-x-1 opacity-0" : "translate-x-0 opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                  {isSubmitting && <ArrowRight className="absolute h-4 w-4 animate-[slideIn_0.3s_ease-out]" />}
                </button>
              </form>
              {message && (
                <p
                  role="status"
                  className={`text-sm font-medium ${messageType === "success" ? "text-green-700" : "text-red-700"}`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/about-us" className="text-black/60 transition-colors hover:text-black">
                About
              </Link>
              <Link href="/#services" className="text-black/60 transition-colors hover:text-black">
                Services
              </Link>
              <Link href="/#projects" className="text-black/60 transition-colors hover:text-black">
                Projects
              </Link>
              <Link href="/blogs" className="text-black/60 transition-colors hover:text-black">
                Blogs
              </Link>
              <Link href="/careers" className="text-black/60 transition-colors hover:text-black">
                Careers
              </Link>
              <Link href="/contact-us" className="text-black/60 transition-colors hover:text-black">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black/60 transition-all hover:bg-black hover:text-[#F5F5DC]"
                aria-label="Desert Sound on Instagram"
              >
                <span aria-hidden="true" className="text-[10px] font-bold uppercase tracking-tight">
                  IG
                </span>
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black/60 transition-all hover:bg-black hover:text-[#F5F5DC]"
                aria-label="Desert Sound on Facebook"
              >
                <span aria-hidden="true" className="text-sm font-bold lowercase">
                  f
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/10 pt-8 text-sm text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Desert Sound. All rights reserved.</p>
          <p>Home theatre and smart home solutions in Pakistan.</p>
        </div>
      </div>
    </footer>
  )
}
