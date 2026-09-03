export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Analytics
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Performance metrics and business insights
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Daily Revenue
                    </h3>
                    <div className="space-y-3">
                        {[
                            { day: "Monday", amount: "$1,240" },
                            { day: "Tuesday", amount: "$1,560" },
                            { day: "Wednesday", amount: "$1,380" },
                            { day: "Thursday", amount: "$1,720" },
                            { day: "Friday", amount: "$2,100" },
                        ].map((item) => (
                            <div key={item.day} className="flex justify-between items-center p-3 bg-white/30 rounded-lg">
                                <span className="text-sm font-medium text-gray-900">
                                    {item.day}
                                </span>
                                <span className="font-bold text-gray-900">
                                    {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Top Categories
                    </h3>
                    <div className="space-y-3">
                        {[
                            { category: "Burgers", percentage: 45 },
                            { category: "Sides", percentage: 25 },
                            { category: "Drinks", percentage: 20 },
                            { category: "Desserts", percentage: 10 },
                        ].map((item) => (
                            <div key={item.category} className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-900">
                                        {item.category}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {item.percentage}%
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                                        style={{
                                            width: `${item.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Key Metrics
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-white/30 rounded-xl">
                        <p className="text-sm text-gray-600">Avg Daily Orders</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            142
                        </p>
                    </div>
                    <div className="p-4 bg-white/30 rounded-xl">
                        <p className="text-sm text-gray-600">Avg Order Value</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            $8.45
                        </p>
                    </div>
                    <div className="p-4 bg-white/30 rounded-xl">
                        <p className="text-sm text-gray-600">Customer Satisfaction</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                            4.8/5
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}