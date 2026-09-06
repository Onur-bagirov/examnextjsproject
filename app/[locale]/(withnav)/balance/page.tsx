"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CardFormStyled from "@/components/base/pages/card-form";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function BalancePage() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-900 text-xl font-semibold mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-yellow-600 hover:text-orange-600 mb-12 font-semibold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Form - Left Side (Larger) */}
          <div className="lg:col-span-2">
            <CardFormStyled />
          </div>

          {/* Info Section - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* How It Works */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white border border-blue-400">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Enter Card Details</h4>
                    <p className="text-sm text-blue-100">Fill in your card information securely</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Set Amount</h4>
                    <p className="text-sm text-blue-100">Choose how much balance you want to add</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Confirm Payment</h4>
                    <p className="text-sm text-blue-100">Review and submit your payment</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold flex-none flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Instant Balance</h4>
                    <p className="text-sm text-blue-100">Your balance is updated immediately</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Card Info */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-xl p-6 text-white border border-cyan-300">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">💳</span> Test Card
              </h4>
              <div className="bg-black bg-opacity-20 rounded-xl p-4 mb-3">
                <p className="text-white text-sm font-mono font-bold tracking-widest">
                  1234 5678 9012 3456
                </p>
              </div>
              <p className="text-cyan-50 text-xs">
                ✓ All test card details are available in the form placeholder
              </p>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 text-white border border-green-400">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span> Secure Payment
              </h4>
              <p className="text-green-50 text-sm">
                Your card information is encrypted and never stored on our servers.
              </p>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white border border-amber-300">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> Quick Tip
              </h4>
              <p className="text-amber-50 text-sm">
                Minimum balance: $5.00
                <br />
                Maximum per transaction: $1,000.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}