"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, Calendar, Shield, Upload, ArrowLeft } from "lucide-react";

interface UserProfile 
{
    id: string;
    name: string | null;
    email: string;
    role: string;
    image: string | null;
    createdAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const { status, data: session } = useSession();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => 
    {
        if (status === "unauthenticated") 
        {
            router.push("/auth/signin");
            return;
        }

        if (status === "authenticated") 
        {
            fetchUserProfile();
        }
    }, [status, router]);

    const fetchUserProfile = async () => 
    {
        try 
        {
            const response = await fetch("/api/users/profile");

            if (!response.ok) 
            {
                throw new Error("Failed to fetch user profile");
            }
            const data = await response.json();
            setUser(data);
        } 
        catch (err) 
        {
            setError(err instanceof Error ? err.message : "An error occurred");
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const file = e.target.files?.[0];

        if (!file) 
        {
            return;
        }

        setUploading(true);

        try 
        {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/users/upload-photo", 
            {
                method: "POST",
                body: formData,
            });

            if (!response.ok) 
            {
                throw new Error("Failed to upload photo");
            }

            await fetchUserProfile();
        } 
        catch (err) 
        {
            setError(err instanceof Error ? err.message : "Upload failed");
        } 
        finally 
        {
            setUploading(false);
        }
    };

    if (status === "loading" || loading) 
    {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
                        <div className="animate-pulse space-y-4">
                            <div className="h-32 bg-gray-700 rounded-full mx-auto w-32"></div>
                            <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto"></div>
                            <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto"></div>
                            <div className="space-y-3">
                                <div className="h-16 bg-gray-700 rounded"></div>
                                <div className="h-16 bg-gray-700 rounded"></div>
                                <div className="h-16 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) 
    {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-900/30 border border-red-500 rounded-2xl p-8">
                        <p className="text-red-300 text-lg">{error || "User data not available"}</p>
                        <Link href="/">
                            <button className="mt-6 inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => 
    {
        return new Date(dateString).toLocaleDateString("en-US", 
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/">
                    <button className="mb-8 inline-flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </Link>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-40 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400"></div>
                    <div className="px-6 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 mb-8">
                            <label className="group relative cursor-pointer">
                                <div className="relative">
                                    <div className="rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 p-2 h-32 w-32 flex items-center justify-center border-4 border-gray-800 shadow-2xl group-hover:shadow-yellow-500/50 transition-all">
                                        {user.image ? 
                                        (
                                            <img
                                                src={user.image}
                                                alt={user.name || "User"}
                                                className="w-full h-full rounded-full object-cover"/>
                                        ) : 
                                        (
                                            <span className="text-5xl font-bold text-gray-900">
                                                {user.name?.charAt(0).toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-yellow-400 rounded-full p-3 shadow-lg group-hover:bg-yellow-500 transition-colors">
                                        <Upload className="w-5 h-5 text-gray-900" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    disabled={uploading}
                                    className="hidden"/>
                                {uploading && 
                                (
                                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-400 border-t-transparent"></div>
                                    </div>
                                )}
                            </label>
                            <div className="text-center sm:text-left">
                                <h1 className="text-4xl font-bold text-white mb-2">{user.name || "User"}</h1>
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full font-semibold">
                                    <Shield className="w-4 h-4" />
                                    {user.role === "ADMIN" ? "Administrator" : "Customer"}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-400/20 rounded-lg p-3">
                                        <Mail className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-400 font-medium">Email Address</p>
                                        <p className="text-white font-semibold break-all mt-1">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-400/20 rounded-lg p-3">
                                        <Shield className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Account Role</p>
                                        <p className="text-white font-semibold mt-1">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-400/20 rounded-lg p-3">
                                        <Calendar className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Member Since</p>
                                        <p className="text-white font-semibold mt-1">{formatDate(user.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-400/20 rounded-lg p-3">
                                        <User className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-400 font-medium">User ID</p>
                                        <p className="text-white font-semibold text-sm break-all mt-1">{user.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/50 rounded-2xl p-6 mb-8">
                            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                Account Information
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Your profile is fully set up and ready to use. You can place orders, view your order history, and enjoy all features. Click the photo area above to upload a profile picture.
                            </p>
                        </div>
                        <Link href="/">
                            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/50">
                                <ArrowLeft className="w-5 h-5" />
                                Back to Home
                            </button>
                        </Link>
                        <p className="text-center text-gray-400 text-sm mt-4">
                            💡 Tip: Click on the avatar to upload a profile photo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}