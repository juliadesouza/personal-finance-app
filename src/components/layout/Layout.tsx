import { useAuth, AUTH_STATUS } from "@/providers/auth/auth-context";
import { Navigate, Outlet } from "react-router";
import { AppSidebar } from "../common/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function Layout() {
  const { status } = useAuth();

  if (status === AUTH_STATUS.LOADING) return null;
  if (status === AUTH_STATUS.ERROR) return <Navigate to="/" replace />;

  return (  
    <SidebarProvider>
    <main className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex w-full px-2 py-4">
        <SidebarTrigger className="cursor-pointer" />
        <Outlet />
      </div>
    </main>
    </SidebarProvider>
  );
}
