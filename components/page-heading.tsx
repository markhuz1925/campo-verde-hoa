import { bitter, openSans } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className={cn("text-3xl font-bold tracking-tight", bitter.className)}>
        {title}
      </h2>
      <p
        className={cn("text-muted-foreground font-medium", openSans.className)}
      >
        {description}
      </p>
    </div>
  );
}
