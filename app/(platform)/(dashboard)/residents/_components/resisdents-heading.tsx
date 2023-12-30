"use client";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { urbanist } from "@/lib/constants";

export function ResidentsHeading() {
  const registerResident = useModal();

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
      <PageHeading
        title="Residents"
        description="Manage your residents. You can register, update and view details of a resident."
      />
      <Button onClick={registerResident.onOpen} className={urbanist.className}>
        Register Resident
      </Button>
    </div>
  );
}
