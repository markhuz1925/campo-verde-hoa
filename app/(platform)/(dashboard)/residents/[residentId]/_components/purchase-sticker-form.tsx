"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { openSans, purchaseStickerFormSchema } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resident, StickerPrice } from "@prisma/client";
import axios from "axios";
import {
  ContactIcon,
  Loader2,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function PurchaseStickerForm({
  resident,
  sticker,
}: {
  resident: Resident | null;
  sticker: StickerPrice[] | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof purchaseStickerFormSchema>>({
    resolver: zodResolver(purchaseStickerFormSchema),
    defaultValues: {
      residentId: resident ? resident.id : "",
      quantity: 1,
    },
  });
  console.log(sticker);

  const onSubmit = async (
    values: z.infer<typeof purchaseStickerFormSchema>
  ) => {
    try {
      setIsSubmitting(true);
      const validatedValues = purchaseStickerFormSchema.parse(values);
      await axios.post(`/api/purchase-sticker`, validatedValues);
      await axios.post("/api/logs", {
        title: `[STICKER_POST_SUCCESS] ${values.name} ${values.driverLicense} ${values.role} ${values.stickerColor} ${values.vehicleColor} ${values.vehicleType} ${values.amount}`,
      });
      toast.success(`Purchase successful`);
      router.refresh();
      router.back();
    } catch (error) {
      await axios.post("/api/logs", {
        title: `[STICKER_POST_ERROR] ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl backdrop-blur-3xl backdrop-opacity-50 bg-teal-900/10 p-5 shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-4", openSans.className)}
        >
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col space-y-4 w-full">
              <FormField
                control={form.control}
                name="residentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resident Id</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
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
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="homeowner"
                              value="homeowner"
                              className="peer sr-only"
                              onClick={() => {
                                form.setValue(
                                  "name",
                                  resident ? resident.name : ""
                                );
                                form.setValue("stickerColor", "green");
                                form.setValue(
                                  "amount",
                                  sticker ? Number(sticker[4].price) : 0
                                );
                              }}
                            />
                          </FormControl>
                          <Label
                            htmlFor="homeowner"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <UserIcon />
                            Resident
                          </Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="tenant"
                              value="tenant"
                              className="peer sr-only"
                              onClick={() => {
                                form.setValue("name", "");
                                form.setValue("stickerColor", "yellow");
                                form.setValue(
                                  "amount",
                                  sticker ? Number(sticker[3].price) : 0
                                );
                              }}
                            />
                          </FormControl>
                          <Label
                            htmlFor="tenant"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <UsersIcon />
                            Tenant
                          </Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="visitor"
                              value="visitor"
                              className="peer sr-only"
                              onClick={() => {
                                form.setValue("name", "");
                                form.setValue("stickerColor", "white");
                                form.setValue(
                                  "amount",
                                  sticker ? Number(sticker[0].price) : 0
                                );
                              }}
                            />
                          </FormControl>
                          <Label
                            htmlFor="visitor"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <ContactIcon />
                            Visitor
                          </Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="special"
                              value="special"
                              className="peer sr-only"
                              onClick={() => {
                                form.setValue("name", "");
                                form.setValue("stickerColor", "silver");
                                form.setValue(
                                  "amount",
                                  sticker ? Number(sticker[1].price) : 0
                                );
                              }}
                            />
                          </FormControl>
                          <Label
                            htmlFor="special"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <ShieldCheckIcon />
                            Special
                          </Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stickerDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="w-fit" />
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
                name="driverLicense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver License</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter driver license"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>ex. D00-00-000000</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stickerNumber"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Sticker Number</FormLabel>
                    <div className="absolute inset-y-0 top-6 left-0 flex items-center bg-secondary px-1 rounded-tl-md rounded-bl-md text-sm">
                      CVHOA -
                    </div>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter sticker number"
                        {...field}
                        className="pl-[70px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stickerColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sticker Color</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder=""
                        {...field}
                        readOnly
                        className={cn(
                          "",
                          field.value === "green" && "bg-green-800 text-white",
                          field.value === "yellow" && "bg-yellow-400",
                          field.value === "white" && "bg-white",
                          field.value === "silver" && "bg-gray-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder=""
                        {...field}
                        readOnly
                        className={cn(
                          "",
                          form.getValues("stickerColor") === "green" &&
                            "bg-green-800 text-white",
                          form.getValues("stickerColor") === "yellow" &&
                            "bg-yellow-400",
                          form.getValues("stickerColor") === "white" &&
                            "bg-white",
                          form.getValues("stickerColor") === "silver" &&
                            "bg-gray-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder=""
                        {...field}
                        readOnly
                        className={cn(
                          "",
                          form.getValues("stickerColor") === "green" &&
                            "bg-green-800 text-white",
                          form.getValues("stickerColor") === "yellow" &&
                            "bg-yellow-400",
                          form.getValues("stickerColor") === "white" &&
                            "bg-white",
                          form.getValues("stickerColor") === "silver" &&
                            "bg-gray-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-4 w-full">
              <h2 className="text-xl font-semibold">Vehicle Details</h2>
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter vehicle plate number/MV number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter vehicle type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Color</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter vehicle color"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-end">
            <Button
              disabled={isSubmitting}
              variant="secondary"
              type="reset"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
