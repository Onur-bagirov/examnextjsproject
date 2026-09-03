import { Bell, Search } from "lucide-react";

export default function AdminTopbar({
    title,
    description,
}: 
{
    title: string;
    description?: string;
}) 
{
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-56 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-yellow-400 focus:bg-white transition-colors"/>
                </div>
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                    <Bell size={18} className="text-gray-600" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
                <div className="flex items-center gap-3 pl-2">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900">
                        A
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">Admin</p>
                        <p className="text-xs text-gray-500">Store manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
}