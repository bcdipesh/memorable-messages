import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import hero from "@/assets/hero.svg";
import { Button } from "@/components/ui/button";

/**
 * Home component renders home page.
 *
 * @returns {React.JSX.Element} Home component UI.
 */
const Home = () => {
  // Accessing authentication context to get user token and username
  const { token, username } = useContext(AuthContext);

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Memorable Messages | Home";
  }, []);

  return (
    // Main layout for the home page
    <div className="home mt-24 grid space-y-10 md:mt-0 md:grid-cols-2 md:gap-x-6 md:space-y-0">
      {/* Hero section */}
      <div className="flex flex-col space-y-6">
        {/* Display a welcome message based on the presence of user token */}
        <h1 className="text-3xl font-bold">
          {!token &&
            "Capture life's precious moments with heartfelt messages that last."}
          {token && `Welcome back, ${username}`}
        </h1>
        {/* Provide information about the application based on the user's authentication status */}
        <p>
          {!token &&
            "Create personalized messages for birthdays, anniversaries, holidays, or any special occasion. Set them to deliver automatically and cherish memories forever."}
          {token &&
            `So excited to see you again, ${username}! We're here to help you make every celebration unforgettable.`}
        </p>
      </div>

      {/* Hero image */}
      {/* Display an image representing a person sending wishes */}
      <img src={hero} alt="A girl sending wishes" className="md:row-span-2" />

      {/* Call to action */}
      <div className="flex flex-col space-y-6 md:row-start-2 md:row-end-2">
        <h2 className="text-xl">
          {!token &&
            "Sign up for free and start sending memorable messages today!"}
          {token && "Create a new message and bring joy to someone's day!"}
        </h2>
        {/* Render a "Sign Up" button if the user is not authenticated */}
        {!token && (
          <Button asChild className="w-fit">
            <Link to="/signup">Sign Up</Link>
          </Button>
        )}
        {/* Render a "Create" button if the user is authenticated */}
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
