'use client'

import { Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react"
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
    <footer className="bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 mb-8">
          {/* Left Section - Logo & Newsletter */}
          <div className="flex-1 max-w-lg">
            <img 
              src="/0-removebg-preview.png" 
              alt="Desert Sound Logo" 
              className="h-14 lg:h-20 w-auto object-contain mb-6"
            />
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm text-black/60 leading-relaxed max-w-md">
                Subscribe to receive <span className="text-black/80 font-medium">early access</span> to premium releases, <span className="text-black/80 font-medium">limited drops</span>, and <span className="text-black/80 font-medium">private launch notifications</span> before anyone else.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 pr-11 bg-white border border-black/10 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-black/60 hover:text-black transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {message && (
                <p className="text-sm text-black/60">{message}</p>
              )}
            </div>
          </div>

          {/* Right Section - Navigation & Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6 lg:gap-8">
              <a href="#services" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
                Services
              </a>
              <a href="#contact" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
                Contact
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-black/10">
          <p className="text-black/40 text-sm">
            © 2024 Desert Sound. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-black/40 hover:text-black/60 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-black/40 hover:text-black/60 transition-colors text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
