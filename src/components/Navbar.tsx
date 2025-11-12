import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      "Hello Lavashak Hub! 🍬 I'd like to know more about your products."
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md ${
        isScrolled ? "bg-card/95 backdrop-blur-md" : "bg-card/90"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <ShoppingBag className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-white">Lavashak Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all ${
                  location.pathname === link.path
                    ? "text-primary after:w-full"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={handleWhatsAppOrder}
              className="gradient-hero text-white shadow-glow"
            >
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={handleWhatsAppOrder}
              className="w-full mt-4 gradient-hero text-white"
            >
              Order Now
            </Button>
          </div>
        )}
      </div>

      {/* Floating cart button for small screens */}
      <Link
        to="/cart"
        className="md:hidden fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-sm font-medium">Cart</span>
        <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
