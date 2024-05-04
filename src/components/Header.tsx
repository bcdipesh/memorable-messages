import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import Logo from "@/components/Logo";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="header my-6 flex justify-between">
      <Logo />
      <nav>
        <ul className="flex space-x-4">
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
            <li>
              <UserButton />
            </li>
          </SignedIn>
        </ul>
      </nav>
    </header>
  );
}
