import ProfilePage from "@/components/base/pages/profile-page";
import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: "User Profile | Burger Hut",
    description: "View and manage your user profile",
};

export default function Page() {
    return (
        <SessionProvider>
            <ProfilePage />
        </SessionProvider>
    );
}