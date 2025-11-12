import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import placeholderImg from "@/assets/hero-lavashak.jpg";
import { useCart } from "@/contexts/cart";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useDefaultLocation } from "@/hooks/use-default-location";

const DELIVERY_CHARGE = 300;

const Cart = () => {
  const { items, updateQuantity, removeItem, total, clear } = useCart();
  const { location, requestLocation } = useDefaultLocation();

  const subtotal = total;
  const grandTotal = subtotal + DELIVERY_CHARGE;

  const handleOrderOnWhatsApp = async () => {
    // ensure we have location (try quick detection but don't block long)
    let detected = location;
    if (!detected) {
      try {
        const p = requestLocation({ timeout: 5000 });
        const t = new Promise<null>((res) => setTimeout(() => res(null), 5000));
        const r = await Promise.race([p, t]);
        if (r) detected = r;
      } catch (e) {
        console.warn(e);
      }
    }

    const lines = items.map(
      (it) => `${it.title} x${it.quantity} - Rs. ${it.price * it.quantity}`
    );
    const message = encodeURIComponent(
      `Hello Lavashak Hub!\nI'd like to place an order:\n\n${lines.join(
        "\n"
      )}\n\nSubtotal: Rs. ${subtotal}\nDelivery: Rs. ${DELIVERY_CHARGE}\nTotal: Rs. ${grandTotal}\n\nAdvance payment (EasyPaisa): 03114353367\n\nDelivery Address: ${
        detected?.address ?? "[Your Address]"
      }`
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
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Your Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="bg-card p-4 rounded-lg shadow-card flex items-center gap-4"
                    >
                      {it.image ? (
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-28 h-20 object-cover rounded"
                        />
                      ) : (
                        <img
                          src={placeholderImg}
                          alt={it.title}
                          className="w-28 h-20 object-cover rounded opacity-60"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{it.title}</h3>
                          <button
                            onClick={() => removeItem(it.id)}
                            className="text-red-500"
                          >
                            <Trash2 />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Rs. {it.price}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity - 1)
                            }
                            className="p-2 bg-muted rounded"
                          >
                            <Minus />
                          </button>
                          <div className="px-3">{it.quantity}</div>
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity + 1)
                            }
                            className="p-2 bg-muted rounded"
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="bg-card p-6 rounded-lg shadow-card">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Delivery</span>
                  <span>Rs. {DELIVERY_CHARGE}</span>
                </div>
                <div className="flex justify-between font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>Rs. {grandTotal}</span>
                </div>

                <div className="mb-4 p-4 rounded bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  For advance payment (optional) you can send the amount via
                  EasyPaisa to <strong>03114353367</strong>. Please include your
                  name and order reference when paying.
                </div>

                <Button
                  onClick={handleOrderOnWhatsApp}
                  className="w-full gradient-hero text-white"
                >
                  Order on WhatsApp
                </Button>

                <Button
                  onClick={clear}
                  variant={"ghost"}
                  className="w-full mt-3"
                >
                  Clear Cart
                </Button>
              </aside>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
