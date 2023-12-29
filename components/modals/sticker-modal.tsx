"use client";

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
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/hooks/use-modal";
import { urbanist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  price: z.coerce.number().min(1),
  isActive: z.boolean().optional(),
});

export function StickerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);
  const isOpen = useModal((state) => state.isOpen);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "",
      price: 0,
      isActive: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/sticker-price", values);
      await axios.post("/api/logs", {
        title: `[STICKER_POST_SUCCESS] ${values.name}, ${values.color}, ${values.price}`,
      });
      toast.success(
        `Sticker ${values.name}-${values.color}-${values.price} created`
      );
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
      await axios.post("/api/logs", { title: `[STICKER_POST_ERROR] ${error}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Setup Sticker"
      description="Mange your stickers."
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sticker Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Select sticker name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="homeowner">Home Owner</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="visitor">Visitor</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="special">Special Entity</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Select sticker color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GREEN">GREEN</SelectItem>
                      <SelectItem value="YELLOW">YELLOW</SelectItem>
                      <SelectItem value="WHITE">WHITE</SelectItem>
                      <SelectItem value="RED">RED</SelectItem>
                      <SelectItem value="SILVER">SILVER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-primary p-4">
                  <FormControl>
                    <Checkbox
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button
                type="reset"
                onClick={onClose}
                disabled={loading}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} size="sm">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
