import { Package, DollarSign, Users, BarChart3 } from "lucide-react";
import StatsCard from "@/components/base/admin/stat-card";
import RecentOrders from "@/components/base/admin/recent-orders";
import PopularItems from "@/components/base/admin/popular-items";
import MenuManager from "@/components/base/admin/menu-manager";

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
                <StatsCard label="Total Orders" value="2,543" icon={Package} trend="12% this week" trendUp />
                <StatsCard label="Revenue" value="$18,240" icon={DollarSign} trend="8% this week" trendUp />
                <StatsCard label="Active Users" value="1,204" icon={Users} trend="3% this week" trendUp />
                <StatsCard label="Avg. Order Value" value="$7.16" icon={BarChart3} trend="2% this week" trendUp={false} />
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