import { Loader2 } from "lucide-react";
import Image from "next/image";

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative">
        <Image
          src="/logo.svg"
          alt="Campo Verde Homeowners Association"
          width={200}
          height={200}
        />
        <Loader2
          strokeWidth={1.25}
          absoluteStrokeWidth
          className="absolute animate-spin text-primary w-[300px] h-[300px] -top-[50px] -left-[50px]"
        />
      </div>
    </div>
  );
}
