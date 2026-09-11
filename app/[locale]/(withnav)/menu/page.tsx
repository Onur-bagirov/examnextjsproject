"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MenuDisplay } from "@/components/menu/menu-display";
import { CartView } from "@/components/cart/cart-view";

interface Product 
{
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
}

export default function Menu() {
  const { status } = useSession();
  const t = useTranslations();
  const isAuthenticated = status === "authenticated";
  const [cartKey, setCartKey] = useState(0);
  const [menuKey, setMenuKey] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddToCart = async (product: Product, quantity: number) => 
  {
    if (!isAuthenticated) 
    {
      setFeedback(t("messages.loginRequired"));
      return;
    }

    try 
    {
      const response = await fetch("/api/cart", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      if (!response.ok) 
      {
        const error = await response.json();
        setFeedback(error.error || t("messages.error"));
        return;
      }

      setFeedback(`${product.name} ${t("messages.savedSuccessfully")}`);
      setCartKey((prev) => prev + 1);
    } 
    catch (error) 
    {
      console.error("Failed to add to cart", error);
      setFeedback(t("messages.networkError"));
    }
  };

  return (
    <div className="py-20 px-8 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-4">
          <span className="text-white">{t("menu.favorite")}</span> <span className="text-yellow-500">{t("menu.menu")}</span>
        </h1>
        <p className="text-center text-lg font-semibold text-gray-300 mb-4">
          {t("menu.chooseYourFavorite")}
        </p>

        {!isAuthenticated && 
        (
          <p className="text-center text-sm text-yellow-400 mb-8">
            {t("messages.loginRequired")}{" "}
            <Link href="/auth/signin" className="underline font-semibold">
              {t("auth.signin.signinButton")}
            </Link>
          </p>
        )}

        {feedback && 
        (
          <p className="text-center text-sm text-green-400 mb-8">{feedback}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <MenuDisplay key={menuKey} onAddToCart={handleAddToCart} />
          </div>
          <div>
            <CartView
              key={cartKey}
              onCheckout={() => 
              {
                setFeedback(t("messages.savedSuccessfully"));
                setMenuKey((prev) => prev + 1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}