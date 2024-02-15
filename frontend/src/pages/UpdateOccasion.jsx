import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "@/contexts/authContext/AuthContext";

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

const UpdateOccasion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(createOccasionSchema),
    defaultValues: {
      occasion_type: "",
      message_content: "",
      receiver_email: "",
      receiver_phone: "",
      delivery_method: "",
      date_time: moment().format("YYYY-MM-DDTHH:mm"),
    },
  });

  useEffect(() => {
    document.title = "Memorable Messages | Update Occasion";

    const getOccasion = async () => {
      setIsLoading(true);
      try {
        const occasion = await MemorableMessagesApi.getOccasionById(id);
        occasion.date_time = moment(occasion.date_time).format(
          "YYYY-MM-DDTHH:mm",
        );

        form.reset(occasion);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.statusCode === 401) {
          handleLogout();
          showToast(
            "Oops! It seems your session has expired.",
            "Please log back in using your username and password and try again.",
            "destructive",
          );
        }
      }
    };

    getOccasion();
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
      showToast("Occasion successfully updated!", "You can relax now.");
      navigate("/occasions");
    } catch (err) {
      if (err.statusCode === 400) {
        setIsLoading(false);
        showToast(
          "Unable to update occasion",
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
      <h1 className="mb-6 text-3xl font-bold">Update Occasion</h1>

      {isLoading && (
        <span className="flex w-full items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-1 size-5 animate-spin" /> Loading ...
        </span>
      )}

      {!isLoading && (
        // Update occasion form
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
              Update
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateOccasion;
