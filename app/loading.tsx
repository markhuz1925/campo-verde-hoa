import { Loader2 } from "lucide-react";

export default function HomePageLoading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader2 className="animate-spin w-20 h-20 text-primary" />
    </div>
  );
}
