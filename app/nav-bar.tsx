import { authOptions } from "@/auth";
import LogOutBtn from "@/components/auth/signout-btn";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ui/toggle-theme";
import { getServerSession } from "next-auth";
import Link from "next/link";

import Logo from "./logo";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
      <Logo />
      <div className="flex items-center space-x-6">
        {session?.user?.name && (
          <>
            <Button variant="ghost" asChild>
              <Link href="/occasions">Occasions</Link>
            </Button>
            <LogOutBtn
              imageUrl={session.user.image ?? ""}
              name={session.user.name}
            />
          </>
        )}
        {!session && (
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}
