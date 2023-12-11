"use client";

import { RegisterMemberModal } from "@/components/modals/register-member-modal";
import { useEffect, useState } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RegisterMemberModal />
    </>
  );
}
