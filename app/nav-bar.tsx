"use client";

import { signOut, useSession } from "next-auth/react";
import ToggleTheme from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Logo from "./logo";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <nav className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0">
      <Logo />
      <div className="flex space-x-6">
        {session?.user?.name && (
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="flex items-center p-6"
          >
            <Avatar className="mr-4">
              <AvatarImage src={session.user.image} alt={session.user.name} />
            </Avatar>
            Sign Out
          </Button>
        )}
        {!session && (
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}
