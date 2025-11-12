import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/cart";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "1 lavashak Roll",
    description: "Premium fruit leather roll with tangy flavor",
    price: 150,
    category: "Rolls",
  },
  {
    id: 2,
    name: "Masala Bar",
    description: "Spicy and tangy fruit bar (1 strip)",
    price: 30,
    category: "Bars",
  },
  {
    id: 3,
    name: "Hampa Bar + 1 Siwas Stick",
    description:
      "Sweet and sour tropical fruit bar (1 strip) with a crispy Siwas Stick",
    price: 30,
    category: "Bars",
  },
  {
    id: 4,
    name: "Siwas Stick",
    description: "Crispy fruit stick with intense flavor (1 strip)",
    price: 30,
    category: "Sticks",
  },
  {
    id: 5,
    name: "Fruity Bar",
    description: "Mixed fruit leather bar (1 strip)",
    price: 35,
    category: "Bars",
  },
  {
    id: 6,
    name: "Lavashak Balls",
    description: "Bite-sized fruity balls (1 ball)",
    price: 50,
    category: "Special",
  },
  {
    id: 7,
    name: "Fruit Jelly",
    description: "Soft and chewy fruit jelly ",
    price: 50,
    category: "Jellies",
  },
  {
    id: 8,
    name: "Imli Sauce",
    description: "Tangy tamarind dipping sauce (1 dip)",
    price: 50,
    category: "Dips",
  },

  {
    id: 10,
    name: "Fresh Pomegranate",
    description: "Available inside and outside of the roll",
    price: 200,
    category: "Toppings",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: `product-${product.id}`,
      dealNumber: product.id,
      title: product.name,
      price: product.price,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our <span className="text-white">Menu</span>
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
                className={
                  selectedCategory === category
                    ? "gradient-hero text-white"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover-lift border-2 hover:border-primary/50 transition-colors"
              >
                <div className="h-1 gradient-card" />
                <CardHeader>
                  <CardTitle className="text-sm sm:text-base font-semibold">
                    {product.name}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      Rs. {product.price}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full gradient-hero text-white shadow-glow text-sm sm:text-base"
                  >
                    <ShoppingCart className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                    Add to Cart
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
