import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  ReceiptText,
  BanknoteArrowUp,
  Wallet,
  Goal,
  Settings,
  PiggyBank,
} from "lucide-react";
import { AppAvatar } from "./AppAvatar";
import { useNavigate, useLocation } from "react-router";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { open: isOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center mt-3">
            <Logo />
            {isOpen && (
              <span className="text-2xl font-semibold ml-2 text-primary">
                Lúmen
              </span>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/expenses"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/expenses")}
              >
                <ReceiptText />
                <span>Expenses</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/income"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/income")}
              >
                <BanknoteArrowUp />
                <span>Income</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Planning</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/goals"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/goals")}
              >
                <Goal />
                <span>Goals</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/savings"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/savings")}
              >
                <PiggyBank />
                <span>Savings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/wallet"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/wallet")}
              >
                <Wallet />
                <span>Wallet</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/dashboard/settings"}
                className="cursor-pointer"
                onClick={() => navigate("/dashboard/settings")}
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppAvatar collapsed={!isOpen} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
