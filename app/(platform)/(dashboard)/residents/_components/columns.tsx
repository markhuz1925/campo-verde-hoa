"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import { CellAction } from "./cell-action";

export type ResidentColumn = {
  id: string;
  name: string;
  phase: string;
  block: string;
  lot: string;
  contactNumber: string | null;
  email?: string | null;
};

export const columns: ColumnDef<ResidentColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Name
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    accessorKey: "phase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Phase
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "block",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Block
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lot",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Lot
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
];
