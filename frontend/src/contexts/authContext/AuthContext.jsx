import { createContext } from "react";

/**
 * AuthContext to manage authentication state across the application.
 *
 * This context provides access to user authentication information such as token and username.
 * It also includes a function to handle user logout.
 */
const AuthContext = createContext();

export default AuthContext;
