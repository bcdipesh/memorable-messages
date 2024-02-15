import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import moment from "moment";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Column definitions for the table
const columns = [
  {
    accessorKey: "occasion_type",
    header: "Occasion Type",
  },
  {
    accessorKey: "receiver_email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Receiver Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "receiver_phone",
    header: "Receiver Phone",
  },
  {
    accessorKey: "delivery_method",
    header: "Delivery Method",
  },
  {
    accessorKey: "date_time",
    header: "Delivery Date and Time",
    cell: (props) => moment(props.getValue()).format("YYYY-MM-DD hh:mm:ss A"),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: (props) => moment(props.getValue()).format("YYYY-MM-DD hh:mm:ss A"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem>
              <Link to={`/occasions/${row.original.id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await MemorableMessagesApi.deleteOccasionById(row.original.id);
                location.reload();
              }}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/**
 * Occasion component renders the list of user occasions.
 *
 * @returns {React.JSX.Element} Occasion component UI.
 */
const Occasion = () => {
  const { handleLogout } = useContext(AuthContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: occasions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /**
   * Display a toast notification with optional variant
   * @param title - Title of the notification
   * @param description - Description of the notification
   * @param variant - Optional variant (default, success, destructive)
   */
  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  /**
   * Fetch user occasions on component mount.
   */
  useEffect(() => {
    document.title = "Memorable Messages | Occasions";

    const getUserOccasions = async () => {
      setIsLoading(true);
      try {
        const resp = await MemorableMessagesApi.getUserOccasions();
        setOccasions(resp);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.statusCode === 401) {
          handleLogout();
          showToast(
            "Oops! It seems your session has expired.",
            "Please log back in using your username and password and try again.",
            "destructive",
          );
        }
      }
    };

    getUserOccasions();
  }, []);

  return (
    <div className="w-full">
      {isLoading && (
        <span className="flex w-full items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-1 size-5 animate-spin" /> Loading ...
        </span>
      )}
      {!isLoading && (
        <>
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("receiver_email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("receiver_email")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="flex items-center space-x-6">
              <Button variant="outline" asChild>
                <Link to="/occasions/create">Create New Occasion</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableCaption className="mb-4">
                A list of your occasions.
              </TableCaption>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>Total</TableCell>
                  <TableCell>{!isLoading && occasions.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Occasion;
