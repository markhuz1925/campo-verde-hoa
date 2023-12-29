"use client";

import { Button } from "@/components/ui/button";
import { urbanist } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ResidentColumn } from "./columns";
import { cn } from "@/lib/utils";

export function CellAction({ data }: { data: ResidentColumn }) {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onClick={() => router.push(`/residents/${data.id}`)}
      className={cn("uppercase", urbanist.className)}
    >
      {data.name}
    </Button>
  );
}
