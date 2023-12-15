import prisma from "@/prisma/client";
import { ResidentForm } from "./_components/resident-form";

export default async function ResidentPage({
  params,
}: {
  params: { residentId: string };
}) {
  const resident = await prisma.resident.findFirst({
    where: {
      id: params.residentId,
    },
  });
  return (
    <div className="flex flex-col pt-20 px-5">
      <ResidentForm resident={resident} />
    </div>
  );
}
