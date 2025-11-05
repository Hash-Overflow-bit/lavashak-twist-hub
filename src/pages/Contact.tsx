import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello Lavashak Hub! I'd like to get in touch.");
    window.open(`https://wa.me/YOUR_NUMBER?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Get In <span className="gradient-hero bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-2xl shadow-card border hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground mb-3">Best way to reach us</p>
                    <Button onClick={handleWhatsAppContact} className="gradient-hero text-white">
                      Message on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-card border hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-card flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Location</h3>
                    <p className="text-muted-foreground">
                      Your Street Name<br />
                      City, Province<br />
                      Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-card border hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      info@lavashakhub.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl shadow-card border overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.1654087453154!2d67.0099!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMzUuNiJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lavashak Hub Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
