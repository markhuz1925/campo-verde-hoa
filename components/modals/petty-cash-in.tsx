"use client";

import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { pettyCashFormSchema } from "@/lib/constants";

export function PettyCashIn() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);
  const isOpen = useModal((state) => state.isOpen);
  const cashInModal = useModal();

  const form = useForm<z.infer<typeof pettyCashFormSchema>>({
    resolver: zodResolver(pettyCashFormSchema),
    defaultValues: {
      date: "",
      paidTo: "Petty Cash",
      description: "Petty Cash In",
      amount: 0,
      approvedBy: "",
      balance: 0,
      type: "cash-in",
    },
  });

  return (
    <div>
      <h1>Petty Cash In</h1>
    </div>
  );
}
