"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useModal } from "@/hooks/use-modal";
import { purchaseStickerFormSchema, urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { StickerPrice } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function VisitorDeliveryModal({sticker}: {
  sticker: StickerPrice[] | null;
}) {
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [stickerPenalty, setStickerPenalty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof purchaseStickerFormSchema>>({
    resolver: zodResolver(purchaseStickerFormSchema),
    defaultValues: {
      residentId: "00000000-0000-0000-0000-000000000000",
      quantity: 1,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof purchaseStickerFormSchema>
  ) => {
    try {
      setIsSubmitting(true);
      const penaltyAmount = stickerPenalty ? 100 : 0;
      const totalAmount = Number(values.amount) + penaltyAmount;
      const validatedValues = {
        ...purchaseStickerFormSchema.parse(values),
        amount: totalAmount,
        stickerPenaltyChecked: stickerPenalty,
      };

      await axios.post(`/api/purchase-sticker`, validatedValues);
      await axios.post("/api/logs", {
        title: `[STICKER_POST_SUCCESS] ${values.name} ${values.driverLicense} ${values.role} ${values.stickerColor} ${values.vehicleColor} ${values.vehicleType} ${values.amount}`,
      });
      toast.success(`Purchase successful`);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      await axios.post("/api/logs", {
        title: `[STICKER_POST_ERROR] ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Modal
      title="Purchase Sticker (Visitor & Delivery)"
      isOpen={isOpen}
      onClose={onClose}
      description=""
      className="max-h-[90dvh] overflow-y-auto"
    >
      <div className={cn("space-y-4 py-2 pb-4", urbanist.className)}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="residentId"
              render={({field}) => (
                <FormItem hidden>
                  <FormLabel>Resident Id</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="00000000-0000-0000-0000-000000000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({field}) => (
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
                          className="flex flex-col items-center justify-between rounded-3xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Image
                            src="/visitor.svg"
                            alt="visitor"
                            width={200}
                            height={200}
                            className="object-contain"
                          />
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="delivery"
                            value="delivery"
                            className="peer sr-only"
                            onClick={() => {
                              form.setValue("name", "");
                              form.setValue("stickerColor", "red");
                              form.setValue(
                                "amount",
                                sticker ? Number(sticker[2].price) : 0
                              );
                            }}
                          />
                        </FormControl>
                        <Label
                          htmlFor="delivery"
                          className="flex flex-col items-center justify-between rounded-3xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Image
                            src="/delivery.svg"
                            alt="delivery"
                            width={200}
                            height={200}
                            className="object-contain"
                          />
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stickerNumber"
              render={({field}) => (
                <FormItem className="relative">
                  <FormLabel>Sticker Number</FormLabel>
                  <div
                    className="absolute inset-y-0 top-6 left-0 flex items-center bg-secondary px-1 rounded-tl-md rounded-bl-md text-sm">
                    CVHOA -
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter sticker number"
                      {...field}
                      className="pl-[70px]"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stickerColor"
              render={({field}) => (
                <FormItem hidden>
                  <FormLabel>Sticker Color</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=""
                      {...field}
                      readOnly
                      className={cn(
                        "",
                        field.value === "white" && "bg-white",
                        field.value === "red" && "bg-[#ffe2dd] text-red-900"
                      )}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({field}) => (
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
                        form.getValues("stickerColor") === "white" &&
                        "bg-white",
                        form.getValues("stickerColor") === "red" &&
                        "bg-[#ffe2dd] text-red-900"
                      )}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({field}) => (
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
                      readOnly
                      className={cn(
                        "text-7xl h-auto backdrop-blur-3xl bg-white/10 pl-14",
                        urbanist.className
                      )}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormItem
              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-red-700 bg-red-50 p-4 w-40">
              <FormControl>
                <Checkbox
                  className="border-red-700 data-[state=checked]:bg-red-700 data-[state=checked]:text-primary-foreground"
                  checked={stickerPenalty} onCheckedChange={(checked) => {
                  if (checked === true || checked === false) {
                    setStickerPenalty(checked);
                  }
                }}/>
              </FormControl>
              <FormLabel className="font-normal text-red-800">Sticker Penalty</FormLabel>
              <FormMessage/>
            </FormItem>
            <FormField
              control={form.control}
              name="stickerDate"
              render={({field}) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverLicense"
              render={({field}) => (
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter vehicle plate number/MV number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter vehicle type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleColor"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Vehicle Color</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter vehicle color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex gap-5 justify-end">
              <Button
                variant="secondary"
                type="reset"
                onClick={() => {
                  onClose();
                  form.resetField("residentId");
                  form.resetField("role");
                  form.resetField("stickerDate");
                  form.resetField("name");
                  form.resetField("driverLicense");
                  form.resetField("stickerNumber");
                  form.resetField("stickerColor");
                  form.resetField("quantity");
                  form.resetField("amount");
                  form.resetField("vehicleType");
                  form.resetField("vehicleColor");
                  form.resetField("plate");
                }}
              >
                Cancel
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin"/>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
