"use client";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formSchema, openSans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ResidentWithOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { HoaDues } from "./hoa-dues";
import { PurchasedStickers } from "./purchased-stickers";
import { Sticker } from "@prisma/client";

export function ResidentForm({
  resident,
}: {
  resident: ResidentWithOptions | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...resident },
  });

  const purchasedStickers = resident?.stickers || null;
  const hoaDues = resident?.dues || null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const validatedValues = formSchema.parse(values);
      await axios.patch(`/api/residents/${params.residentId}`, validatedValues);
      await axios.post("/api/logs", {
        title: `[RESIDENT_PATCH_SUCCESS] ${values.name} ${values.block} ${values.lot} ${values.phase} ${values.email} ${values.contactNumber} ${values.isAdmin} ${values.role}`,
      });
      toast.success(`Resident ${resident?.name} updated successfully`);
      router.refresh();
      router.push("/residents");
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
        title: `[RESIDENT_PATCH_ERROR] ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 pt-6">
      <PageHeading
        title={`Editing Resident ${resident?.name}`}
        description="Edit details of a resident."
      />
      <Separator />
      <div
        className={cn("flex flex-col md:flex-row gap-5", openSans.className)}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
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
              <Button disabled={isSubmitting} type="submit" size="sm">
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <Separator orientation="vertical" className="h-[100vh-1%]" />
        <div className="flex flex-col space-y-5 w-full">
          <PurchasedStickers purchasedStickers={purchasedStickers} />
          <HoaDues data={hoaDues} />
        </div>
      </div>
    </div>
  );
}
