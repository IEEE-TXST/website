import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: {
    default: "IEEE TXST",
    template: "%s | IEEE Texas State University",
  },
  description:
    "IEEE Texas State University is a student-led engineering organization focused on hardware, software, robotics, and professional development.",
  keywords: [
    "IEEE TXST",
    "IEEE Texas State",
    "Texas State IEEE",
    "engineering student organization",
    "robotics",
    "computer science",
    "electrical engineering",
    "technology",
  ],
  authors: [{ name: "IEEE TXST" }],

  icons: {
    icon: "/icons/apple-touch-icon.png",
    apple: "/icons/apple-touch-icon.png",
  },

  manifest: "/icons/site.webmanifest",

  openGraph: {
    title: "IEEE Texas State University",
    description:
      "Official website for IEEE at Texas State University. Learn more about Events, Officers, Committees, Networking, and Industry connections.",
    url: "https://ieeetxst.org",
    siteName: "IEEE TXST",
    images: [
      {
        url: "https://ieeetxst.org/images/branding/ieee-txst-rectangle-logo.png", 
        width: 1200,
        height: 630,
        alt: "IEEE TXST",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar/>
        {children}
        <Footer/>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
