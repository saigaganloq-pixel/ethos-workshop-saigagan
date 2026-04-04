import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; // Optional if not used everywhere yet

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scrollytelling Portfolio',
  description: 'A cinematic frontend portfolio experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
