import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PERCEPTA LAB™",
    template: "%s — PERCEPTA LAB™",
  },
  description:
    "Systems™ de dirección visual premium desarrollados por PERCEPTA. Descubre, compra y descarga.",
  keywords: [
    "PERCEPTA",
    "PERCEPTA LAB",
    "prompts de IA",
    "Systems de IA",
    "dirección visual",
    "ChatGPT",
    "Midjourney",
    "Gemini",
    "Claude",
    "Grok",
  ],
  authors: [{ name: "PERCEPTA" }],
  creator: "PERCEPTA",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "PERCEPTA LAB™",
    title: "PERCEPTA LAB™",
    description:
      "Systems™ de dirección visual premium desarrollados por PERCEPTA. Descubre, compra y descarga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PERCEPTA LAB™",
    description:
      "Systems™ de dirección visual premium desarrollados por PERCEPTA. Descubre, compra y descarga.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full dark`}>
      <body className="min-h-full flex flex-col bg-void text-frost antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
