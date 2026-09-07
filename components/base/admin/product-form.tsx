"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  description: z.string().optional(),
  price: z.string().transform(Number).pipe(z.number().positive("Qiymət müsbət olmalıdır")),
  stock: z.string().transform(Number).pipe(z.number().int().nonnegative("Stock 0 və ya daha çox olmalıdır")),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setError("");

      // FormData yaratdır
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      
      if (image) {
        formData.append("image", image);
      }

      // API-ə göndər
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      // Formu sıfırla
      reset();
      setImage(null);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-lg p-6 space-y-4 max-w-md">
      <h2 className="text-xl font-bold text-white mb-4">Burger Əlavə Et</h2>

      <div>
        <label className="text-sm text-gray-300">Ad</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Burger adı"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-300">Qiymət (₼)</label>
        <input
          {...register("price")}
          type="number"
          step="0.01"
          placeholder="10.00"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
        />
        {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-300">Stock</label>
        <input
          {...register("stock")}
          type="number"
          placeholder="50"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"
        />
        {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock.message}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-300">Şəkil</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full text-gray-300 mt-1"
        />
        {image && <p className="text-green-400 text-xs mt-1">✓ {image.name}</p>}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-2 rounded"
      >
        {loading ? "Yüklənir..." : "Əlavə Et"}
      </button>
    </form>
  );
}