"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string | null;
  };
}

interface Cart {
  id: string;
  items: CartItem[];
}

export function CartView({ onCheckout }: { onCheckout: () => void }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        headers: {
          "x-user-id": "user-id",
        },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "x-user-id": "user-id",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId }),
      });
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      const response = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: {
          "x-user-id": "user-id",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Ödəniş uğursuz oldu");
        return;
      }

      const order = await response.json();
      onCheckout();
      setCart({ ...cart!, items: [] });
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Ödəniş zamanı xəta baş verdi");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-8">Yüklənir...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-300 mb-4">Səbət boşdur</p>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Səbət</h2>

      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-gray-700 p-4 rounded-lg">
            {item.product.image && (
              <div className="relative h-20 w-20">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-bold text-white">{item.product.name}</h3>
              <p className="text-yellow-400">₼{item.product.price.toFixed(2)}</p>
              <p className="text-gray-300 text-sm">Miqdar: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="text-white font-bold">₼{(item.product.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-300 text-sm mt-2"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between mb-6">
          <span className="text-lg font-bold text-white">Cəmi:</span>
          <span className="text-2xl font-bold text-yellow-400">₼{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={processing}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-3 rounded"
        >
          {processing ? "Emal edilir..." : "Ödənişə Keç"}
        </button>
      </div>
    </div>
  );
}