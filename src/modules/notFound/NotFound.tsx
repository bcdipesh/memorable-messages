import { Link } from "react-router-dom";

import NotFoundImage from "@/assets/not-found.svg";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  title?: string;
  message?: string;
  callToActionLink?: string;
  callToActionBtnText?: string;
}

export default function NotFound({
  title = "Uh oh! Page not found.",
  message = "Oops! It looks like you've stumbled upon a page that doesn't exist.",
  callToActionLink = "/",
  callToActionBtnText = "Back to home",
}: NotFoundProps) {
  document.title = "Memorable Messages | Page Not Found";

  return (
    <div className="not-found grid space-y-6 md:space-y-0 md:grid-cols-2">
      <img
        className="md:col-start-2 md:col-end-3"
        src={NotFoundImage}
        alt="A boy and girl looking at empty box"
      />
      <div className="md:row-start-1 space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          {title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{message}</p>
        <Button asChild>
          <Link to={callToActionLink}>{callToActionBtnText}</Link>
        </Button>
      </div>
    </div>
  );
}
