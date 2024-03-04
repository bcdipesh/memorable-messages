import { Metadata } from "next";

import CreateForm from "./form";

export const metadata: Metadata = {
  title: "Add Occasion",
};

export default function CreateOccasion() {
  return <CreateForm />;
}
