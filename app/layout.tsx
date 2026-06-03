import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bot Analytics Dashboard",
  description: "Monitor your bot performance with real-time metrics and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</body>
    </html>
  );
}
