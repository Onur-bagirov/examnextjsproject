import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StatusBadge from "@/components/base/admin/status-badge";

const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: "$12.50", status: "Delivered", date: "Today" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "$8.99", status: "Preparing", date: "Today" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: "$15.75", status: "On the way", date: "Today" },
    { id: "#ORD-004", customer: "Sarah Connor", amount: "$11.20", status: "Delivered", date: "Yesterday" },
    { id: "#ORD-005", customer: "Tom Hardy", amount: "$9.50", status: "Cancelled", date: "Yesterday" },
];

export default function RecentOrders() {
    return (
        <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    View all
                    <ArrowRight size={14} />
                </Link>
            </div>
            <div className="space-y-2">
                {recentOrders.map((order) => 
                (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-white/30 rounded-lg hover:bg-white/50 transition-colors">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                            <p className="text-xs text-gray-600">{order.customer} · {order.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}