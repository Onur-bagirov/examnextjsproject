"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState(
    [
        {
            id: 1,
            name: "Classic Burger",
            category: "Burgers",
            price: 6.99,
            description: "Juicy beef patty with lettuce and tomato",
        },
        {
            id: 2,
            name: "Cheese Burger",
            category: "Burgers",
            price: 7.99,
            description: "Classic burger with melted cheese",
        },
        {
            id: 3,
            name: "Fries",
            category: "Sides",
            price: 2.99,
            description: "Crispy golden fries",
        },
        {
            id: 4,
            name: "Soda",
            category: "Drinks",
            price: 1.99,
            description: "Cold refreshing soda",
        },
        {
            id: 5,
            name: "Milkshake",
            category: "Drinks",
            price: 3.99,
            description: "Creamy delicious milkshake",
        },
    ]);

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
                <button className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                    <Plus className="size-4"/>
                    Add Item
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => 
                (
                    <div key={item.id} className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6 hover:bg-white/60 transition-all">
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {item.category}
                                        </p>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-white/30">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-900 font-semibold px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                                    <Edit2 className="size-3.5" />
                                    Edit
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-900 font-semibold px-3 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm">
                                    <Trash2 className="size-3.5" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}