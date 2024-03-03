import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "./footer";
import "./globals.css";
import NavBar from "./nav-bar";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Memorable Messages",
    default: "Memorable Messages",
  },
  description:
    "Web application that allows users to create, store, and share personalized messages by creating custom occasions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} container relative flex min-h-screen flex-col justify-between py-8`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navigation bar */}
          <NavBar />
          {children}
          {/* Footer with copyright and links */}
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
