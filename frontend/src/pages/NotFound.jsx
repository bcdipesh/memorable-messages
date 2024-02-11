import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="not-found container flex h-screen flex-col justify-center gap-6">
    <h1 className="text-3xl font-bold">Page not found</h1>
    <p className="text-2xl">
      The requested page couldn't be located. Checkout for any URL misspelling
      or
    </p>
    <Link to="/">
      <Button type="button">Return to the homepage</Button>
    </Link>
  </div>
);

export default NotFound;
