import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import createOccasionSchema from "@/schemas/createOccasionSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import moment from "moment";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
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
import { useToast } from "@/components/ui/use-toast";

const CreateOccasion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(createOccasionSchema),
    defaultValues: {
      occasion_type: "",
      message_content: "",
      receiver_email: "",
      receiver_phone: "",
      delivery_method: "email",
      date_time: "",
    },
  });

  useEffect(() => {
    document.title = "Memorable Messages | Create Occasion";
  }, []);

  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.date_time = moment(data.date_time).toISOString();
    setIsLoading(true);
    try {
      await MemorableMessagesApi.createOccasion(data);
      setIsLoading(false);
      showToast(
        "Occasion successfully created!",
        "You just made someone's day.",
      );
      navigate("/occasions");
    } catch (err) {
      if (err.statusCode === 400) {
        setIsLoading(false);
        showToast(
          "Unable to create occasion",
          "Please check the occasion details and try again.",
          "destructive",
        );
      } else {
        showToast(
          "Uh oh! Something went wrong",
          "There was a problem with your request.",
          "destructive",
        );
      }
    }
  };

  return (
    <div className="create-occasion mt-6">
      <h1 className="mb-6 text-3xl font-bold">Create Occasion</h1>

      {/* Create Occasion form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="occasion_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occasion Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message_content"
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
            name="receiver_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiver_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reciever Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Delivery method</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery date and time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading && <Loader2 className="mr-3 size-5 animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateOccasion;
