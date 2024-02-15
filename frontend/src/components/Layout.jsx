import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import { Laptop, Moon, Sun } from "lucide-react";

import Logo from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

/**
 * Access theme management functionality for toggling themes.
 */
const Layout = () => {
  // Access theme management functions and authentication state
  const { setTheme } = useTheme();
  const { token, username, handleLogout } = useContext(AuthContext);

  // Get the current year for the footer copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="layout container flex h-screen flex-col justify-between">
      {/* Navigation bar */}
      <nav className="mt-6 flex list-none flex-col justify-between space-y-6 md:flex-row md:space-y-0">
        {/* Left content: Logo */}
        <Logo />

        {/* Right content: Navigation links and theme toggle */}
        <div className="flex space-x-6">
          <ul className="flex space-x-6">
            {/* Show profile, occasions, and logout options for authenticated users */}
            {token && (
              <>
                <li>
                  <Button variant="ghost" asChild>
                    <Link to="/profile">Profile</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link to="/occasions">Occasions</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </>
            )}
            {/* Show login and signup options for unauthenticated users */}
            {!token && (
              <>
                <li>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </li>
              </>
            )}
            {/* Theme toggle dropdown menu */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {/* Visually indicate current theme with sun/moon icons */}
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="font-bold"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2" /> Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-bold"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2" /> Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-bold"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="mr-2" /> System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      {/* Content area for child components */}
      <Outlet />

      {/* Footer with copyright and links */}
      <footer className="flex flex-col space-y-6 py-16">
        <Separator />
        {/* Top row: Logo and navigation links */}
        <div className="flex flex-col justify-between md:flex-row">
          {/* Left content: Logo */}
          <Logo />

          {/* Right content: Navigation links */}
          <div className="flex space-x-6">
            <Button asChild variant="link" className="w-fit p-0">
              <Link to="/terms-of-service">Terms of Service</Link>
            </Button>
            <Button asChild variant="link" className="w-fit p-0">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Button>
          </div>
        </div>

        {/* Bottom row: Copyright information */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Memorable Messages. Made to create memories that
          will last a lifetime.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
