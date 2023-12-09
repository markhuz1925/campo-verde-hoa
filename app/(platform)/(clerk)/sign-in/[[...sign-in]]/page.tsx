import { openSans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className={cn("", openSans.className)}>
      <SignIn
        appearance={{
          elements: {
            footer: { display: "none", visibility: "hidden", opacity: "0" },
            footerAction: { display: "none" },
            formButtonPrimary:
              "bg-[#1a401d] font-bold rounded-2xl hover:bg-[#1a401d]/80 active:bg-[#1a401d] active:ring-0 focus-active:ring-0 focus:ring-0",
            formFieldInput: "rounded-2xl focus:ring-0",
            card: "shadow-none",
          },
        }}
      />
    </div>
  );
}
