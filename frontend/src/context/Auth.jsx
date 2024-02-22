import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem("auth");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const storedUser = localStorage.getItem("auth");
      if (storedUser) {
        setAuth(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={[auth, setAuth]}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
