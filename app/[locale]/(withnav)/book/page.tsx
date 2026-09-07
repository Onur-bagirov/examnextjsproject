"use client";
import Image from "next/image";
import { useState } from "react";
import { Users, Calendar, Clock, AlignLeft, User, Mail, Phone } from "lucide-react";

export default function BookingEvent() 
{
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => 
    {
        e.preventDefault();
        console.log({ guests, date, time, message });
        setSubmitted(true);
    };

    return (
        <div className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-4xl font-extrabold text-[#1B1B3A] mb-16">
                    Booking A Event
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
                            About Booking Events
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised words
                            which do not look even slightly believable. If you
                            are going to use a passage of Lorem Ipsum, you need to
                            be sure there is not anything embarrassing hidden
                            in the middle of text.
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block font-bold text-gray-900 mb-3">
                                Guest Estimate
                            </label>
                            <div className="flex items-center bg-gray-900 rounded-lg px-4 py-4">
                                <input
                                    type="number"
                                    min={1}
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    placeholder="How many guest"
                                    className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm"
                                    required/>
                                <Users className="text-gray-400" size={20} />
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold text-gray-900 mb-3">
                                Date
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
                                Time
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
                            Write Your Special Requests
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
                        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-[#1B1B3A] font-bold px-10 py-3 rounded-md">
                            Booking Confirm
                        </button>
                    </div>
                    {submitted && 
                    (
                        <p className="text-center text-green-600 font-semibold mt-6">
                            Your booking request has been submitted!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}