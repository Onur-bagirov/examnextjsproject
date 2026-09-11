import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Project",
  description: "Authentication System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}