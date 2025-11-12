import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DealCard from "@/components/DealCard";
import Footer from "@/components/Footer";
import deal1Img from "@/assets/Deal1.png";
import deal2Img from "@/assets/Deal2.png";
import deal3Img from "@/assets/Deal3.png";
import deal4Img from "@/assets/DEAL4.png";

const featuredDeals = [
  {
    dealNumber: 1,
    items: [
      "2 Lavashak Rolls",
      "2 Masala Bars",
      "2 Hampa Bars",
      "1 Siwas Stick",
      "1 Imli Dip",
      "Toppings: Jellies, Masala",
    ],
    image: deal1Img,
    price: 550,
  },
  {
    dealNumber: 2,
    items: ["5 Lavashak Rolls", "2 Masala Bars", "1 Siwas Stick", "1 Imli Dip"],
    image: deal2Img,
    price: 750,
  },
  {
    dealNumber: 3,
    items: [
      "3 Balls",
      "3 Bars Stick",
      "3 Fruity Bars",
      "Extra Jellies",
      "1 Imli Dip",
    ],
    image: deal3Img,
    price: 550,
  },
  {
    dealNumber: 4,
    items: [
      "6 Lavashak Rolls",
      "1 Imli Dip",
      "Extra charges for pomegranate (otherwise dry pomegranate will be used)",
    ],
    image: deal4Img,
    price: 750,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Deals Section */}
      <section id="deals" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-white">Deals</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out our most popular combo packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDeals.map((deal) => (
              <DealCard
                key={deal.dealNumber}
                dealNumber={deal.dealNumber}
                items={deal.items}
                price={deal.price}
                image={deal.image}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
