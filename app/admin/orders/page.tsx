"use client";

import { useEffect, useState } from "react";

interface OrderItem 
{
    id: string;
    quantity: number;
    price: number;
    product: { id: string; name: string };
}

interface Order 
{
    id: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    user: { id: string; name: string | null; email: string } | null;
    items: OrderItem[];
}

const statusColors: Record<string, string> = 
{
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => 
    {
        setLoading(true);
        setError("");

        try 
        {
            const response = await fetch("/api/orders", { cache: "no-store" });

            if (!response.ok) 
            {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || "Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data);
        } 
        catch (err: any) 
        {
            setError(err.message || "Failed to fetch orders");
        } 
        finally 
        {
            setLoading(false);
        }
    };

    useEffect(() => 
    {
        fetchOrders();

        const interval = setInterval(() => 
        {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Orders
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage all customer orders and delivery status
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/50 text-gray-700 hover:bg-white/70 transition-colors">
                    Refresh
                </button>
            </div>

            {error && 
            (
                <div className="rounded-xl bg-red-100 text-red-800 px-4 py-3 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/30">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Order ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Items
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? 
                            (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-600">
                                        Loading...
                                    </td>
                                </tr>
                            ) : 
                            orders.length === 0 ? 
                            (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-600">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => 
                                (
                                    <tr
                                        key={order.id}
                                        className="border-b border-white/20 hover:bg-white/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            #{order.id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div>{order.user?.name || "Guest"}</div>
                                            <div className="text-xs text-gray-500">{order.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-[240px] truncate" title={order.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ")}>
                                            {order.items.map((i) => `${i.product.name} x${i.quantity}`).join(", ")}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    statusColors[order.status] ||
                                                    "bg-gray-100 text-gray-800"}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}