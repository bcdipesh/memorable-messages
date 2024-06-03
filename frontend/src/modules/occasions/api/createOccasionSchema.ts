import { z } from "zod";

export const formSchema = z.object({
  occasion_type: z.string().min(1, "Please provide a occasion type."),
  receiver_email: z.string().email("Please provide a valid email address."),
  delivery_method: z.string().min(1, "Invalid Delivery Method."),
  delivery_date: z
    .string()
    .date("Please provide a valid date in YYYY-MM-DD format.")
    .or(z.date().transform((val) => val.toISOString().split("T")[0])),
  message: z.string().min(1, "Please provide a message you wish to send."),
  created_at: z.string().date("Invalid date for Create At."),
});
