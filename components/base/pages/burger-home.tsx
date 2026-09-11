"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function BurgerHome() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const t = useTranslations("home");

    const burgers = [
        { id: 1, name: t("cheeseBurger"), image: "/Image/Burger1.jpg" },
        { id: 2, name: t("chickenBurger"), image: "/Image/Burger2.jpg" },
        { id: 3, name: t("bigMac"), image: "/Image/Burger3.jpg" },
    ];

    const nextSlide = () => 
    {
        setCurrentSlide((prev) => (prev === burgers.length ? 1 : prev + 1));
    };

    const prevSlide = () => 
    {
        setCurrentSlide((prev) => (prev === 1 ? burgers.length : prev - 1));
    };

    return (
        <main className="bg-white p-4">
            <div className="grid grid-cols-2 min-h-[calc(100vh-88px)] rounded-2xl overflow-hidden">
                <div className="flex flex-col justify-center px-12 py-12 bg-gray-100 relative">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                        {t("title")} <span className="text-yellow-500">{t("highlight")}</span>
                    </h1>
                    <h2 className="text-5xl font-bold text-gray-900 mb-8">
                        {t("subtitle")}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
                        {t("description")}
                    </p>
                    <div className="flex items-center gap-4">
                        <button onClick={prevSlide} className="bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 shrink-0">
                            <ChevronLeft size={20} className="text-black" />
                        </button>
                        <div className="flex gap-6 flex-1 justify-center">
                            {burgers.map((burger) => 
                            (
                                <div key={burger.id} className={`transition-transform ${currentSlide === burger.id ? "scale-110" : "scale-90 opacity-70"}`}>
                                    <div className="bg-yellow-100 rounded-full p-2 w-20 h-20 flex items-center justify-center">
                                        <div className="relative w-full h-full min-h-[50px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-full overflow-hidden">
                                            <Image
                                                src={burger.image}
                                                alt={burger.name}
                                                fill
                                                sizes="80px"
                                                className="rounded-full object-cover"/>
                                        </div>
                                    </div>
                                    <p className="text-center mt-2 text-sm font-semibold text-gray-800 w-20 mx-auto leading-tight">
                                        {burger.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button onClick={nextSlide} className="bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 shrink-0">
                            <ChevronRight size={20} className="text-black" />
                        </button>
                    </div>
                </div>
                <div className="relative w-full h-full min-h-[500px] bg-gradient-to-b from-gray-900 to-gray-800">
                    <Image
                        src="/Image/burger5.jpg"
                        alt="burger5"
                        fill
                        className="object-cover"
                        priority/>
                </div>
            </div>
        </main>
    );
}