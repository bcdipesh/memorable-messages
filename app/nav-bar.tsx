import ToggleTheme from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import Link from "next/link";
import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import LogOutBtn from "@/components/ui/auth/signout-btn";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
      <Logo />
      <div className="flex items-center space-x-6">
        {session?.user?.name && (
          <LogOutBtn
            imageUrl={session.user.image ?? ""}
            name={session.user.name}
          />
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
