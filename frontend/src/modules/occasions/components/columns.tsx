import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import type { Occasion } from "@/api/types/occasion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Occasion>[] = [
  {
    accessorKey: "occasion_type",
    header: "Occasion Type",
  },
  {
    accessorKey: "receiver_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Receiver Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "delivery_method",
    header: "Delivery Method",
  },
  {
    accessorKey: "delivery_date",
    header: "Delivery Date",
    cell: ({ row }) => format(row.original.delivery_date, "PPP"),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => format(row.original.created_at, "PPP"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const occasion = row.original;

      const deleteOccasion = async (): Promise<void> => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/occasions/${occasion.id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          toast.success("Occasion successfully deleted.");
          location.reload();
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("" + occasion.id);
                toast.success("ID successfully copied.");
              }}
            >
              Copy occasion ID
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`/occasions/${occasion.id}`}>
                View/Update occasion details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={deleteOccasion}
            >
              Delete occasion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
