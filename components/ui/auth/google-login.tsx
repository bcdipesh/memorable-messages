"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginWithGoogleBtn() {
  return (
    <Button
      variant="ghost"
      onClick={() => signIn()}
      className="flex w-fit items-center"
    >
      <Image className="pr-2" src="/google.svg" alt="" width={35} height={35} />
      Continue with Google
    </Button>
  );
}
