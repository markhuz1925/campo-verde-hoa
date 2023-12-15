import prisma from "@/prisma/client";
import { ResidentWithOptions } from "@/types";
import { ResidentForm } from "./_components/resident-form";

export default async function ResidentPage({
  params,
}: {
  params: { residentId: string };
}) {
  const resident: ResidentWithOptions | null = await prisma.resident.findUnique(
    {
      where: {
        id: params.residentId,
      },
      include: {
        stickers: true,
        dues: true,
      },
    }
  );

  return (
    <div className="flex flex-col pt-20 px-5">
      <ResidentForm resident={resident} />
    </div>
  );
}
