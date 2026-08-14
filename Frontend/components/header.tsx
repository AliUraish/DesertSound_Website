"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Careers", href: "/careers" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-1.5 lg:pt-2">
        <div className="max-w-[90%] mx-auto px-3 lg:px-4">
          <div className={`relative flex items-center justify-between gap-6 py-2 lg:py-1.5 px-6 lg:px-8 rounded-full transition-all duration-300 ${
            isScrolled 
              ? "bg-[#F5F5DC] shadow-lg" 
              : "bg-[#F5F5DC]/80 md:bg-[#F5F5DC] backdrop-blur-md"
          }`}>
            {/* Logo - Left: Desert Sound (company) + CEDIA membership badge */}
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-4 lg:gap-5 cursor-pointer">
              {/* Primary brand */}
              <Image
                src="/0-removebg-preview.png"
                alt="Desert Sound Logo"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
                width={820}
                height={304}
              />
              {/* Divider separating the company brand from its accreditation */}
              <span
                className="h-8 sm:h-9 lg:h-11 w-px bg-black/15 shrink-0"
                aria-hidden="true"
              />
              {/* CEDIA membership badge (secondary) */}
              <span className="flex h-14 items-center sm:h-16 lg:h-20">
                <Image
                  src="/image-removebg-preview (1).png"
                  alt="CEDIA Member"
                  className="h-9 sm:h-11 lg:h-[52px] w-auto object-contain opacity-90"
                width={637}
                height={313}
              />
              </span>
            </Link>

            {/* Navigation - Centered */}
            <nav className="hidden xl:flex flex-1 items-center justify-center gap-10 2xl:gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm lg:text-base font-medium relative transition-colors duration-300 group text-black hover:text-black/70"
                >
                  {item.name}
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-black" />
                </Link>
              ))}
            </nav>

            {/* Contact Button - Right */}
            <div className="hidden xl:flex shrink-0 items-center">
              <Link
                href="/#contact"
                className="px-6 lg:px-8 py-2.5 lg:py-3 rounded-full text-sm font-medium transition-all duration-300 bg-black text-white hover:bg-black/90"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden p-2 transition-colors duration-300 text-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - z-[60] to appear above header (z-50) */}
      <div className={`fixed inset-0 z-[60] transition-all duration-300 ease-out ${
        isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#F5F5DC] transform transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Close button inside menu */}
          <button 
            className="absolute top-6 right-6 p-2 text-black hover:text-black/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="p-8 pt-20">
            {/* Mobile Navigation */}
            <nav className="space-y-6">
              {[...navItems, { name: "Contact", href: "/#contact" }].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-xl font-medium text-black hover:text-black/70 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="mt-12 pt-8 border-t border-black/10 space-y-4">
              <div className="text-sm text-black/40 uppercase tracking-wider">Get in touch</div>
              <div className="space-y-2">
                <a href="tel:+9221111570111" className="block text-black/60 hover:text-black">
                  +92 21 111 570 111
                </a>
                <p className="text-black/60">info@desertsound.com.pk</p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Link
                href="/#contact"
                className="block w-full bg-black text-white text-center rounded-lg py-4 text-base font-medium transition-colors duration-200 hover:bg-black/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
