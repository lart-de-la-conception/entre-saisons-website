import type { Metadata } from "next";
import { Bodoni_Moda, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import Link from "next/link";
import { CartProvider } from "./components/CartContext";
import CartDrawer from "./components/CartDrawer";
import HeaderNav from "./components/HeaderNav";

const bodoni = Bodoni_Moda({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entre Saisons",
  description: "Entre Saisons",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodoni.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <header className="relative w-full bg-white">
            <div className="flex w-full items-center justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
              <div className="flex flex-col items-start text-[#0f1a2b]">
                <Link
                  href="/"
                  className="text-[13px] leading-none tracking-[0.08em] text-[#0f1a2b] hover:opacity-80"
                >
                  Entre Saisons
                </Link>
                <div className="mt-1 pl-px text-[10px] leading-none tracking-[0.14em] text-[#0f1a2b]/65">
                  © 2026
                </div>
              </div>
              <HeaderNav />
            </div>
          </header>
          {children}
          <CartDrawer />
          {/* <AudioPlayer /> */}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
