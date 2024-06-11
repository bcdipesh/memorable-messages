import { z } from "zod";

export const formSchema = z.object({
  user_id: z.string().min(1, "Invalid User ID."),
  occasion_type: z.string().min(1, "Please provide a occasion type."),
  receiver_email: z.string().email("Please provide a valid email address."),
  delivery_method: z.string().min(1, "Invalid Delivery Method."),
  delivery_date: z.coerce.date(),
  message: z.string().min(1, "Please provide a message you wish to send."),
  created_at: z.coerce.date(),
});
