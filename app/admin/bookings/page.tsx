"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";

interface Booking 
{
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    guests: number;
    date: string;
    time: string;
    message: string | null;
    status: string;
    createdAt: string;
    user: { id: string; name: string | null; email: string } | null;
}

const statusColors: Record<string, string> = 
{
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<string>("ALL");

    const fetchBookings = async () => 
    {
        setLoading(true);
        setError("");

        try 
        {
            const response = await fetch("/api/bookings", { cache: "no-store" });

            if (!response.ok) 
            {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || "Failed to fetch bookings");
            }

            const data = await response.json();
            setBookings(data);
        } 
        catch (err: any) 
        {
            setError(err.message || "Failed to fetch bookings");
        } 
        finally 
        {
            setLoading(false);
        }
    };

    useEffect(() => 
    {
        fetchBookings();

        const interval = setInterval(() => 
        {
            fetchBookings();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try 
        {
            const response = await fetch(`/api/bookings/${id}`, 
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) 
            {
                return;
            }
            const updated = await response.json();
            setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b)));
        } 
        catch (err) 
        {
            console.error("Failed to update booking", err);
        }
    };

    const deleteBooking = async (id: string) => 
    {
        if (!confirm("Are you sure you want to delete this reservation?")) return;
        try {
            await fetch(`/api/bookings/${id}`, { method: "DELETE" });
            setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error("Failed to delete booking", err);
        }
    };

    const filteredBookings =
        filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Bookings
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage table &amp; event booking requests
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                filter === s
                                    ? "bg-yellow-400 text-gray-900"
                                    : "bg-white/50 text-gray-700 hover:bg-white/70"}`}>
                            {s}
                        </button>
                    ))}
                    <button
                        onClick={fetchBookings}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/50 text-gray-700 hover:bg-white/70 transition-colors">
                        Refresh
                    </button>
                </div>
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
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Guest</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date &amp; Time</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Guests</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
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
                            filteredBookings.length === 0 ? 
                            (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-600">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => 
                                (
                                    <tr key={b.id} className="border-b border-white/20 hover:bg-white/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {b.name || b.user?.name || "Guest"}
                                            {b.message &&
                                            (
                                                <p className="text-xs font-normal text-gray-500 mt-1 max-w-[200px] truncate" title={b.message}>
                                                    {b.message}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div>{b.email || b.user?.email || "-"}</div>
                                            {b.phone && <div className="text-xs text-gray-500">{b.phone}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div>{new Date(b.date).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-500">{b.time}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            {b.guests}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex gap-2">
                                                {b.status !== "CONFIRMED" && 
                                                (
                                                    <button
                                                        onClick={() => updateStatus(b.id, "CONFIRMED")}
                                                        title="Confirm"
                                                        className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                                                        <Check className="size-4" />
                                                    </button>
                                                )}
                                                {b.status !== "CANCELLED" && 
                                                (
                                                    <button
                                                        onClick={() => updateStatus(b.id, "CANCELLED")}
                                                        title="Cancel"
                                                        className="p-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors">
                                                        <X className="size-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteBooking(b.id)}
                                                    title="Delete"
                                                    className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition-colors">
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
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