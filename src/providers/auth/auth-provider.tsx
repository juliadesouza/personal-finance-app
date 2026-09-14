import { handleLogout, handleRefresh } from "@/services/auth-service";
import {
  AUTH_STATUS,
  AuthContext,
  type AuthContextValue,
} from "./auth-context";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(AUTH_STATUS.LOADING);

  useEffect(() => {
    let cancelled = false;

    handleRefresh()
      .then(() => {
        if (!cancelled) setStatus(AUTH_STATUS.AUTHENTICATED);
      })
      .catch(() => {
        if (!cancelled) setStatus(AUTH_STATUS.ERROR);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, handleLogout }),
    [status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
