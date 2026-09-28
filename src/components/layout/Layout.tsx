import { useAuth, AUTH_STATUS } from "@/providers/auth/auth-context";
import { Navigate, Outlet } from "react-router";
import { AppHeader } from "../common/AppHeader";
import { AppSidebar } from "../common/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function Layout() {
  const { status, user } = useAuth();

  if (status === AUTH_STATUS.LOADING) return null;
  if (status === AUTH_STATUS.ERROR) return <Navigate to="/" replace />;

  return (  
    <SidebarProvider>
    <main className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex w-full px-2 pt-4">
        <SidebarTrigger />
        <div className="flex flex-col flex-1 gap-4 w-full px-4">
        <AppHeader user={user!} />
        <Outlet />
        </div>
      </div>
    </main>
    </SidebarProvider>
  );
}
