'use client'

import Link from "next/link"
import { Instagram, Facebook, Linkedin, ArrowRight, Mail, Sparkles } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    setTimeout(() => {
      setMessage("Thank you for subscribing!")
      setEmail("")
      setIsSubmitting(false)
      setTimeout(() => setMessage(""), 3000)
    }, 1000)
  }

  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 mb-8">
          {/* Left Section - Logo & Newsletter */}
          <div className="flex-1 max-w-lg">
            <img 
              src="/Desert-Sound-RGB-LOGO-WH-1536x571-1-1 white.png" 
              alt="Desert Sound Logo" 
              className="h-16 lg:h-20 w-auto object-contain mb-8"
            />
            
            {/* Newsletter */}
            <div className="space-y-4">
              {/* Big Heading */}
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Newsletter
              </h3>
              
              <p className="text-sm text-white/60 leading-relaxed max-w-md">
                Subscribe to receive <span className="text-white/85 font-medium">early access</span> to premium releases, <span className="text-white/85 font-medium">limited drops</span>, and <span className="text-white/85 font-medium">private launch notifications</span> before anyone else.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 pr-11 bg-white border border-white/20 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-white/70 transition-colors shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded border border-black/10 bg-white flex items-center justify-center text-black/60 hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-50 group"
                  aria-label="Subscribe"
                >
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isSubmitting ? 'translate-x-1 opacity-0' : 'translate-x-0 opacity-100 group-hover:translate-x-0.5'}`} />
                  {isSubmitting && (
                    <ArrowRight className="w-4 h-4 absolute animate-[slideIn_0.3s_ease-out]" />
                  )}
                </button>
              </form>
              {message && (
                <p className="text-sm text-green-600 font-medium">{message}</p>
              )}
            </div>
          </div>

          {/* Right Section - Navigation & Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-10">
            {/* Navigation Links */}
            <nav className="flex items-center gap-5 lg:gap-7">
              <Link href="/#services" className="text-white/60 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link href="/#contact" className="text-white/60 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-[15px] h-[15px]" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-[15px] h-[15px]" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[15px] h-[15px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/45 text-sm">
            © 2024 Desert Sound. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/45 hover:text-white/70 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-white/45 hover:text-white/70 transition-colors text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
