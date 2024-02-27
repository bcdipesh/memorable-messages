import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memorable Messages",
  description:
    "Web application that allows users to create, store, and share personalized messages by creating custom occasions.",
};

// Map of links to display in the navigation bar.
const navLinks: {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} container flex min-h-screen flex-col justify-between pt-6`}
      >
        {/* Navigation bar */}
        <nav className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0">
          <Logo />
          <div className="flex space-x-6">
            {navLinks.map((navLink) => (
              <Button variant="ghost" key={navLink.name}>
                <Link href={navLink.href}>{navLink.name}</Link>
              </Button>
            ))}
          </div>
        </nav>
        {children}

        {/* Footer with copyright and links */}
        <Footer />
      </body>
    </html>
  );
}
