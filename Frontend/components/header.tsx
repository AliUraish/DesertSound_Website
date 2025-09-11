"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
              <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
            isScrolled 
              ? "backdrop-blur-xl bg-background/90 border-b border-border/30 shadow-lg shadow-black/5" 
              : "bg-transparent"
          }`}
        >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between py-6 lg:py-8">
            {/* Enhanced Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                {/* Logo background glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative text-2xl lg:text-3xl text-refined text-foreground">
                  <span className="tracking-tight font-light">Desert</span>
                  <span className="ml-1 font-normal text-yellow-400">Sound</span>
                  <span className="text-yellow-400/80 font-serif italic text-lg lg:text-xl ml-1 animate-subtle-float">®</span>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-premium text-muted-foreground hover:text-foreground transition-all duration-500 hover:tracking-wider group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                  {/* Enhanced underline effect */}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 group-hover:w-full" />
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400/30 blur-sm transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Enhanced Contact Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                className="relative overflow-hidden surface-elevated border-border/50 text-foreground hover:text-background transition-all duration-700 px-8 py-2.5 text-premium hover-lift group"
              >
                {/* Button background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-0 group-hover:scale-x-100 origin-left" />
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-500">
                  Contact
                </span>
              </Button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              className="md:hidden relative p-3 text-muted-foreground hover:text-foreground transition-all duration-300 hover-lift group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative">
                {/* Button glow */}
                <div className="absolute -inset-1 bg-yellow-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 relative z-10" />
                ) : (
                  <Menu className="w-6 h-6 relative z-10" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced bottom border gradient */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-700 ${
            isScrolled 
              ? "bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent opacity-100" 
              : "opacity-0"
          }`}
        />
      </header>

      {/* Enhanced Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ease-out ${
        isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 backdrop-blur-xl bg-background/90"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[80vw] surface-floating border-l border-border/30 transform transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-8 pt-24">
            {/* Mobile Navigation */}
            <nav className="space-y-6">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block relative text-2xl text-foreground transition-all duration-300 hover:translate-x-2 group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="animate-fade-in-up">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="mt-12 pt-8 border-t border-border/30 space-y-4">
              <div className="text-premium text-muted-foreground">Get in touch</div>
              <div className="space-y-2">
                <p className="text-muted-foreground">+92 300 1234567</p>
                <p className="text-muted-foreground">info@desertsound.com.pk</p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Button 
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-background hover:from-yellow-500 hover:to-yellow-600 py-4 text-premium transition-all duration-500 hover-lift"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
