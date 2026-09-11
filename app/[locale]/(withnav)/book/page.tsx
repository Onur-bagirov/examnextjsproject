"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Users, Calendar, Clock, AlignLeft, User, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface Booking
{
    id: string;
    guests: number;
    date: string;
    time: string;
    message: string | null;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> =
{
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function BookingEvent() 
{
    const t = useTranslations();
    const { status: sessionStatus } = useSession();
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [myBookings, setMyBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(false);

    const fetchMyBookings = async () =>
    {
        setLoadingBookings(true);
        try
        {
            const response = await fetch("/api/bookings/me");
            if (!response.ok)
            {
                return;
            }
            const data = await response.json();
            setMyBookings(data);
        }
        catch (err)
        {
            console.error("Failed to fetch bookings", err);
        }
        finally
        {
            setLoadingBookings(false);
        }
    };

    useEffect(() =>
    {
        if (sessionStatus === "authenticated")
        {
            fetchMyBookings();
        }
    }, [sessionStatus]);

    const handleSubmit = async (e: React.FormEvent) => 
    {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        setSubmitted(false);

        try
        {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guests, date, time, message }),
            });

            if (!response.ok)
            {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || "Failed to submit booking");
            }

            setSubmitted(true);
            setGuests("");
            setDate("");
            setTime("");
            setMessage("");

            if (sessionStatus === "authenticated")
            {
                fetchMyBookings();
            }
        }
        catch (err: any)
        {
            setError(err.message || "Failed to submit booking");
        }
        finally
        {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-4xl font-extrabold text-[#1B1B3A] mb-16">
                    {t("booking.title")}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-16 mb-16">
                    <div className="relative w-full md:w-1/2 h-[430px]">
                        <div className="absolute left-0 top-10 grid grid-cols-4 gap-2 opacity-60">
                            {Array.from({ length: 20 }).map((_, i) => 
                            (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            ))}
                        </div>
                        <div className="absolute right-4 top-0 w-52 h-40 border-[6px] border-indigo-300 rotate-6 rounded-sm" />
                        <div className="absolute left-10 top-8 w-[330px] h-[220px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/Image/image1.png"
                                alt="image1"
                                fill
                                sizes="330px"
                                className="object-cover"/>
                        </div>
                        <div
                            className="absolute right-0 bottom-0 w-56 h-36 opacity-60"
                            style={
                            {
                                backgroundImage:
                                    "repeating-linear-gradient(135deg, #d1d5db 0, #d1d5db 1px, transparent 1px, transparent 8px)",
                            }}/>
                        <div className="absolute right-2 bottom-0 w-[300px] h-[220px] rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/Image/people2.png"
                                alt="people2"
                                fill
                                sizes="300px"
                                className="object-cover"/>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold text-[#1B1B3A] mb-4">
                            {t("booking.about")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t("booking.aboutDescription")}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block font-bold text-gray-900 mb-3">
                                {t("booking.guestEstimate")}
                            </label>
                            <div className="flex items-center bg-gray-900 rounded-lg px-4 py-4">
                                <input
                                    type="number"
                                    min={1}
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    placeholder={t("booking.guestPlaceholder")}
                                    className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm"
                                    required/>
                                <Users className="text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold text-gray-900 mb-3">
                                {t("booking.date")}
                            </label>
                            <div className="flex items-center bg-gray-900 rounded-lg px-4 py-4">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm [color-scheme:dark]"
                                    required/>
                                <Calendar className="text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold text-gray-900 mb-3">
                                {t("booking.time")}
                            </label>
                            <div className="flex items-center bg-gray-900 rounded-lg px-4 py-4">
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm [color-scheme:dark]"
                                    required/>
                                <Clock className="text-gray-400" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10">
                        <label className="block font-bold text-gray-900 mb-3">
                            {t("booking.specialRequests")}
                        </label>
                        <div className="flex items-start bg-gray-900 rounded-lg px-4 py-4">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your message"
                                rows={3}
                                className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm resize-none"/>
                            <AlignLeft className="text-gray-400 mt-1 shrink-0" size={20} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-[#1B1B3A] font-bold px-10 py-3 rounded-md">
                            {submitting ? "Submitting..." : "Booking Confirm"}
                        </button>
                    </div>
                    {error && 
                    (
                        <p className="text-center text-red-600 font-semibold mt-6">
                            {error}
                        </p>
                    )}
                    {submitted && 
                    (
                        <p className="text-center text-green-600 font-semibold mt-6">
                            Your booking request has been submitted!
                        </p>
                    )}
                </form>

                {sessionStatus === "authenticated" && 
                (
                    <div className="mt-20">
                        <h2 className="text-center text-3xl font-extrabold text-[#1B1B3A] mb-8">
                            {t("booking.myBookings")}
                        </h2>
                        <div className="rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-900">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date &amp; Time</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Guests</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Message</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingBookings ? 
                                        (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-600">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : 
                                        myBookings.length === 0 ? 
                                        (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-600">
                                                    You have no bookings yet
                                                </td>
                                            </tr>
                                        ) : (
                                            myBookings.map((b) => 
                                            (
                                                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        <div>{new Date(b.date).toLocaleDateString()}</div>
                                                        <div className="text-xs text-gray-500">{b.time}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                        {b.guests}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[240px] truncate" title={b.message || ""}>
                                                        {b.message || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}