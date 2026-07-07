import { useContext } from "react";
import AuthContext from "../context/authContext.jsx";
export const useAuth = () => {
  if (!AuthContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const context = useContext(AuthContext);
  return context;
};
