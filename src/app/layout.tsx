import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zip AI Toolkit - Integrate Payments into Your AI Agent",
  description: "Seamlessly integrate Zip payment services into your AI agent with minimal configuration. Compatible with OpenAI Agent SDK, LangChain, and Vercel AI SDK.",
  keywords: ["AI toolkit", "payment integration", "OpenAI", "LangChain", "Vercel AI SDK", "Zip payments"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground grid-background relative`}
      >
        <div className="grid-gradient-overlay"></div>
        {children}
      </body>
    </html>
  );
}
