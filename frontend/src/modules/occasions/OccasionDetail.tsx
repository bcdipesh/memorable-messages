import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/clerk-react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { formSchema } from "@/modules/occasions/api/updateOccasionSchema";

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

export default function OccasionDetail() {
  document.title = "Memorable Messages | Occasion Details";

  const [occasion, setOccasion] = useState<z.infer<typeof formSchema> | null>(
    null,
  );
  const { occasionId } = useParams();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      occasion_type: "",
      receiver_email: "",
      delivery_method: "",
      delivery_date: new Date(),
      message: "",
      created_at: new Date(),
    },
    values: occasion as z.infer<typeof formSchema>,
  });

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }

    if (isLoaded && userId) {
      const fetchOccasion = async (): Promise<void> => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/occasions/${occasionId}`,
        );

        if (!response.ok) {
          navigate("/not-found");
        }

        const data: z.infer<typeof formSchema> = await response.json();

        if (data.user_id !== userId) {
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

  const updateOccasion = async (
    updatedData: z.infer<typeof formSchema>,
  ): Promise<void> => {
    await fetch(`${import.meta.env.VITE_API_URL}/occasions/${occasionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    toast.success("Occasion updated successfully.");
    navigate("/occasions");
  };

  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
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
            name="occasion_type"
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
            name="receiver_email"
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
            name="delivery_method"
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
            name="delivery_date"
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
            name="created_at"
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
