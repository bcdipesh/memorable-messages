"use client";

import { usePathname } from "next/navigation";

export default function Quote(): JSX.Element {
  const path = usePathname();

  return (
    <blockquote className="mt-auto space-y-4 p-6 text-white">
      {path === "/login" && (
        <>
          {" "}
          <p>
            "Never underestimate the power of a meaningful message. Login to
            reconnect with loved onces and create memories that last."
          </p>
          <footer>Dipesh B C</footer>
        </>
      )}
      {path === "/signup" && (
        <>
          {" "}
          <p>
            "Your loved onces deserve heartfelt messages. Sign Up to create
            personalized reminders of your love and appreciation."
          </p>
          <footer>Dipesh B C</footer>
        </>
      )}
    </blockquote>
  );
}
