"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { ProductForm } from "@/components/base/admin/product-form";

interface Product 
{
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    image: string | null;
}

export default function MenuPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState({ name: "", price: "", stock: "" });

    const fetchProducts = async () => 
    {
        try 
        {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        } 
        catch (error) 
        {
            console.error("Failed to fetch products", error);
        } 
        finally 
        {
            setLoading(false);
        }
    };

    useEffect(() => 
    {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => 
    {
        if (!confirm("Are you sure you want to delete this burger?")) 
        {
            return;
        }

        try 
        {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } 
        catch (error) 
        {
            console.error("Failed to delete product", error);
        }
    };

    const startEdit = (product: Product) => 
    {
        setEditingId(product.id);
        setEditValues(
        {
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString(),
        });
    };

    const cancelEdit = () => 
    {
        setEditingId(null);
    };

    const saveEdit = async (id: string) => 
    {
        try 
        {
            const response = await fetch(`/api/products/${id}`, 
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                {
                    name: editValues.name,
                    price: editValues.price,
                    stock: editValues.stock,
                }),
            });

            if (!response.ok) 
            {
                return;
            }

            const updated = await response.json();
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
            setEditingId(null);
        } 
        catch (error) 
        {
            console.error("Failed to update product", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Menu Items
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your restaurant menu items
                    </p>
                </div>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                    {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
                    {showForm ? "Bağla" : "Add Item"}
                </button>
            </div>

            {showForm && 
            (
                <ProductForm
                    onSuccess={() => 
                    {
                        setShowForm(false);
                        fetchProducts();
                    }}
                />
            )}

            {loading ? 
            (
                <p className="text-gray-600">Loading...</p>
            ) : 
            products.length === 0 ? 
            (
                <p className="text-gray-600">No products found</p>
            ) : 
            (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6 hover:bg-white/60 transition-all">
                            <div className="space-y-3">
                                {editingId === item.id ? 
                                (
                                    <div className="space-y-2">
                                        <input
                                            className="w-full border rounded px-2 py-1 text-sm"
                                            value={editValues.name}
                                            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                            placeholder="Name"/>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-1/2 border rounded px-2 py-1 text-sm"
                                                value={editValues.price}
                                                onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                                                placeholder="Price"/>
                                            <input
                                                type="number"
                                                className="w-1/2 border rounded px-2 py-1 text-sm"
                                                value={editValues.stock}
                                                onChange={(e) => setEditValues({ ...editValues, stock: e.target.value })}
                                                placeholder="Stock"/>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => saveEdit(item.id)}
                                                className="flex-1 bg-green-100 text-green-900 font-semibold px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm">
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="flex-1 bg-gray-100 text-gray-900 font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : 
                                (
                                    <>
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-600">
                                                        {item.stock > 0 ? `${item.stock} units in stock` : "Out of stock"}
                                                    </p>
                                                </div>
                                                <span className="text-xl font-bold text-gray-900">
                                                    ₼{item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 pt-4 border-t border-white/30">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-900 font-semibold px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                                                <Edit2 className="size-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-900 font-semibold px-3 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm">
                                                <Trash2 className="size-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}