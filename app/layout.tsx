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
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {children}
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Research prototype by <a href="https://github.com/eylulsenakumral" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">@eylulsenakumral</a>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400">FAQ</a>
                <a href="https://github.com/eylulsenakumral/bot-analytics-dashboard" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
