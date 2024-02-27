"use client";

import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col space-y-6 pb-16">
      <Separator />
      {/* Top row: Logo and navigation links */}
      <div className="flex flex-col justify-between md:flex-row">
        {/* Left content: Logo */}
        <Logo />

        {/* Right content: Navigation links */}
        <div className="flex space-x-6">
          <Button asChild variant="link" className="w-fit p-0">
            <Link href="/terms-of-service">Terms of Service</Link>
          </Button>
          <Button asChild variant="link" className="w-fit p-0">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
        </div>
      </div>

      {/* Bottom row: Copyright information */}
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} Memorable Messages. Made to create memories that
        will last a lifetime.
      </p>
    </footer>
  );
}
