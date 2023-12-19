"use client";

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
            row.original.stickerColor === "green" && "bg-green-800/20",
            row.original.stickerColor === "yellow" && "bg-yellow-400/20",
            row.original.stickerColor === "silver" && "bg-gray-400/20"
          )}
        >
          <p className="text-sm font-medium text-center">
            {row.original.stickerColor}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "stickerNumber",
    header: "Sticker Number",
  },
  {
    accessorKey: "stickerDate",
    header: "Date Purchased",
  },
];
