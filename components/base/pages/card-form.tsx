"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle, Loader, Wallet, Lock } from "lucide-react";

const cardSchema = z.object(
{
  cardNumber: z.string().regex(/^\d{16}$/, "Card must be 16 digits"),
  cardName: z.string().min(3, "Cardholder name required"),
  expiryMonth: z.string().regex(/^\d{2}$/, "Invalid month"),
  expiryYear: z.string().regex(/^\d{2}$/, "Invalid year"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  amount: z.number().positive("Amount must be greater than 0"),
});

type CardFormData = z.infer<typeof cardSchema>;

export default function CardFormStyled() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const 
  {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = 
  useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const onSubmit = async (data: CardFormData) => {
    setLoading(true);
    setMessage(null);

    try 
    {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) 
      {
        setMessage({ type: "error", text: result.error || "Payment failed" });
      }
      else 
      {
        setMessage({ type: "success", text: `✓ Success! +$${data.amount} added to your balance` });
        reset();

        window.dispatchEvent(new Event("balanceUpdated"));

        setTimeout(() => 
        {
          window.dispatchEvent(new Event("balanceUpdated"));
        }, 1000);
      }
    } 
    catch (error) 
    {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t("balance.addFunds")}</h2>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <Lock className="w-4 h-4" />
            Secure Payment
          </p>
        </div>
      </div>

      {message && 
      (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-slide-down ${
            message.type === "success"
              ? "bg-green-50 border-green-300 text-green-800"
              : "bg-red-50 border-red-300 text-red-800"}`}>
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          )}
          <span className="font-semibold">{message.text}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            {t("payment.cardNumber")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register("cardNumber")}
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-semibold tracking-widest transition-all ${
                errors.cardNumber
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              } focus:outline-none`}/>
            <Wallet className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.cardNumber && 
          (
            <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.cardNumber.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            {t("payment.cardholderName")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("cardName")}
            type="text"
            placeholder="John Doe"
            className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-semibold transition-all ${
              errors.cardName
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
            } focus:outline-none`}/>
          {errors.cardName && 
          (
            <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.cardName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            {t("payment.expiryDate")} & {t("payment.cvv")} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <input
                {...register("expiryMonth")}
                type="text"
                placeholder="MM"
                maxLength={2}
                className={`w-full px-3 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-bold text-center text-lg transition-all ${
                  errors.expiryMonth
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                } focus:outline-none`}/>
              {errors.expiryMonth && 
              (
                <p className="text-red-600 text-xs font-semibold mt-1">Invalid</p>
              )}
            </div>
            <div>
              <input
                {...register("expiryYear")}
                type="text"
                placeholder="YY"
                maxLength={2}
                className={`w-full px-3 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-bold text-center text-lg transition-all ${
                  errors.expiryYear
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                } focus:outline-none`}/>
              {errors.expiryYear && (
                <p className="text-red-600 text-xs font-semibold mt-1">Invalid</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl text-gray-400 font-light">/</span>
            </div>
            <div>
              <input
                {...register("cvv")}
                type="text"
                placeholder="CVV"
                maxLength={4}
                className={`w-full px-3 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-bold text-center text-lg transition-all ${
                  errors.cvv
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                } focus:outline-none`}/>
              {errors.cvv && (
                <p className="text-red-600 text-xs font-semibold mt-1">Invalid</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            {t("payment.amount")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 font-bold text-lg">
              $
            </span>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="50.00"
              className={`w-full pl-8 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 font-bold text-lg transition-all ${
                errors.amount
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              } focus:outline-none`}/>
          </div>
          {errors.amount && 
          (
            <p className="text-red-600 text-sm font-semibold flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.amount.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 hover:from-yellow-300 hover:via-orange-300 hover:to-orange-400 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 text-gray-900 font-bold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none">
          {loading ? 
          (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : 
          (
            <>
              <Wallet className="w-5 h-5" />
              <span>{t("balance.addFunds")}</span>
            </>
          )}
        </button>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 flex items-center gap-2 justify-center">
            <Lock className="w-4 h-4 text-green-600" />
            Your card is encrypted and secure
          </p>
        </div>
      </form>
    </div>
  );
}