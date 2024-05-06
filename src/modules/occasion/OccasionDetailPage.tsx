import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
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

        if (data.userId !== userId) {
          navigate("/occasions");
        }

        setOccasion(data);
      };

      fetchOccasion();
    }
  }, [isLoaded, userId, occasionId]);

  if (!isLoaded) {
    return (
      <div className="occasion-details flex justify-center">
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

    toast.success("Occasion updated successfully.");
    navigate("/occasions");
  };

  const handleSubmit = (values: Occasion): void => {
    updateOccasion(values);
  };

  return (
    <div className="occasion-details w-full grow">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Occasion Details
      </h1>
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
          <div className="flex space-x-3">
            <Button type="submit">Update Occasion</Button>
            <Button variant="link" asChild>
              <Link to="/occasions">Go Back</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
