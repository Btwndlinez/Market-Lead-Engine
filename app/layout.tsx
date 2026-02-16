import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Market Lead Engine | AI-Powered Lead Processing",
  description:
    "AI-powered lead processing, qualification, and automation engine. Process, qualify, and convert leads with 10 intelligent edge functions.",
  keywords: "AI leads, lead engine, lead processing, lead qualification, SLA monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Inline script to prevent FOUC on dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('mle-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-500">
            <p>© 2026 Market Lead Engine. Stealth Mode: OFF.</p>
            <div className="flex gap-6">
              <a href="/Market-Lead-Engine/terms" className="hover:text-red-600 transition-colors">Terms</a>
              <a href="/Market-Lead-Engine/privacy" className="hover:text-red-600 transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
