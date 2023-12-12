"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { z } from "zod";

const formSchema = z.object({
  accountNumber: z.string(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  block: z.string(),
  lot: z.string(),
  contactNumber: z.string(),
});

export function RegisterMemberModal() {
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);
  return (
    <Modal
      title="Register Member"
      description="Register a new Homeowner Association member"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">Registration Form</div>
    </Modal>
  );
}
