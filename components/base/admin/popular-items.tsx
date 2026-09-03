import { Flame } from "lucide-react";

const popularItems = [
    { rank: 1, name: "Classic Burger", category: "Burgers", sold: 342 },
    { rank: 2, name: "Cheese Burger", category: "Burgers", sold: 298 },
    { rank: 3, name: "Fries", category: "Sides", sold: 265 },
    { rank: 4, name: "Milkshake", category: "Drinks", sold: 187 },
    { rank: 5, name: "Soda", category: "Drinks", sold: 154 },
];

export default function PopularItems() {
    const maxSold = Math.max(...popularItems.map((item) => item.sold));

    return (
        <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <Flame size={18} className="text-yellow-500" />
                <h3 className="text-lg font-bold text-gray-900">Popular Items</h3>
            </div>
            <div className="space-y-4">
                {popularItems.map((item) => 
                (
                    <div key={item.rank} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-[11px] font-bold text-gray-900 shrink-0">
                                    {item.rank}
                                </span>
                                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                            </div>
                            <span className="text-xs font-semibold text-gray-600">{item.sold} sold</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                                style={{ width: `${(item.sold / maxSold) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}