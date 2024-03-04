import { Metadata } from "next";

import EditForm from "./form";

export const metadata: Metadata = {
  title: "Update Occasion",
};

export default function EditOccasion() {
  return <EditForm />;
}
