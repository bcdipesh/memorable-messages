import { Link } from "react-router-dom";

import hero from "@/assets/hero.svg";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="home mt-24 grid space-y-10 md:mt-0 md:grid-cols-2 md:gap-x-6 md:space-y-0">
      {/* Hero section */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">
          Capture life's precious moments with heartfelt messages that last.
        </h1>
        <p className="text">
          Create personalized messages for birthdays, anniversaries, holidays,
          or any special occasion. Set them to deliver automatically and cherish
          memories forever.
        </p>
      </div>

      {/* Hero image */}
      <img src={hero} alt="A girl sending wishes" className="md:row-span-2" />

      {/* Call to action */}
      <div className="flex flex-col space-y-6 md:row-start-2 md:row-end-2">
        <h2 className="text-2xl">
          Sign up for free and start sending memorable messages today!
        </h2>
        {/* <Link to="/signup">
          <Button className="w-fit rounded-full">Sign Up</Button>
        </Link> */}

        <Button asChild className="w-fit">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
