import { LucideIcon } from "lucide-react";

export default function StatCard({
    label,
    value,
    trend,
    trendUp = true,
    icon: Icon,
}: 
{
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
}) 
{
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 shrink-0">
                    <Icon size={20} />
                </div>
            </div>
            {trend && 
            (
                <p className={`mt-4 text-xs font-semibold ${trendUp ? "text-green-600" : "text-red-500"}`}>
                    {trendUp ? "▲" : "▼"} {trend}
                </p>
            )}
        </div>
    );
}