import prisma from "@/prisma/client";
import { ResidentForm } from "./_components/resident-form";
import { Resident } from "@prisma/client";

export default async function ResidentPage({
  params,
}: {
  params: { residentId: string };
}) {
  const resident: Resident | null = await prisma.resident.findFirst({
    where: {
      id: params.residentId,
    },
    include: {
      stickers: true,
    },
  });
  return (
    <div className="flex flex-col pt-20 px-5">
      <ResidentForm resident={resident} />
    </div>
  );
}
