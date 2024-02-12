import * as yup from "yup";

const userSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export default userSchema;
