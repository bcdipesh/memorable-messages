import { useEffect, useMemo, useState } from "react";

import AuthContext from "@/contexts/authContext/AuthContext";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";

/**
 * AuthProvider component manages authentication state and provides it to child components.
 *
 * This component is responsible for handling user login, logout, and managing the auth context
 * with relevant information like token and username. It also syncs state with local storage
 * for persistence.
 *
 * @param {object} children Child components to be provided with auth context.
 * @returns {React.JSX.Element} AuthContext provider with auth context value.
 */
const AuthProvider = ({ children }) => {
  // Track tokens and username from local storage and API
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  // Sync token and username with local storage whenever they change
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    MemorableMessagesApi.token = token;
  }, [token, username]);

  /**
   * Handles user login by calling the MemorableMessagesApi and updating local state.
   *
   * @param {string} username The username for login.
   * @param {string} password The password for login.
   */
  const handleLogin = async (username, password) => {
    setToken(await MemorableMessagesApi.login(username, password));
    setUsername(username);
  };

  /**
   * Handles user logout by clearing local storage and state.
   */
  const handleLogout = async () => {
    setToken("");
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  // Create auth context value object with relevant data
  const authContextValue = useMemo(
    () => ({
      token,
      username,
      handleLogin,
      handleLogout,
    }),
    [token, username],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
