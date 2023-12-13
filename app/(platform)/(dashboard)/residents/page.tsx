import { RegisterResidentModal } from "@/components/modals/register-resident-modal";
import prisma from "@/prisma/client";
import { ResidentColumn } from "./_components/columns";
import { ResidetClient } from "./_components/resident-client";
import { ResidentsHeading } from "./_components/resisdents-heading";

export default async function ResidentsPage() {
  const residents = await prisma.resident.findMany({
    orderBy: {
      accountNumber: "asc",
    },
  });

  const formattedResidents: ResidentColumn[] = residents.map((resident) => ({
    id: resident.id,
    accountNumber: resident.accountNumber,
    name: resident.name,
    phase: resident.phase,
    block: resident.block,
    lot: resident.lot,
    contactNumber: resident.contactNumber,
    email: resident.email,
  }));

  return (
    <div className="pt-20 px-5">
      <ResidentsHeading />
      <RegisterResidentModal />
      <div className="flex flex-col space-y-4 pt-6">
        <ResidetClient data={formattedResidents} />
      </div>
    </div>
  );
}
