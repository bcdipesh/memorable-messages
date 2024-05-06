import { z } from "zod";

export const formSchema = z.object({
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
