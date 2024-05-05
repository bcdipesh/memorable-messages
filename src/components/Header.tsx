import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/ui/theme-toggler";

export default function Header() {
  return (
    <header className="header my-6 flex justify-between items-center">
      <Logo />
      <nav>
        <ul className="flex items-center space-x-4">
          <SignedOut>
            <li>
              <Button asChild variant="ghost">
                <Link to="/sign-in">Sign in</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </li>
          </SignedOut>
          <SignedIn>
            <li className="flex items-center">
              <UserButton />
            </li>
          </SignedIn>
          <li>
            <ThemeToggler />
          </li>
        </ul>
      </nav>
    </header>
  );
}
