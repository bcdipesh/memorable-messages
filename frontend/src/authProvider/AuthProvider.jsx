import { useEffect, useMemo, useState } from "react";

import AuthContext from "@/contexts/authContext/AuthContext";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    // Sync token with localstorage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    MemorableMessagesApi.token = token;
  }, [token, username]);

  const handleLogin = async (username, password) => {
    setToken(await MemorableMessagesApi.login(username, password));
    setUsername(username);
  };

  const handleLogout = async () => {
    setToken("");
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

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
