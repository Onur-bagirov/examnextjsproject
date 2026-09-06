"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/base/header/header";
import Footer from "@/components/base/footer/footer";

export default function WithNavLayout({ children }: { children: React.ReactNode }) 
{
    return (
        <SessionProvider>
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        </SessionProvider>
    );
}