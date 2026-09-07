"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object(
{
  name: z.string().min(2, "The name must be at least 2 characters long."),
  description: z.string().optional(),
  price: z.string().refine((v) => Number(v) > 0, "The price must be positive."),
  stock: z.string().refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, "Stock must be 0 or greater."),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm({ onSuccess }: { onSuccess?: () => void }) 
{
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>(
  {
    resolver: zodResolver(productSchema),
    defaultValues: 
    {
      name: "",
      description: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => 
  {
    try 
    {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      
      if (image) 
      {
        formData.append("image", image);
      }

      const response = await fetch("/api/products", 
      {
        method: "POST",
        body: formData,
      });

      if (!response.ok) 
      {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      reset();
      setImage(null);
      onSuccess?.();
    } 
    catch (err) 
    {
      setError(err instanceof Error ? err.message : "An error occurred");
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 rounded-lg p-6 space-y-4 max-w-md">
      <h2 className="text-xl font-bold text-white mb-4">Add Burger</h2>
      <div>
        <label className="text-sm text-gray-300">Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Burger Name"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"/>
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-300">Price (₼)</label>
        <input
          {...register("price")}
          type="number"
          step="0.01"
          placeholder="10.00"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"/>
        {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-300">Stock</label>
        <input
          {...register("stock")}
          type="number"
          placeholder="50"
          className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-1"/>
        {errors.stock && <p className="text-red-400 text-xs mt-1">{errors.stock.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-300">Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full text-gray-300 mt-1"/>
        {image && <p className="text-green-400 text-xs mt-1">✓ {image.name}</p>}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-2 rounded">
        {loading ? "Loading..." : "Add"}
      </button>
    </form>
  );
}