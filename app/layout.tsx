import type { Metadata } from "next";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "Bot Analytics Dashboard",
  description: "Monitor your bot performance with real-time metrics and insights",
  openGraph: {
    title: "Bot Analytics Dashboard",
    description: "Real-time analytics dashboard for Telegram and Discord bots. Track messages, users, errors, and performance metrics.",
    type: "website",
    url: "https://eylulsenakumral.github.io/bot-analytics-dashboard/",
    siteName: "Bot Analytics Dashboard",
    images: [
      {
        url: "https://eylulsenakumral.github.io/bot-analytics-dashboard/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bot Analytics Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bot Analytics Dashboard",
    description: "Real-time analytics dashboard for Telegram and Discord bots. Track messages, users, errors, and performance metrics.",
    creator: "@tolgabrk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && gaId !== "G-XXXXXXXXXX" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</body>
    </html>
  );
}
