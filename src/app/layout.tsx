import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zip AI Toolkit - Integrate Payments into Your AI Agent',
  description:
    'Seamlessly integrate Zip payment services into your AI agent with minimal configuration. Compatible with OpenAI Agent SDK, LangChain, and Vercel AI SDK.',
  keywords: [
    'AI toolkit',
    'payment integration',
    'OpenAI',
    'LangChain',
    'Vercel AI SDK',
    'Zip payments',
  ],
  openGraph: {
    title: 'Zip AI Toolkit - Integrate Payments into Your AI Agent',
    description:
      'Seamlessly integrate Zip payment services into your AI agent with minimal configuration.',
    images: [
      {
        url: '/images/meta/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zip AI Toolkit - Add Payment Services to Your AI Agent',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zip AI Toolkit - Integrate Payments into Your AI Agent',
    description:
      'Seamlessly integrate Zip payment services into your AI agent with minimal configuration.',
    images: ['/images/meta/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground grid-background relative antialiased`}
      >
        <div className="grid-gradient-overlay"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
