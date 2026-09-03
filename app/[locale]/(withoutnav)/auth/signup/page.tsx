import { SignupForm } from "@/components/base/auth/signup/signup-form";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh w-full lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-gray-900 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block bg-gray-900">
                <Image
                    src="/Image/burger5.jpg"
                    alt="burger5"
                    fill
                    className="object-cover"
                    priority/>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-16 left-10 right-10 text-white">
                    <h2 className="text-4xl font-extrabold leading-tight">
                        JOIN THE <span className="text-yellow-400">FAMILY</span>
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-gray-200">
                        Create an account to track your orders, save your favorite
                        burgers and book your next event with us.
                    </p>
                </div>
            </div>
        </div>
    );
}