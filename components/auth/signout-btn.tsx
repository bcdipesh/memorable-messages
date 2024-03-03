"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogOutBtn({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className="flex items-center p-6"
      type="button"
    >
      <Avatar className="mr-4">
        <AvatarImage src={imageUrl} alt={name} />
      </Avatar>
      Log Out
    </Button>
  );
}
