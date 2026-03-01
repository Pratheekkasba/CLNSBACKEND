import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CLNS | Centralised Legal Network Solutions",
  description: "The first unified legal-tech ecosystem connecting clients, students, and advocates through a single digital platform.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="/clns-logo.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/video-hero/image_for_supremcort.jpg?v=2" fetchPriority="high" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

