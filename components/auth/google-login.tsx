"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginWithGoogleBtn() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className="flex w-full items-center"
    >
      <Image className="pr-2" src="/google.svg" alt="" width={35} height={35} />
      Login with Google
    </Button>
  );
}
