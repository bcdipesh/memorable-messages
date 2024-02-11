import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import hero from "@/assets/hero.svg";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { token, username } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Memorable Messages | Home";
  }, []);

  return (
    <div className="home mt-24 grid space-y-10 md:mt-0 md:grid-cols-2 md:gap-x-6 md:space-y-0">
      {/* Hero section */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">
          {!token &&
            "Capture life's precious moments with heartfelt messages that last."}
          {token && `Welcome back, ${username}`}
        </h1>
        <p>
          {!token &&
            "Create personalized messages for birthdays, anniversaries, holidays, or any special occasion. Set them to deliver automatically and cherish memories forever."}
          {token &&
            `So excited to see you again, ${username}! We're here to help you make every celebration unforgettable.`}
        </p>
      </div>

      {/* Hero image */}
      <img src={hero} alt="A girl sending wishes" className="md:row-span-2" />

      {/* Call to action */}
      <div className="flex flex-col space-y-6 md:row-start-2 md:row-end-2">
        <h2 className="text-xl">
          {!token &&
            "Sign up for free and start sending memorable messages today!"}
          {token && "Create a new message and bring joy to someone's day!"}
        </h2>
        {!token && (
          <Button asChild className="w-fit">
            <Link to="/signup">Sign Up</Link>
          </Button>
        )}
        {token && (
          <Button asChild className="w-fit">
            <Link to="/occasions">Create</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
