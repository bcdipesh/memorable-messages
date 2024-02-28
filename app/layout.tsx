import Logo from "./logo";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";
import Footer from "./footer";
import ThemeProvider from "@/components/theme-provider";
import ToggleTheme from "@/components/ui/toggle-theme";

// Map of links to display in the navigation bar.
export const navLinks: {
  name: string;
  href: string;
}[] = [
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
];
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
          <nav className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0">
            <Logo />
            <div className="flex space-x-6">
              {navLinks.map((navLink) => (
                <Button variant="ghost" key={navLink.name} asChild>
                  <Link href={navLink.href}>{navLink.name}</Link>
                </Button>
              ))}
              <ToggleTheme />
            </div>
          </nav>
          {children}
          {/* Footer with copyright and links */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
