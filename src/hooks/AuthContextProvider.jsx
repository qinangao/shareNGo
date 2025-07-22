import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ userId, token: token }));
    setUserId(userId);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
