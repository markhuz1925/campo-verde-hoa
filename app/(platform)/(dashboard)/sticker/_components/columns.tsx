"use client";

import { bitter } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type StickerColumn = {
  id: string;
  name: string;
  stickerColor: string;
  stickerNumber: string;
  stickerDate: string;
  block: string;
  lot: string;
};

export const columns: ColumnDef<StickerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "block",
    header: "Block",
  },
  {
    accessorKey: "lot",
    header: "Lot",
  },
  {
    accessorKey: "stickerColor",
    header: "Sticker Color",
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "p-1 rounded w-fit",
            row.original.stickerColor === "green" &&
              "bg-[#dbeddb] text-green-900",
            row.original.stickerColor === "yellow" &&
              "bg-[#fdecc8] text-yellow-900",
            row.original.stickerColor === "silver" &&
              "bg-[#e3e2e0] text-gray-900"
          )}
        >
          <p className="text-xs font-medium text-center">
            {`${row.original.stickerColor}`}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "stickerNumber",
    header: "Sticker Number",
    cell: ({ row }) => {
      return (
        <>
          <p className={cn("text-sm font-semibold", bitter.className)}>
            {row.original.stickerColor === "silver"
              ? row.original.stickerNumber
              : `CVHOA-${row.original.stickerNumber}`}
          </p>
        </>
      );
    },
  },
  {
    accessorKey: "stickerDate",
    header: "Date Purchased",
  },
];
