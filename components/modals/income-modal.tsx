"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { transactionsFormSchema, urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function IncomeModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);
  const isOpen = useModal((state) => state.isOpen);
  const incomeModal = useModal();

  const form = useForm<z.infer<typeof transactionsFormSchema>>({
    resolver: zodResolver(transactionsFormSchema),
    defaultValues: {
      date: "",
      amount: 0,
      name: "",
      type: "income",
    },
  });

  const onSubmit = async (values: z.infer<typeof transactionsFormSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post(`/api/transactions`, values);
      await axios.post("/api/logs", {
        title: `[TRANSACTION_POST_SUCCESS] ${values.name} ${values.type} ${values.date} ${values.amount}`,
      });
      toast.success(`New Income successful ${values.name}`);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      await axios.post("/api/logs", {
        title: `[TRANSACTION_POST_ERROR] ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Create New Income"
      description="Create new Income."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cn("space-y-4 py-2 pb-4", urbanist.className)}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter income name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Amount</FormLabel>
                  <span className="absolute z-50 left-5 top-[60px] text-5xl font-thin">
                    ₱
                  </span>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                      className={cn(
                        "text-7xl h-auto backdrop-blur-3xl bg-white/10 pl-14",
                        urbanist.className
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5 justify-end">
              <Button
                disabled={isSubmitting}
                variant="secondary"
                type="reset"
                onClick={() => {
                  incomeModal.isIncomeModal = false;
                  incomeModal.isExpenseModal = false;
                  onClose();
                  form.resetField("name");
                  form.resetField("date");
                  form.resetField("amount");
                }}
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
