import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DealCardProps {
  dealNumber: number;
  items: string[];
  price: number;
  isComingSoon?: boolean;
}

const DealCard = ({ dealNumber, items, price, isComingSoon = false }: DealCardProps) => {
  const handleWhatsAppOrder = () => {
    const itemsList = items.join(", ");
    const message = encodeURIComponent(
      `Hello Lavashak Hub! 🍬\nI'd like to order Deal ${dealNumber} (Rs. ${price})\nItems: ${itemsList}\n\nName: [Your Name]\nAddress: [Your Address]`
    );
    window.open(`https://wa.me/YOUR_NUMBER?text=${message}`, "_blank");
  };

  return (
    <Card className="hover-lift overflow-hidden group relative border-2 hover:border-primary/50 transition-colors">
      {isComingSoon && (
        <div className="absolute top-4 right-4 z-10 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
          Coming Soon
        </div>
      )}
      
      <div className="h-2 gradient-card" />
      
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
            {dealNumber}
          </span>
          Deal {dealNumber}
        </CardTitle>
        <CardDescription className="text-base">
          {isComingSoon ? "Custom deal option coming soon!" : "Special combo package"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-foreground/90">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">Rs. {price}</span>
            {!isComingSoon && (
              <span className="text-sm text-muted-foreground line-through">
                Rs. {Math.round(price * 1.3)}
              </span>
            )}
          </div>
          {!isComingSoon && (
            <p className="text-xs text-accent mt-1 font-medium">
              Save Rs. {Math.round(price * 0.3)}!
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleWhatsAppOrder}
          disabled={isComingSoon}
          className="w-full gradient-hero text-white shadow-glow group-hover:shadow-float transition-shadow"
        >
          <ShoppingCart className="mr-2 w-4 h-4" />
          {isComingSoon ? "Coming Soon" : "Order on WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
