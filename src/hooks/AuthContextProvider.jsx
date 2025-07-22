import { useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
  const logoutTimer = useRef();

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
    setTokenExpirationTime(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");

    // ✅ Clear the timer on logout
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer.current);
    }
  }, [token, logout, tokenExpirationTime]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.expiration &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
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
