import { Link } from "react-router-dom";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer flex flex-col space-y-6 py-6">
      <div role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        <Logo />
        <div className="flex">
          <Button asChild variant="link" className="pl-0">
            <Link to="/terms-of-service">Terms of Service</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        &copy; {currentYear} Memorable Messages. Made to create memories that
        will last a lifetime.
      </p>
    </footer>
  );
}
