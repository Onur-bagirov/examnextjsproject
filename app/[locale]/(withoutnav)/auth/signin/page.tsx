import { SigninForm } from "@/components/base/auth/signin/signin-form";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="grid min-h-svh w-full lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-gray-900 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <SigninForm />
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
                        SAVOR THE <span className="text-yellow-400">FLAVOR</span>
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-gray-200">
                        Sign in to track your orders, save your favorite burgers and
                        book your next event with us.
                    </p>
                </div>
            </div>
        </div>
    );
}