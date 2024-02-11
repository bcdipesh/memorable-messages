import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import { Laptop, Moon, Sun, SunMoon } from "lucide-react";

import Logo from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Layout = () => {
  const { setTheme } = useTheme();
  const { token, username, handleLogout } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();

  return (
    <div className="layout container flex h-screen flex-col justify-between">
      {/* Navigation bar */}
      <nav className="mt-6 flex list-none flex-col justify-between space-y-6 md:flex-row md:space-y-0">
        {/* Left content */}
        <Logo />

        {/* Right content */}
        <div className="flex space-x-6">
          <ul className="flex space-x-6">
            {token && (
              <>
                <li>
                  <Button className="rounded-full" variant="ghost" asChild>
                    <Link to="/profile">Profile</Link>
                  </Button>
                </li>
                <li>
                  <Button className="rounded-full" variant="ghost" asChild>
                    <Link to="/occasions">Occasions</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    className="rounded-full"
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
            {!token && (
              <>
                <li>
                  <Button className="rounded-full" variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
                <li>
                  <Button className="rounded-full" variant="ghost" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </li>
              </>
            )}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <SunMoon />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="flex flex-col space-y-6 border-t py-16">
        {/* Top row */}
        <div className="flex flex-col justify-between md:flex-row">
          {/* Left content */}
          <Logo />

          {/* Right content */}
          <div className="flex space-x-6">
            <Button asChild variant="link" className="w-fit p-0">
              <Link to="/terms-of-service">Terms of Service</Link>
            </Button>
            <Button asChild variant="link" className="w-fit p-0">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Button>
          </div>
        </div>

        {/* Bottom row */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Memorable Messages. Made to create memories that
          will last a lifetime.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
