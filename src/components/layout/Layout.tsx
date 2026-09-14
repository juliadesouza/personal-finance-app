import { useAuth, AUTH_STATUS } from "@/providers/auth/auth-context";
import { Navigate, Outlet } from "react-router";

export function Layout() {
  const { status } = useAuth();

  if (status === AUTH_STATUS.LOADING) return null;
  if (status === AUTH_STATUS.ERROR) return <Navigate to="/" replace />;
  return (
    <main>
      <Outlet />
    </main>
  );
}
