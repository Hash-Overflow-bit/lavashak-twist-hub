import DealCard from "@/components/DealCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const deals = [
  {
    dealNumber: 1,
    items: ["2 Loaded Rolls", "2 Masala Bars", "2 Hampa Bars", "1 Imli Sauce"],
    price: 550,
  },
  {
    dealNumber: 2,
    items: ["5 Loaded Rolls", "2 Masala Bars", "1 Siwas Stick", "1 Imli Dip"],
    price: 700,
  },
  {
    dealNumber: 3,
    items: ["Balls", "Bars", "Stick", "Fruity Bars", "Jelly", "Imli Dip"],
    price: 500,
  },
  {
    dealNumber: 4,
    items: ["6 Loaded Bars", "1 Imli Dip"],
    price: 750,
  },
  {
    dealNumber: 5,
    items: ["Custom Deal - Create your own combo!"],
    price: 0,
    isComingSoon: true,
  },
];

const Deals = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section id="deals" className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Special <span className="gradient-hero bg-clip-text text-transparent">Combo Deals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Save big with our carefully curated snack combos. Perfect for parties, gifts, or your personal stash!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <DealCard
                key={deal.dealNumber}
                dealNumber={deal.dealNumber}
                items={deal.items}
                price={deal.price}
                isComingSoon={deal.isComingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Deals;
