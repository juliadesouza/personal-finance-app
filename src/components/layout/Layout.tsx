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
      <main className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full gap-4 pl-2 pr-8 py-4">
            <SidebarTrigger className="cursor-pointer" />
            <div className="min-w-0 flex-1 pb-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
