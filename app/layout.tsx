import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ChainTabs } from "@/components/chain-tabs";
import { Analytics } from "@vercel/analytics/react"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BundleBear",
    template: `%s - Smart Wallet Data`,
  },
  description: "Smart Wallet Data",
  keywords: [
    "ERC-4337",
    "smart accounts",
    "account abstraction",
    "smart contract wallets",
    "crypto wallet",
  ],
  authors: [
    {
      name: "0xKofi",
      url: "https://0xkofi.com",
    },
  ],
  creator: "0xKofi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bundlebear.com",
    title: "BundleBear",
    description: "Smart Wallet Data",
    siteName: "BundleBear",
    images: [
      {
        url: "https://i.imgur.com/v4tp3ws.png",
        width: 1200,
        height: 630,
        alt: "BundleBear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BundleBear",
    description: "Open and transparent Smart Wallet Data",
    images: ["https://i.imgur.com/v4tp3ws.png"],
    creator: "@0xKofi",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`} >
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <div className="flex flex-col">
            <div className="hidden md:flex flex-1 space-x-4 pl-8 ">
              <ChainTabs />
            </div>
            <div className="relative min-h-screen">
              {children}
            </div>
          </div>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
    // <html lang="en">
    // </html>
  );
}
