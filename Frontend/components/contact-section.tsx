"use client"

import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ContactSection() {
  const leftAnimation = useScrollAnimation({ threshold: 0.2 })
  const rightAnimation = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <section id="contact" className="py-14 lg:py-18 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Side - Contact Info */}
          <div 
            ref={leftAnimation.ref}
            className={`text-white transition-all duration-1000 ease-out ${
              leftAnimation.isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-block bg-white text-black text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
              Contact
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight">
              Get in touch
            </h2>
            
            <p className="text-white/50 text-lg mb-8 max-w-md">
              Ready to transform your space? Let's discuss your vision and create something extraordinary together.
            </p>

            {/* Contact Info List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-white text-lg">+92 300 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white text-lg">info@desertsound.com.pk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white text-lg">Karachi, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-white text-lg">Mon - Sat: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div 
            ref={rightAnimation.ref}
            className={`bg-[#F5F5DC] rounded-2xl p-6 lg:p-8 transition-all duration-1000 ease-out delay-200 ${
              rightAnimation.isVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl lg:text-3xl font-light text-black mb-2">
              Send us a message
            </h3>
            <p className="text-black/50 mb-6">
              We'll get back to you within 24 hours
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black/60 text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-black/60 text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black/60 text-sm mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-black/60 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-black/60 text-sm mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors group"
              >
                <span>Send Message</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
