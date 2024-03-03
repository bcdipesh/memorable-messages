import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./footer";
import ThemeProvider from "@/components/theme-provider";
import NavBar from "./nav-bar";
import SessionProvider from "@/components/session-provider";
import { getServerSession } from "next-auth";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Memorable Messages",
    default: "Memorable Messages",
  },
  description:
    "Web application that allows users to create, store, and share personalized messages by creating custom occasions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} container relative flex min-h-screen flex-col justify-between py-8`}
      >
        <SessionProvider session={session}>
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
        </SessionProvider>
      </body>
    </html>
  );
}
