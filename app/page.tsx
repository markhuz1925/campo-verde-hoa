import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
}
