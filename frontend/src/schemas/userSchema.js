import * as yup from "yup";

/**
 * Defines the schema for user
 *
 * @returns {Object} A yup schema object
 */
const userSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

export default userSchema;
