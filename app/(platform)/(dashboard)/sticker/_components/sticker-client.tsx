"use client";

import { DataTable } from "@/components/ui/data-table";
import { StickerColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";

export function StickerClient({ data }: { data: StickerColumn[] }) {
  return (
    <>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
}
