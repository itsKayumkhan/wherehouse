"use client";
// TODO: Handle the localStorage problem
import { LogedUser } from "@/types/user";
import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the type for the context value
interface AuthContextType {
  user: LogedUser;
  setUser: React.Dispatch<React.SetStateAction<LogedUser>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  getData: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LogedUser>({
    email: "",
    isAdmin: false,
    name: "",
    _id: "",
  });
  const [token, setToken] = useState<string>("");

  const getData = () => {
    console.log("first");
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved from localStorage:", storedToken, storedUser);
    setUser(storedUser ? JSON.parse(storedUser) : {});
    setToken(storedToken || "");
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, token, setToken, getData }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
