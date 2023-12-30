import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={cn("", urbanist.className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground font-medium">{description}</p>
    </div>
  );
}
