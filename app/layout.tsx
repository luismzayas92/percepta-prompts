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
    default: "PERCEPTA PROMPTS™",
    template: "%s — PERCEPTA PROMPTS™",
  },
  description:
    "Biblioteca premium de sistemas de dirección visual desarrollados por PERCEPTA.",
  keywords: [
    "PERCEPTA",
    "prompts de IA",
    "prompts premium",
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
    siteName: "PERCEPTA PROMPTS™",
    title: "PERCEPTA PROMPTS™",
    description:
      "Biblioteca premium de sistemas de dirección visual desarrollados por PERCEPTA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PERCEPTA PROMPTS™",
    description:
      "Biblioteca premium de sistemas de dirección visual desarrollados por PERCEPTA.",
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
