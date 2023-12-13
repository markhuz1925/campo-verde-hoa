"use client";

import { Button } from "@/components/ui/button";
import { bitter } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import { CellAction } from "./cell-action";

export type ResidentColumn = {
  id: string;
  accountNumber: number;
  name: string;
  phase: string;
  block: string;
  lot: string;
  contactNumber: string | null;
  email?: string | null;
};

export const columns: ColumnDef<ResidentColumn>[] = [
  {
    accessorKey: "accountNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn("font-semibold", bitter.className)}
        >
          Account #
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn("font-semibold", bitter.className)}
        >
          Name
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phase",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn("font-semibold", bitter.className)}
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
          className={cn("font-semibold", bitter.className)}
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
          className={cn("font-semibold", bitter.className)}
        >
          Lot
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn("font-semibold", bitter.className)}
        >
          Email
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contactNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={cn("font-semibold", bitter.className)}
        >
          Contact #
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
