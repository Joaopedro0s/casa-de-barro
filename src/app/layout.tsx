import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { restaurantConfig } from "@/config/restaurant";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${restaurantConfig.name} — ${restaurantConfig.subtitle} | Cardápio Digital`,
  description: `${restaurantConfig.tagline} (${restaurantConfig.demoNotice})`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

