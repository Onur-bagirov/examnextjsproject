"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;
}

export function MenuDisplay({ onAddToCart }: { onAddToCart: (product: Product, quantity: number) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      const initialQuantities = Object.fromEntries(data.map((p: Product) => [p.id, 1]));
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-8">Yüklənir...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-gray-300 py-8">Heç bir məhsul tapılmadı</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition">
          {product.image ? (
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Şəkil yoxdur</span>
            </div>
          )}

          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
            
            {product.description && (
              <p className="text-sm text-gray-300 mb-3">{product.description}</p>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-yellow-400">₼{product.price.toFixed(2)}</span>
              <span className={`text-sm font-semibold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {product.stock > 0 ? `${product.stock} var` : "Yoxdur"}
              </span>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [product.id]: Math.max(1, parseInt(e.target.value) || 1),
                    })
                  }
                  disabled={product.stock === 0}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1 text-center"
                />
              </div>
              <button
                onClick={() => onAddToCart(product, quantities[product.id] || 1)}
                disabled={product.stock === 0}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-2 rounded"
              >
                Səbətə
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}