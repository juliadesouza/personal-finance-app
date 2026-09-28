import { useContext, createContext } from "react";
import type { User } from "@/services/auth-service";

export const AUTH_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  ERROR: "error",
} as const;

export type AuthContextValue = {
  status: string;
  user: User | null;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
