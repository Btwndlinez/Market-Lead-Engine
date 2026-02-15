import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Market Lead Engine | AI-Powered Lead Processing",
  description: "AI-powered lead processing, qualification, and automation engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
