import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Import schema for form validation
import createOccasionSchema from "@/schemas/createOccasionSchema";

// Import yupResolver for integrating Yup validation
import { yupResolver } from "@hookform/resolvers/yup";
// Import loader component for loading state
import { Loader2 } from "lucide-react";
// Import Moment.js for date/time manipulation
import moment from "moment";

// Import API client for communicating with the backend
import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
// Import custom UI components
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

/**
 * CreateOccasion component renders a form for creating new occasions.
 * It handles form submission, validation, API calls, and user feedback.
 *
 * @returns {React.JSX.Element} CreateOccasion component UI.
 */
const CreateOccasion = () => {
  // Access the navigate function for routing
  const navigate = useNavigate();

  // Access the toast function for displaying notifications
  const { toast } = useToast();

  // Manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation and default values
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
    // Set the page title
    document.title = "Memorable Messages | Create Occasion";
  }, []);

  /**
   * Display a toast notification with optional variant
   * @param title - Title of the notification
   * @param description - Description of the notification
   * @param variant - Optional variant (default, success, destructive)
   */
  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  /**
   * Handle form submission
   * @param data - Form data
   * @param e - Event object
   */
  const onSubmit = async (data, e) => {
    e.preventDefault();

    // Format date_time for API request
    data.date_time = moment(data.date_time).toISOString();
    setIsLoading(true);

    try {
      // Send request to create occasion
      await MemorableMessagesApi.createOccasion(data);
      setIsLoading(false);

      // Display success toast and navigate to occasions list
      showToast(
        "Occasion successfully created!",
        "You just made someone's day.",
      );
      navigate("/occasions");
    } catch (err) {
      setIsLoading(false);

      if (err.statusCode === 400) {
        // Handle validation errors
        showToast(
          "Unable to create occasion",
          "Please check the occasion details and try again.",
          "destructive",
        );
      } else {
        // Handle other errors
        showToast(
          "Uh oh! Something went wrong",
          "There was a problem with your request.",
          "destructive",
        );
      }
    }
  };

  // Render the main container for the Create Occasion form
  return (
    <div className="create-occasion mt-6">
      {/* Display the page heading */}
      <h1 className="mb-6 text-3xl font-bold">Create Occasion</h1>

      {/* Render the form using custom form components */}
      <Form {...form}>
        {/* Render the HTML form element with React Hook Form integration */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Occasion Type field with label, input, and message area */}
          <FormField
            control={form.control}
            name="occasion_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occasion Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* Displays any validation errors or messages */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Content field using a textarea for longer input */}
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

          {/* Receiver Email field with email input type */}
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

          {/* Receiver Phone field */}
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

          {/* Delivery Method field */}
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

          {/* Delivery Date and Time field using datetime-local input type */}
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

          {/* Submit button with loading indicator */}
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
