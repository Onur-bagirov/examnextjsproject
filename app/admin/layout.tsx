"use client";
import { useState } from "react";
import AdminSidebar from "@/components/base/admin/admin-sidebar";

export default function AdminLayout(
{
    children,
}: 
{
    children: React.ReactNode;
}) 
{
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <AdminSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between border-b border-white/30 bg-white/40 backdrop-blur-md px-6 py-4 z-50">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/50 rounded-lg transition-colors lg:hidden">
                        <svg className="size-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900">
                            A
                        </div>
                    </div>
                </div>
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}