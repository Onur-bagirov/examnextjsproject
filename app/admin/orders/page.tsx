export default function OrdersPage() {
    const allOrders = [
        {
            id: "#ORD-001",
            customer: "John Doe",
            amount: "$12.50",
            status: "Delivered",
            date: "Today",
        },
        {
            id: "#ORD-002",
            customer: "Jane Smith",
            amount: "$8.99",
            status: "Preparing",
            date: "Today",
        },
        {
            id: "#ORD-003",
            customer: "Mike Johnson",
            amount: "$15.75",
            status: "Ready",
            date: "Today",
        },
        {
            id: "#ORD-004",
            customer: "Sarah Connor",
            amount: "$11.20",
            status: "Delivered",
            date: "Yesterday",
        },
        {
            id: "#ORD-005",
            customer: "Tom Hardy",
            amount: "$9.50",
            status: "Delivered",
            date: "Yesterday",
        },
    ];

    const statusColors: Record<string, string> = 
    {
        Delivered: "bg-green-100 text-green-800",
        Ready: "bg-blue-100 text-blue-800",
        Preparing: "bg-yellow-100 text-yellow-800",
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Orders
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Manage all customer orders and delivery status
                </p>
            </div>
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
                            {allOrders.map((order) => 
                            (
                                <tr
                                    key={order.id}
                                    className="border-b border-white/20 hover:bg-white/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {order.amount}
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
                                        {order.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}