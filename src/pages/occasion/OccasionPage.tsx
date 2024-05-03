import { Occasion } from "@/api/types/occasion";
import { columns } from "@/pages/occasion/columns";
import { DataTable } from "@/pages/occasion/DataTable";
import { useEffect, useState } from "react";

export default function OccasionPage() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);

  useEffect(() => {
    const getOccasion = async (): Promise<void> => {
      const resp = await fetch("http://localhost:3000/occasions");
      const data: Occasion[] = await resp.json();

      setOccasions(data);
    };

    getOccasion();
  }, []);

  return (
    <div className="occasions">
      <DataTable columns={columns} data={occasions} />
    </div>
  );
}
