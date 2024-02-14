import * as yup from "yup";

const createOccasionSchema = yup
  .object({
    occasion_type: yup.string().required("Occasion Type is required"),
    message_content: yup.string().required("Message cannot be empty"),
    receiver_email: yup
      .string()
      .email()
      .required("Receiver email address is required"),
    receiver_phone: yup.string(),
    delivery_method: yup.string().required().oneOf(["sms", "email"], {
      sensitiveCase: false,
      message: 'Delivery method must be either "sms" or "email"',
    }),
    date_time: yup.date().required("Delivery date and time is required"),
  })
  .required();

export default createOccasionSchema;
