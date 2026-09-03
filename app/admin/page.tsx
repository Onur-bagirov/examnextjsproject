import StatsCard from "@/components/admin/stats-card";
import RecentOrders from "@/components/admin/recent-orders";
import PopularItems from "@/components/admin/popular-items";
import MenuManager from "@/components/admin/menu-manager";

export default function AdminDashboard() 
{
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Overview of your restaurant and sales activity.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard label="Total Orders" value="2,543" icon="📦" />
                <StatsCard label="Revenue" value="$18,240" icon="💰" />
                <StatsCard label="Active Users" value="1,204" icon="👥" />
                <StatsCard label="Avg. Order Value" value="$7.16" icon="📊" />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>
                <PopularItems />
            </div>
            <MenuManager />
        </div>
    );
}