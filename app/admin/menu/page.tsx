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
        <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
            <div className="flex items-center justify-between border-b-2 border-yellow-400 pb-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                        Menu Items
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                        Manage your restaurant menu items
                    </p>
                </div>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                    {showForm ? <X className="size-6" /> : <Plus className="size-6" />}
                    <span className="text-lg">{showForm ? "Bağla" : "Add Item"}</span>
                </button>
            </div>

            {showForm && 
            (
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-300">
                    <ProductForm
                        onSuccess={() => 
                        {
                            setShowForm(false);
                            fetchProducts();
                        }}
                    />
                </div>
            )}

            {loading ? 
            (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
                        <p className="text-lg text-gray-600 font-medium">Loading menu items...</p>
                    </div>
                </div>
            ) : 
            products.length === 0 ? 
            (
                <div className="flex items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <p className="text-xl text-gray-600 font-medium mb-2">No products found</p>
                        <p className="text-gray-500">Click "Add Item" to create your first menu item</p>
                    </div>
                </div>
            ) : 
            (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((item) => (
                        <div key={item.id} className="rounded-2xl border-2 border-gray-200 bg-white p-7 hover:shadow-xl transition-all hover:border-yellow-400">
                            <div className="space-y-3">
                                {editingId === item.id ? 
                                (
                                    <div className="space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                                        <input
                                            className="w-full border-2 border-blue-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={editValues.name}
                                            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                                            placeholder="Product Name"/>
                                        <div className="flex gap-3">
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-1/2 border-2 border-blue-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                value={editValues.price}
                                                onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                                                placeholder="Price (₼)"/>
                                            <input
                                                type="number"
                                                className="w-1/2 border-2 border-blue-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                                value={editValues.stock}
                                                onChange={(e) => setEditValues({ ...editValues, stock: e.target.value })}
                                                placeholder="Stock"/>
                                        </div>
                                        <div className="flex gap-3 pt-3">
                                            <button
                                                onClick={() => saveEdit(item.id)}
                                                className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : 
                                (
                                    <>
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex gap-4">
                                                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                                                            item.stock > 0 
                                                                ? "bg-green-100 text-green-800" 
                                                                : "bg-red-100 text-red-800"
                                                        }`}>
                                                            {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600 mb-1">Price</p>
                                                    <span className="text-3xl font-bold text-yellow-600">
                                                        ₼{item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                            {item.description && (
                                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                                <Edit2 className="size-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                                <Trash2 className="size-4" />
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