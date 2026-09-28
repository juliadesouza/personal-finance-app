import { getUser, handleLogout, handleRefresh, type User } from "@/services/auth-service";
import {
  AUTH_STATUS,
  AuthContext,
  type AuthContextValue,
} from "./auth-context";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(AUTH_STATUS.LOADING);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
  
    handleRefresh()
      .then(() => getUser())
      .then((user) => {
        if (cancelled) return;
        setUser(user);
        setStatus(AUTH_STATUS.AUTHENTICATED);
      })
      .catch(() => {
        if (!cancelled) setStatus(AUTH_STATUS.ERROR);
      });
  
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if(status === AUTH_STATUS.AUTHENTICATED) {
      getUser().then((user: User) => {
        setUser(user);
      });
    }
  }, [status]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, handleLogout }),
    [status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
