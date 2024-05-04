import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@clerk/clerk-react";
import { ReloadIcon } from "@radix-ui/react-icons";

import type { Occasion } from "@/api/types/occasion";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  id: z.string().min(1, "Invalid ID."),
  userId: z.string().min(1, "Invalid User ID."),
  occasionType: z.string().min(1, "Please provide a occasion type."),
  receiverEmail: z.string().email("Please provide a valid email address."),
  deliveryMethod: z.string().min(1, "Invalid Delivery Method."),
  deliveryDate: z
    .string()
    .date("Please provide a valid date in YYYY-MM-DD format."),
  message: z.string().min(1, "Please provide a message you wish to send."),
  createdAt: z.string().date("Invalid date for Create At."),
});

export default function OccasionDetailPage() {
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const { occasionId } = useParams();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const form = useForm<Occasion>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      userId: "",
      occasionType: "",
      receiverEmail: "",
      deliveryMethod: "",
      deliveryDate: "",
      message: "",
      createdAt: "",
    },
    values: occasion as Occasion,
  });

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }

    if (isLoaded && userId) {
      const fetchOccasion = async (): Promise<void> => {
        const response = await fetch(
          `http://localhost:3000/occasions/${occasionId}`
        );
        const data: Occasion = await response.json();

        setOccasion(data);
      };

      fetchOccasion();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="occasions flex justify-center">
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>
    );
  }

  const updateOccasion = async (updatedData: Occasion): Promise<void> => {
    await fetch(`http://localhost:3000/occasions/${occasionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  };

  const handleSubmit = (values: Occasion) => {
    updateOccasion(values);
  };

  return (
    <div className="occasion-details">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="occasionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occasion Type</FormLabel>
                <FormControl>
                  <Input placeholder="Occasion Type" {...field} />
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
                  <Input placeholder="Receiver Email" {...field} />
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
                  <Input placeholder="Delivery Method" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Date</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY-MM-DD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created At</FormLabel>
                <FormControl>
                  <Input placeholder="Created At" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Occasion</Button>
        </form>
      </Form>
    </div>
  );
}
