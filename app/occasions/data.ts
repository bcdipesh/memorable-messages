export type Occasion = {
  id: string;
  title: string;
  status: "pending" | "processing" | "success" | "failed";
  receiverEmail: string;
  deliveryMethod: "email" | "sms";
  deliveryDateAndTime: string;
  createdAt: string;
};

export const data: Occasion[] = [
  {
    id: "m5gr84i9",
    title: "anniversary",
    status: "success",
    receiverEmail: "ken99@yahoo.com",
    deliveryMethod: "email",
    deliveryDateAndTime: "2024/03/03",
    createdAt: "2024/03/03",
  },
  {
    id: "3u1reuv4",
    title: "anniversary",
    status: "success",
    receiverEmail: "Abe45@gmail.com",
    deliveryMethod: "email",
    deliveryDateAndTime: "2024/03/03",
    createdAt: "2024/03/03",
  },
  {
    id: "derv1ws0",
    title: "anniversary",
    status: "processing",
    receiverEmail: "Monserrat44@gmail.com",
    deliveryMethod: "email",
    deliveryDateAndTime: "2024/03/03",
    createdAt: "2024/03/03",
  },
  {
    id: "5kma53ae",
    title: "anniversary",
    status: "success",
    receiverEmail: "Silas22@gmail.com",
    deliveryMethod: "email",
    deliveryDateAndTime: "2024/03/03",
    createdAt: "2024/03/03",
  },
  {
    id: "bhqecj4p",
    title: "anniversary",
    status: "failed",
    receiverEmail: "carmella@hotmail.com",
    deliveryMethod: "email",
    deliveryDateAndTime: "2024/03/03",
    createdAt: "2024/03/03",
  },
];
