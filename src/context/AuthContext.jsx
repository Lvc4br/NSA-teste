import React, { createContext, useContext, useState } from "react";
import { student, teacher } from "../services/mock/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (sessionStorage.getItem("nsa2-logged-out") === "true") {
      return null;
    }

    return sessionStorage.getItem("nsa2-role") === "Professor"
      ? teacher
      : { ...student, role: "Aluno" };
  });

  function logIn(role = "Aluno") {
    sessionStorage.removeItem("nsa2-logged-out");
    sessionStorage.setItem("nsa2-role", role);
    setUser(role === "Professor" ? teacher : { ...student, role: "Aluno" });
  }

  function logOut() {
    sessionStorage.setItem("nsa2-logged-out", "true");
    sessionStorage.removeItem("nsa2-role");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}