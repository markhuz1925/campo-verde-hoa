"use client";

import { RegisterResidentModal } from "@/components/modals/register-resident-modal";
import { useEffect, useState } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <RegisterResidentModal />
    </>
  );
}
