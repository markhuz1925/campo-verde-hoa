"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useEffect } from "react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  block: z.string(),
  lot: z.string(),
  phase: z.string(),
  email: z.string().email().optional(),
  contactNumber: z
    .string()
    .min(11, "Contact number must be at least 11 characters"),
  isAdmin: z.boolean().optional(),
  role: z.string().optional(),
});

export function RegisterMemberModal() {
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      block: "",
      lot: "",
      phase: "",
      email: "",
      contactNumber: "",
      isAdmin: false,
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const validatedValues = formSchema.parse(values);
      console.log(validatedValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.reset({
      firstName: "",
      lastName: "",
      block: "",
      lot: "",
      phase: "",
      email: "",
      contactNumber: "",
      isAdmin: false,
      role: "",
    });
  }, [form, isOpen]);

  return (
    <Modal
      title="Register Member"
      description="Register a new Homeowner Association member"
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[90dvh] overflow-y-auto"
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Last name" {...field} />
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
                      <SelectTrigger>
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
            <FormField
              control={form.control}
              name="block"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Block</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Block number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Lot number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="homeowner">Homeowner</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
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
              <Button type="submit" size="sm">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
