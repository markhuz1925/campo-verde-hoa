"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { openSans } from "@/lib/constants";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Last name must be at least 2 characters"),
  block: z.string().min(1, "Block number is required"),
  lot: z.string().min(1, "Lot number is required"),
  phase: z.string().min(1, "Please select a Phase"),
  email: z.string().email().optional().nullable(),
  contactNumber: z
    .string()
    .min(11, "Enter a valid mobile number ex. 09191234567")
    .optional()
    .nullable(),
  isAdmin: z.boolean().optional(),
  role: z.string().min(1, "Please select a role"),
});

export function RegisterResidentModal() {
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      block: "",
      lot: "",
      phase: "",
      email: undefined,
      contactNumber: undefined,
      isAdmin: false,
      role: "homeowner",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const validatedValues = formSchema.parse(values);
      await axios.post("/api/residents", validatedValues);
      await axios.post("/api/logs", {
        title: `[RESIDENT_POST_SUCCESS] ${values.name} ${values.block} ${values.lot} ${values.phase} ${values.email} ${values.contactNumber} ${values.isAdmin} ${values.role}`,
      });
      toast.success(`Resident ${values.name} registered successfully`);
      router.refresh();
      onClose();
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        // Specific error for duplicate resident
        toast.error(
          "The address or name is already registered. Please try again with different details."
        );
      } else {
        // Generic error message for other errors
        toast.error("Something went wrong. Please try again later.");
      }
      await axios.post("/api/logs", {
        title: `[RESIDENT_POST_ERROR] ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    form.reset({
      name: "",
      block: "",
      lot: "",
      phase: "",
      email: undefined,
      contactNumber: undefined,
      isAdmin: false,
      role: "homeowner",
    });
  }, [form, isOpen]);

  if (!isMounted) return null;

  return (
    <Modal
      title="Register Resident"
      description="Register new resident"
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[90dvh] overflow-y-auto"
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("flex-col space-y-4", openSans.className)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phase</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isSubmitting}>
                        <SelectValue placeholder="Select Phase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Phase 1</SelectItem>
                      <SelectItem value="2">Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="block"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Block</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter Block number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lot"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Lot</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter Lot number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input
                        disabled={isSubmitting}
                        type="tel"
                        pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                        placeholder="Enter Contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input readOnly placeholder="Enter role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary p-4">
                  <FormControl>
                    <Checkbox
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>HOA Officer/Admin/BOD</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                disabled={isSubmitting}
                type="reset"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
