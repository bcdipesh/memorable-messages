import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Occasion } from "@/api/types/occasion";
import { columns } from "@/pages/occasion/columns";
import { DataTable } from "@/pages/occasion/DataTable";
import { Button } from "@/components/ui/button";

export default function OccasionPage() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }

    if (isLoaded && userId) {
      const getOccasion = async (): Promise<void> => {
        const response = await fetch("http://localhost:3000/occasions");
        const data: Occasion[] = await response.json();

        setOccasions(data);
      };

      getOccasion();
    }
  }, [isLoaded]);

  if (!isLoaded)
    return (
      <div className="occasions">
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>
    );

  return (
    <div className="occasions w-full grow">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Occasions
      </h1>
      <DataTable columns={columns} data={occasions} />
    </div>
  );
}
