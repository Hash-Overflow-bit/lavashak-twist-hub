import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-lavashak.jpg";

const Hero = () => {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      "Hello Lavashak Hub! 🍬 I'd like to order now."
    );
    const url = `https://wa.me/923114353367?text=${message}`;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lavashak Snacks"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-accent/20 blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-medium text-sm">
              🍬 Fresh, Fruity & Fun
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Taste the
            <span className="block text-white">Twist!</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            Experience the ultimate fusion of tangy, fruity flavors with our
            premium Lavashak snacks. Handcrafted for the perfect bite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleWhatsAppOrder}
              size="lg"
              className="gradient-hero text-white shadow-glow text-lg h-14 px-8 hover-lift group"
            >
              Order on WhatsApp
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg h-14 px-8 border-2 hover:border-primary hover:text-primary"
              onClick={() =>
                document
                  .getElementById("deals")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Deals
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Combo Deals</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">15+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Natural</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
