"use client"

import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error ?? "Your message could not be sent.")
      }

      form.reset()
      setStatus({ type: "success", message: "Your message has been sent. We’ll be in touch soon." })
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Your message could not be sent.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-black py-14 lg:py-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Side - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#F5F5DC]"
          >
            <span className="inline-block bg-[#F5F5DC] text-black text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
              Contact
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight">
              Get in touch
            </h2>
            
            <p className="text-[#F5F5DC]/60 text-lg mb-8 max-w-md">
              Ready to transform your space? Let’s discuss your vision and create something extraordinary together.
            </p>

            {/* Contact Info List */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", value: "+92 21 111 570 111", href: "tel:+9221111570111" },
                { icon: Mail, title: "Email", value: "info@desertsound.com.pk", href: "mailto:info@desertsound.com.pk" },
                { icon: MapPin, title: "Showroom", value: "22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi" },
                { icon: Clock, title: "Hours", value: "Mon - Sat: 9:30am - 7:30pm" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F5F5DC]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#F5F5DC]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5DC]/50 text-sm uppercase tracking-wider mb-1">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg text-[#F5F5DC] transition-colors hover:text-white">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#F5F5DC] text-lg">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-[#F5F5DC] rounded-2xl p-5 lg:p-6"
          >
            <h3 className="text-2xl lg:text-3xl font-light text-black mb-1">
              Send us a message
            </h3>
            <p className="text-black/60 mb-4">
              We&apos;ll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-black/70 text-sm mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    required
                    maxLength={100}
                    autoComplete="given-name"
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-black/70 text-sm mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    maxLength={100}
                    autoComplete="family-name"
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black/70 text-sm mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  maxLength={254}
                  autoComplete="email"
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-black/70 text-sm mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+92 21 111 570 111"
                  maxLength={50}
                  autoComplete="tel"
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-black/70 text-sm mb-1.5">Message</label>
                <textarea
                  rows={2}
                  name="message"
                  placeholder="Tell us about your project..."
                  required
                  maxLength={5000}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-[#F5F5DC] py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors group disabled:cursor-not-allowed disabled:opacity-55"
              >
                <span>{isSubmitting ? "Sending…" : "Send Message"}</span>
                {!isSubmitting && (
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </motion.button>

              {status && (
                <p
                  role="status"
                  className={`text-sm font-medium ${status.type === "success" ? "text-green-700" : "text-red-700"}`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mt-6 overflow-hidden rounded-2xl border border-[#F5F5DC]/10 bg-[#F5F5DC] shadow-2xl lg:mt-8"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7242.813381935862!2d67.03972317603166!3d24.815761947043313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dadae2d8b33%3A0x49aa1a50e8f47adb!2sDesert%20Sound%20-%20Home%20Theater%20%26%20Smart%20Home%20Solution!5e0!3m2!1sen!2s!4v1781268452784!5m2!1sen!2s"
            title="Desert Sound Zamzama location"
            className="h-[320px] w-full md:h-[420px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
