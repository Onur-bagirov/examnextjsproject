import { prisma } from "@/lib/db";

export default async function CustomersPage() {
    const users = await prisma.user.findMany(
    {
        where: { role: "USER" },
        include: { orders: true },
        orderBy: { createdAt: "desc" },
    });

    const customers = users.map((user) => 
    {
        const ordersCount = user.orders.length;
        const totalSpent = user.orders.reduce
        (
            (sum, order) => sum + order.totalPrice,
            0
        );
        return {
            id: user.id,
            name: user.name || "—",
            email: user.email,
            orders: ordersCount,
            spent: `₼${totalSpent.toFixed(2)}`,
        };
    });

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
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-600">
                                       There are no customers yet.
                                    </td>
                                </tr>
                            ) 
                            : 
                            (
                                customers.map((customer) => 
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}