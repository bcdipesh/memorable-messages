import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="my-6 grid grid-cols-3 gap-6 space-y-6">
      {/* Page heading and caption */}
      <div className="col-span-full md:col-end-3 md:row-start-1">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Capture life's precious moments with heartfelt messages that last
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Create personalized messages for birthdays, anniversaries, holidays,
          or any special occasion. Set them to deliver automatically and cherish
          memories forever.
        </p>
      </div>

      {/* Hero image */}
      <Image
        className="col-span-full md:col-start-3 md:col-end-4 md:row-start-1"
        src="/hero.svg"
        alt="Women sending heartfelt messages"
        width={720}
        height={520}
        priority
      />

      {/* Call to action */}
      <p className="col-span-full leading-7 [&:not(:first-child)]:mt-6">
        Sign Up for free and start sending memorable messages today!
      </p>
      <Button asChild className="w-fit">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </main>
  );
}
