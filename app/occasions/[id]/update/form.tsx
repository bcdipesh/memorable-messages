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
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Occasion, data } from "../../data";

function convertDatetimeLocalToIso(datetimeLocal) {
  // Parse the input datetime-local string
  const [dateStr, timeStr] = datetimeLocal.split("T");
  const [year, month, day] = dateStr.split("-");
  const [hour, minute] = timeStr.split(":");

  // Create a new Date object with the parsed values
  const dt = new Date(year, month - 1, day, hour, minute);

  // Convert to ISO datetime format
  const isoDatetime = dt.toISOString();

  return isoDatetime;
}

function isValidDateTime(input: string) {
  const isoDatetime = convertDatetimeLocalToIso(input);
  console.log(isoDatetime);

  return true;
}

export default function EditForm() {
  const params = useParams<{ id: string }>();
  const occasion = data.filter((occasion) => occasion.id === params.id)[0];

  const formSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Please provide the name of this Occasion."),
    status: z.enum(["pending", "processing", "success", "failed"]),
    receiverEmail: z.string().email("Please provide a valid email address."),
    deliveryMethod: z.enum(["email", "sms"]),
    deliveryDateAndTime: z.string().refine(isValidDateTime),
    createdAt: z.string().datetime(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      status: "pending",
      receiverEmail: "",
      deliveryMethod: "email",
      deliveryDateAndTime: "",
      createdAt: "",
    },
    values: occasion,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occasion Title</FormLabel>
              <FormControl>
                <Input placeholder="Anniversary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiverEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Method</FormLabel>
              <FormControl>
                <Input placeholder="email or sms" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryDateAndTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date and Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
