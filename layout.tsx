// frontend/src/app/layout.tsx
// PSU CRM & PM System — Root Layout
// Author: Roise Uddin <r.uddin@psu.edu>

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PSU CRM & Project Management System',
    template: '%s | PSU CRM',
  },
  description:
    'Enterprise-grade CRM and Project Management platform for Pacific States University — By Konkuk University Foundation',
  keywords: [
    'Pacific States University',
    'PSU',
    'CRM',
    'Project Management',
    'Task Management',
    'Konkuk University Foundation',
  ],
  authors: [
    {
      name: 'Roise Uddin',
      url: 'https://linkedin.com/in/roiseuddinr',
    },
  ],
  creator: 'Roise Uddin',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'PSU CRM & Project Management System',
    description: 'Enterprise CRM & PM platform for Pacific States University',
    siteName: 'PSU CRM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PSU CRM & Project Management System',
    description: 'Enterprise CRM & PM platform for Pacific States University',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#1a5c38',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
