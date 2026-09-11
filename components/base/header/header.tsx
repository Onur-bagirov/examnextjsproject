"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { LogOut, User, Wallet } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Header() {
    const { status, data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleLanguageChange = (nextLocale: "en" | "az") => {
        router.replace(pathname, { locale: nextLocale });
    };

    const [balance, setBalance] = useState<number>(0);
    const [loadingBalance, setLoadingBalance] = useState(true);

    const isAuthenticated = status === "authenticated";

    const fetchBalance = async () => 
    {
        try 
        {
            const response = await fetch("/api/balance");
            const data = await response.json();
            setBalance(data.balance || 0);
        } 
        catch (error) 
        {
            console.error("Failed to fetch balance:", error);
        } 
        finally 
        {
            setLoadingBalance(false);
        }
    };

    useEffect(() => 
    {
        if (isAuthenticated) 
        {
            fetchBalance();
        }
    }, [isAuthenticated]);

    useEffect(() => 
    {
        if (!isAuthenticated) 
        {
            return;
        }

        const interval = setInterval(() => 
        {
            fetchBalance();
        }, 3000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    useEffect(() => 
    {
        const handleBalanceUpdate = () => 
        {
            fetchBalance();
        };

        window.addEventListener("balanceUpdated", handleBalanceUpdate);
        return () => window.removeEventListener("balanceUpdated", handleBalanceUpdate);
    }, []);

    const handleLogout = () => 
    {
        signOut({ callbackUrl: "/auth/signin" });
    };

    const getBalanceColor = () => 
    {
        return balance === 0 ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600";
    };

    return (
        <header className="bg-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="flex gap-3 flex-row items-center justify-center">
                <div className="relative w-16 h-16 bg-gradient-to-b from-gray-900 to-gray-800 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src="/Image/heder1.png"
                        alt="header1"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        priority/>
                </div>
                <div>
                    <span className="text-2xl font-bold text-gray-900">
                        BURGER <span className="italic font-normal">Hut</span>
                    </span>
                </div>
            </div>
            <nav className="flex gap-12">
                <Link href="/" className="text-gray-800 font-medium hover:text-gray-600">
                    Home
                </Link>
                <Link href="/menu" className="text-yellow-500 font-semibold hover:text-yellow-600">
                    Menu
                </Link>
                <Link href="/deals" className="text-yellow-500 font-semibold hover:text-yellow-600">
                    Hot deals
                </Link>
                <Link href="/blog" className="text-gray-800 font-medium hover:text-gray-600">
                    Blog
                </Link>
                <Link href="/book" className="text-gray-800 font-medium hover:text-gray-600">
                    Book
                </Link>
            </nav>
            <div className="flex gap-4 items-center">
                <div className="flex bg-gray-300 rounded-lg p-1">
                    <button
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-1 rounded font-semibold transition-colors ${
                            locale === "en"
                                ? "bg-yellow-400 text-black"
                                : "text-gray-700 hover:text-gray-900"}`}>
                        EN
                    </button>
                    <button
                        onClick={() => handleLanguageChange("az")}
                        className={`px-3 py-1 rounded font-semibold transition-colors ${
                            locale === "az"
                                ? "bg-yellow-400 text-black"
                                : "text-gray-700 hover:text-gray-900"}`}>
                        AZ
                    </button>
                </div>
                {isAuthenticated ? 
                (
                    <>
                        <Link href="/balance">
                            <button
                                className={`flex items-center gap-2 ${getBalanceColor()} text-white font-bold px-4 py-2 rounded-lg transition-all ${
                                    balance > 0 ? "animate-pulse-soft" : ""
                                }`}
                                title="Automatically updates every 3 seconds">
                                <Wallet className="w-5 h-5" />
                                {loadingBalance ? "..." : `$${balance.toFixed(2)}`}
                            </button>
                        </Link>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="rounded-full bg-yellow-400 p-2 h-10 w-10 flex items-center justify-center border-2 border-yellow-500 cursor-pointer hover:bg-yellow-500 transition-colors">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                                    </h3>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex flex-col gap-4">
                                    <div className="pb-4 border-b border-gray-200">
                                        <p className="text-sm text-gray-600">Logged in as</p>
                                        <p className="font-semibold text-gray-900">
                                            {session?.user?.name || session?.user?.email}
                                        </p>
                                        <p className="text-sm text-gray-500">{session?.user?.email}</p>
                                        <p className={`text-sm font-semibold mt-2 flex items-center gap-1 ${
                                            balance > 0 ? "text-green-600" : "text-red-600"}`}>
                                            <Wallet className="w-4 h-4" />
                                            Balance: ${balance.toFixed(2)}
                                        </p>
                                    </div>
                                    <Link href="/profile" className="w-full">
                                        <button className="w-full flex items-center gap-2 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors justify-start">
                                            <User className="w-4 h-4" />
                                            View Profile
                                        </button>
                                    </Link>
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 rounded border border-gray-300 hover:bg-red-50 transition-colors justify-start text-red-600 hover:text-red-700"
                                        onClick={handleLogout}>
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </>
                ) : 
                (
                    <Link href="/auth/signin">
                        <Button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500">
                            LOGIN
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
}