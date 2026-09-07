"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

export default function MenuManager() {
    const [totalItems, setTotalItems] = useState<number | null>(null);
    const [inStock, setInStock] = useState<number>(0);
    const [outOfStock, setOutOfStock] = useState<number>(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setTotalItems(data.length);
                setInStock(data.filter((p: { stock: number }) => p.stock > 0).length);
                setOutOfStock(data.filter((p: { stock: number }) => p.stock === 0).length);
            } catch (error) {
                console.error("Failed to fetch menu summary", error);
                setTotalItems(0);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-yellow-500" />
                    <h3 className="text-lg font-bold text-gray-900">Menu Overview</h3>
                </div>
                <Link href="/admin/menu" className="flex items-center gap-2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                    Manage Menu
                    <ArrowRight size={14} />
                </Link>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                {totalItems === null ? "Yüklənir..." : `${totalItems} məhsul menyuda`}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-4 bg-white/30 rounded-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0"></span>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Stokda var</p>
                        <p className="text-xs text-gray-600">{inStock} məhsul</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/30 rounded-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0"></span>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Stokda yoxdur</p>
                        <p className="text-xs text-gray-600">{outOfStock} məhsul</p>
                    </div>
                </div>
            </div>
        </div>
    );
}