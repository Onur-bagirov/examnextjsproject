import Link from "next/link";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

const categorySummary = [
    { category: "Burgers", items: 2, color: "bg-orange-400" },
    { category: "Sides", items: 1, color: "bg-yellow-400" },
    { category: "Drinks", items: 2, color: "bg-blue-400" },
];

export default function MenuManager() {
    const totalItems = categorySummary.reduce((sum, item) => sum + item.items, 0);

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
                {totalItems} items across {categorySummary.length} categories
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
                {categorySummary.map((cat) => 
                (
                    <div key={cat.category} className="flex items-center gap-3 p-4 bg-white/30 rounded-xl">
                        <span className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`}></span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{cat.category}</p>
                            <p className="text-xs text-gray-600">{cat.items} items</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}