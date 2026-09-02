"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-gray-200 px-8 py-4 flex justify-between items-center">
            <div className="flex gap-3 flex-row items-center justify-center">
                <div className="relative w-15 h-15 min-h-[50px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-full">
                    <Image
                        src="/Image/heder1.png"
                        alt="Header Photo"
                        fill
                        className="object-cover w-15 h-15 rounded-full object-cover"
                        priority
                    />
                </div>
                <div>
                    <span className="text-2xl font-bold text-gray-900">
                        BURGER <span className="italic font-normal">Hut</span>
                    </span>
                </div>
            </div>

            <nav className="flex gap-12">
                <Link href="/" className="text-gray-800 font-medium hover:text-gray-600">Home</Link>
                <Link href="/menu" className="text-yellow-500 font-semibold hover:text-yellow-600">Menu</Link>
                <Link href="/deals" className="text-yellow-500 font-semibold hover:text-yellow-600">Hot deals</Link>
                <Link href="/blog" className="text-gray-800 font-medium hover:text-gray-600">Blog</Link>
                <Link href="/book" className="text-gray-800 font-medium hover:text-gray-600">Book</Link>
            </nav>

            <Link href="/auth/signin">
                <Button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500">
                    LOGIN
                </Button>
            </Link>
        </header>
    )
}