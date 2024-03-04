import OccasionsTable from "@/app/occasions/occasions-table";
import { authOptions } from "@/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Occasions",
};

export default function Occasion() {
  const session = getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return <OccasionsTable />;
}
