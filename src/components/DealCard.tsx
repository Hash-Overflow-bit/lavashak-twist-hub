import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDefaultLocation } from "@/hooks/use-default-location";
import { useCart } from "@/contexts/cart";

interface DealCardProps {
  dealNumber: number;
  items: string[];
  price: number;
  isComingSoon?: boolean;
  image?: string;
}

const DealCard = ({
  dealNumber,
  items,
  price,
  isComingSoon = false,
  image,
}: DealCardProps) => {
  const { location, requestLocation } = useDefaultLocation();

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `deal-${dealNumber}`,
      dealNumber,
      title: `Deal ${dealNumber}`,
      price,
      image,
      items,
    });
  };

  const handleWhatsAppOrder = async () => {
    const itemsList = items.join(", ");

    // If we don't already have a saved location, attempt to detect it now.
    // Race detection with a short timeout so we don't block the user too long.
    let detected = location;
    if (!detected) {
      try {
        const detectionPromise = requestLocation({ timeout: 8000 });
        const timeout = new Promise<null>((res) =>
          setTimeout(() => res(null), 8000)
        );
        const result = await Promise.race([detectionPromise, timeout]);
        if (result) detected = result;
      } catch (e) {
        console.warn("Location detection failed", e);
      }
    }

    const rawMessage =
      `Hello Lavashak Hub! 🍬\nI'd like to order Deal ${dealNumber} (Rs. ${price})\nItems: ${itemsList}\n\nName: [Your Name]\nAddress: ${
        detected?.address ?? "[Your Address]"
      }` + (image ? `\n\nImage: ${image}` : "");

    const message = encodeURIComponent(rawMessage);
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
    <Card className="hover-lift overflow-hidden group relative border-2 border-red-200 hover:border-primary/50 transition-colors">
      {image && (
        <div className="w-full h-64 md:h-72 lg:h-80 overflow-hidden">
          <img
            src={image}
            alt={`Deal ${dealNumber}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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
          Special combo package
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
            <span className="text-sm text-muted-foreground line-through">
              Rs. {Math.round(price * 1.3)}
            </span>
          </div>
          <p className="text-xs text-accent mt-1 font-medium">
            Save Rs. {Math.round(price * 0.3)}!
          </p>
        </div>
      </CardContent>

      <CardFooter>
        {dealNumber === 5 ? (
          <Button
            onClick={() => (window.location.href = "/menu")}
            className="w-full gradient-hero text-white"
          >
            Create Your Own Deal
          </Button>
        ) : (
          <div className="w-full grid grid-cols-2 gap-3">
            <Button onClick={handleAddToCart} className="w-full">
              Add to Cart
            </Button>
            <Button
              onClick={handleWhatsAppOrder}
              className="w-full gradient-hero text-white"
            >
              Quick Order
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
