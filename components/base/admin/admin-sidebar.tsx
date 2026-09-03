"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard,Package,ShoppingCart,Users,BarChart3,Settings,LogOut,X,} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Menu", href: "/admin/menu", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar(
{
    open = true,
    onToggle,
}:
{
    open?: boolean;
    onToggle?: () => void;
} = {}
) 
{
    const pathname = usePathname();

    return (
        <aside className={`${open ? "flex" : "hidden"} w-64 shrink-0 flex-col bg-gray-900 min-h-screen lg:flex`}>
            <div className="flex items-center gap-3 px-6 py-6">
                <div className="relative w-11 h-11 shrink-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full overflow-hidden ring-2 ring-yellow-400/40">
                    <Image src="/Image/heder1.png" alt="Burger Hut" fill className="object-cover" />
                </div>
                <div className="flex-1">
                    <span className="text-lg font-bold text-white leading-tight block">
                        BURGER <span className="italic font-normal">Hut</span>
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.2em] text-yellow-400 uppercase">
                        Admin Panel
                    </span>
                </div>
                {onToggle && 
                (
                    <button onClick={onToggle} className="p-1.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors lg:hidden">
                        <X size={18} />
                    </button>
                )}
            </div>
            <div className="h-px bg-white/10 mx-6" />
            <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
                {navItems.map(({ label, href, icon: Icon, exact }) => 
                {
                    const isActive = exact
                        ? pathname === href
                        : pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "bg-yellow-400 text-gray-900"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
                            <Icon size={18} className="shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            <div className="h-px bg-white/10 mx-6" />
            <div className="flex flex-col gap-1 px-4 py-6">
                <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings size={18} />
                    Settings
                </Link>
                <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                    <LogOut size={18} />
                    Back to site
                </Link>
            </div>
        </aside>
    );
}