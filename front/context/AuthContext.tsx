"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession, logout } from "@/utils/jwt";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      setIsLogged(!!session);
    }
    checkSession();
  }, []);

  const logoutUser = async () => {
    await logout();
    setIsLogged(false);
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
