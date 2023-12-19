"use client";

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
