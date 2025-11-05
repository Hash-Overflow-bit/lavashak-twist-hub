import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

const products: Product[] = [
  { id: 1, name: "Loaded Roll", description: "Premium fruit leather roll with tangy flavor", price: 80, category: "Rolls" },
  { id: 2, name: "Masala Bar", description: "Spicy and tangy fruit bar", price: 60, category: "Bars" },
  { id: 3, name: "Hampa Bar", description: "Sweet and sour tropical fruit bar", price: 60, category: "Bars" },
  { id: 4, name: "Siwas Stick", description: "Crispy fruit stick with intense flavor", price: 70, category: "Sticks" },
  { id: 5, name: "Fruity Bar", description: "Mixed fruit leather bar", price: 65, category: "Bars" },
  { id: 6, name: "Lavashak Balls", description: "Bite-sized fruity balls", price: 90, category: "Special" },
  { id: 7, name: "Fruit Jelly", description: "Soft and chewy fruit jelly", price: 85, category: "Jellies" },
  { id: 8, name: "Imli Sauce", description: "Tangy tamarind dipping sauce", price: 50, category: "Dips" },
  { id: 9, name: "Imli Dip", description: "Premium tamarind dip", price: 55, category: "Dips" },
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `Hello Lavashak Hub! 🍬\nI'd like to order:\n${product.name} - Rs. ${product.price}\n\nName: [Your Name]\nAddress: [Your Address]`
    );
    window.open(`https://wa.me/YOUR_NUMBER?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our <span className="gradient-hero bg-clip-text text-transparent">Menu</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our complete selection of handcrafted Lavashak products
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "gradient-hero text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover-lift border-2 hover:border-primary/50 transition-colors">
                <div className="h-2 gradient-card" />
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">Rs. {product.price}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full gradient-hero text-white shadow-glow"
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Order on WhatsApp
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
