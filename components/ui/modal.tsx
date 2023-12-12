"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { bitter, openSans } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
}: Props) {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className={cn("font-bold", bitter.className)}>
            {title}
          </DialogTitle>
          <DialogDescription className={cn("font-medium", openSans.className)}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
