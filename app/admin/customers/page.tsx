export default function CustomersPage() {
    const customers = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            orders: 12,
            spent: "$156.50",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            orders: 8,
            spent: "$92.40",
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            orders: 15,
            spent: "$189.75",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Customers
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Manage customer information and orders
                </p>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/30">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Orders
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                    Total Spent
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => 
                            (
                                <tr
                                    key={customer.id}
                                    className="border-b border-white/20 hover:bg-white/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {customer.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {customer.orders}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        {customer.spent}
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