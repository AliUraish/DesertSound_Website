import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+92 300 1234567", "+92 21 1234567"],
    description: "Call us for immediate assistance",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@desertsound.com.pk", "projects@desertsound.com.pk"],
    description: "Send us your detailed requirements",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Karachi, Pakistan", "Serving nationwide"],
    description: "Visit our showroom or we come to you",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    description: "We're here when you need us",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20 animate-fade-in-up">
          <div className="text-premium text-muted-foreground mb-6">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground max-w-4xl mx-auto mb-8 lg:mb-10">
            Start Your
            <span className="accent-text text-muted-foreground block mt-2">Journey</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space? Let's discuss your vision and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Contact Form */}
          <div className="lg:col-span-7 animate-slide-in-left">
            <Card className="surface-floating border border-border/50">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-8 lg:mb-10">
                  <MessageSquare className="w-6 h-6 text-[color:var(--color-accent-gold)]" />
                  <h3 className="text-2xl lg:text-3xl text-foreground">Send us a message</h3>
                </div>
                
                <form className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-premium text-foreground">First Name</label>
                      <Input 
                        placeholder="Enter your first name" 
                        className="surface-elevated border-border/50 focus:border-[color:var(--color-accent-gold)] transition-all duration-300 py-3 lg:py-4" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-premium text-foreground">Last Name</label>
                      <Input 
                        placeholder="Enter your last name" 
                        className="surface-elevated border-border/50 focus:border-[color:var(--color-accent-gold)] transition-all duration-300 py-3 lg:py-4" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-premium text-foreground">Email Address</label>
                    <Input 
                      placeholder="your.email@example.com" 
                      type="email" 
                      className="surface-elevated border-border/50 focus:border-[color:var(--color-accent-gold)] transition-all duration-300 py-3 lg:py-4" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-premium text-foreground">Phone Number</label>
                    <Input 
                      placeholder="+92 300 1234567" 
                      type="tel" 
                      className="surface-elevated border-border/50 focus:border-[color:var(--color-accent-gold)] transition-all duration-300 py-3 lg:py-4" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-premium text-foreground">Project Details</label>
                    <Textarea 
                      placeholder="Tell us about your project, space size, requirements, and any specific preferences..." 
                      rows={6} 
                      className="surface-elevated border-border/50 focus:border-[color:var(--color-accent-gold)] transition-all duration-300 resize-none" 
                    />
                  </div>
                  
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 lg:py-5 text-premium transition-all duration-500 hover-lift group">
                    <Send className="w-4 h-4 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="group-hover:tracking-wider transition-all duration-300">
                      Send Message
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-10 animate-fade-in-up">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="surface-elevated border border-border/50 p-6 lg:p-8 transition-all duration-500 hover:border-border hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 lg:space-x-6">
                  <div className="p-3 lg:p-4 surface-elevated rounded-xl border border-border/30 group-hover:border-[color:var(--color-accent-gold)] transition-all duration-300">
                    <info.icon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground group-hover:text-[color:var(--color-accent-gold)] transition-colors duration-300" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h4 className="text-lg lg:text-xl text-foreground font-medium">
                      {info.title}
                    </h4>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-premium text-muted-foreground/80">
                      {info.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Response Promise */}
            <div className="surface-floating border border-[color:var(--color-accent-gold)]/30 p-6 lg:p-8 rounded-xl">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[color:var(--color-accent-gold)]/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-[color:var(--color-accent-gold)]" />
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl text-foreground font-medium mb-2">
                    Quick Response Guarantee
                  </h4>
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                    We respond to all inquiries within <span className="text-[color:var(--color-accent-gold)] font-medium">24 hours</span> and offer free consultations for all projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 lg:mt-28 text-center">
          <div className="surface-elevated border border-border/50 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl xl:text-4xl text-foreground mb-4 lg:mb-6">
              Prefer to speak directly?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              Schedule a phone consultation with our experts to discuss your project in detail.
            </p>
            <button className="glass-effect text-foreground hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-10 lg:px-12 py-4 lg:py-5 text-premium transition-all duration-700 hover-lift group">
              <span className="group-hover:tracking-wider transition-all duration-300">
                Schedule Call
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
