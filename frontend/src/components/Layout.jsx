import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const Layout = () => {
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
          {token && (
            <li className="flex space-x-6">
              <Button variant="outline" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/occasions">Occasions</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          )}
          {!token && (
            <>
              <li>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </li>
            </>
          )}
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
