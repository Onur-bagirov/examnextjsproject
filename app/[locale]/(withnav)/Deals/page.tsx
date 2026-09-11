import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Deals() {
    const t = useTranslations();
    return (
        <div className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-4xl font-extrabold mb-4">
                    <span className="text-gray-900">Hot</span>{" "}
                    <span className="text-yellow-500">Deals</span>
                </h1>
                <p className="text-center text-lg font-semibold text-gray-900 mb-16">
                    Today is Best offer for you
                </p>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="relative w-full md:w-1/2 h-80">
                        <Image
                            src="/Image/burgercombo.png"
                            alt="burgercombo"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-red-600 text-3xl font-extrabold mb-4">
                            Special Combo Pack
                        </h2>
                        <h3 className="text-gray-900 text-xl font-bold mb-4">
                            Burger Bizz Fries &amp; Drinks
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            {t("deals.description")}
                        </p>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-md">
                            Visit Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}