"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CardFormStyled from "@/components/base/pages/card-form";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function BalancePage() {
  const { status } = useSession();
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  if (status === "unauthenticated")   
  {
    redirect("/auth/signin");
  }

  if (status === "loading") 
  {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-900 text-xl font-semibold mt-4">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href={`/${currentLocale}`} className="inline-flex items-center gap-2 text-yellow-600 hover:text-orange-600 mb-12 font-semibold transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t("common.backHome")}
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CardFormStyled />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white border border-blue-400">
              <h3 className="text-2xl font-bold mb-6">{t("balance.howWorks")}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t("balance.step1")}</h4>
                    <p className="text-sm text-blue-100">{t("balance.step1Desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t("balance.step2")}</h4>
                    <p className="text-sm text-blue-100">{t("balance.step2Desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t("balance.step3")}</h4>
                    <p className="text-sm text-blue-100">{t("balance.step3Desc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t("balance.step4")}</h4>
                    <p className="text-sm text-blue-100">{t("balance.step4Desc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-xl p-6 text-white border border-cyan-300">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span> {t("balance.testCard")}
              </h4>
              <div className="bg-black bg-opacity-20 rounded-xl p-4 mb-3">
                <p className="text-white text-sm font-mono font-bold tracking-widest">
                  1234 5678 9012 3456
                </p>
              </div>
              <p className="text-cyan-50 text-xs">
                ✓ {t("balance.testCardDesc")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 text-white border border-green-400">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span> {t("balance.securePayment")}
              </h4>
              <p className="text-green-50 text-sm">
                {t("balance.securePaymentDesc")}
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white border border-amber-300">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> {t("balance.tip")}
              </h4>
              <p className="text-amber-50 text-sm">
                {t("balance.tipContent")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}