import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import HeroImage from "@/assets/hero.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="home grid space-y-10 md:mt-0 md:grid-cols-2 md:gap-x-6 md:space-y-0">
      <div className="flex flex-col space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          {isLoaded &&
            !isSignedIn &&
            "Capture life's precious moments with heartfelt messages that last."}
          {isLoaded && isSignedIn && `Welcome back, ${user.fullName}`}
        </h1>
        <p>
          {isLoaded &&
            !isSignedIn &&
            "Create personalized messages for birthdays, anniversaries, holidays, or any special occasion. Set them to deliver automatically and cherish memories forever."}
          {isLoaded &&
            isSignedIn &&
            `So excited to see you again, ${user.fullName}! We're here to help you make every celebration unforgettable.`}
        </p>
      </div>

      <img
        src={HeroImage}
        alt="A girl sending wishes"
        className="md:row-span-2"
      />

      <div className="flex flex-col space-y-6 md:row-start-2 md:row-end-2">
        <p className="text-sm mt-2">
          {isLoaded &&
            !isSignedIn &&
            "Sign up for free and start sending memorable messages today!"}
          {isLoaded &&
            isSignedIn &&
            "Create a new message and bring joy to someone's day!"}
        </p>
        {isLoaded && !isSignedIn && (
          <Button asChild className="w-fit">
            <Link to="/sign-up">Sign up</Link>
          </Button>
        )}
        {isLoaded && isSignedIn && (
          <Button asChild className="w-fit">
            <Link to="/occasions">View my occasions</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
