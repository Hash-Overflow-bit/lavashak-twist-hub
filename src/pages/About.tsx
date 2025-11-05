import { Heart, Leaf, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About <span className="gradient-hero bg-clip-text text-transparent">Lavashak Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bringing the authentic taste of traditional fruit leather snacks to your doorstep
            </p>
          </div>

          {/* Story */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Lavashak Hub was born from a passion for preserving the authentic flavors of traditional 
                  fruit leather snacks. What started as a family recipe has grown into a beloved brand that 
                  brings joy to snack lovers across the region.
                </p>
                <p>
                  We believe in using only the finest natural ingredients to create snacks that are not just 
                  delicious, but also remind you of childhood memories and cultural heritage. Every bite of our 
                  Lavashak carries the perfect balance of tangy, sweet, and spicy flavors.
                </p>
                <p>
                  Our commitment is simple: deliver premium quality snacks that bring smiles to faces and 
                  satisfy cravings with authentic, natural goodness.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 rounded-2xl bg-card shadow-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-hero flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Natural</h3>
              <p className="text-muted-foreground">
                Made with real fruits and natural ingredients, no artificial additives or preservatives
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card shadow-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-card flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Made with Love</h3>
              <p className="text-muted-foreground">
                Each batch is carefully crafted with attention to detail and passion for quality
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card shadow-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality, ensuring every product meets our high standards
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Ingredients</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Mango", "Tamarind", "Plum", "Apricot", "Spices", "Lemon", "Sugar", "Natural Colors"].map((ingredient) => (
                <div key={ingredient} className="text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-4xl mb-2">🥭</div>
                  <p className="font-medium">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
