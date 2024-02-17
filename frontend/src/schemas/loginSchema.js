import * as yup from "yup";

/**
 * Defines the schema for login
 *
 * @returns {Object} A yup schema object
 */
const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default loginSchema;
