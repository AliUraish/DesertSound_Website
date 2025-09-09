import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
            Start Your
            <span className="text-primary block">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ready to transform your space? Let's discuss your vision and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="animate-slide-in-left">
            <Card className="glass-effect">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-background/50" />
                    <Input placeholder="Last Name" className="bg-background/50" />
                  </div>
                  <Input placeholder="Email Address" type="email" className="bg-background/50" />
                  <Input placeholder="Phone Number" type="tel" className="bg-background/50" />
                  <Textarea placeholder="Tell us about your project..." rows={4} className="bg-background/50" />
                  <Button className="w-full animate-glow">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-muted-foreground">+92 300 1234567</p>
                <p className="text-muted-foreground">+92 21 1234567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-muted-foreground">info@desertsound.com.pk</p>
                <p className="text-muted-foreground">projects@desertsound.com.pk</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-muted-foreground">Karachi, Pakistan</p>
                <p className="text-muted-foreground">Serving nationwide</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Business Hours</h4>
                <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sat: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
