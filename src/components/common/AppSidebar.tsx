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
  } from "@/components/ui/sidebar"
import { Logo } from "./Logo"
import { LayoutDashboard, BanknoteArrowDown, BanknoteArrowUp, Wallet, Goal, PiggyBank, ChartColumn, LogOut } from "lucide-react"
import { AppAvatar } from "./AppAvatar";


  
  export function AppSidebar() {
    const { open: isOpen } = useSidebar();
    return (
      <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
        <SidebarMenuItem><Logo />{isOpen && <span className="text-2xl font-bold ml-2">Lúmen</span>}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      <SidebarGroup>
      <SidebarGroupLabel>Transactions</SidebarGroupLabel>
          <SidebarMenu>   
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <BanknoteArrowDown />
                <span>Expenses</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <BanknoteArrowUp />
                <span>Incomes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <PiggyBank />
                <span>Investments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
      <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarMenu>   
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Goal />
                <span>Goals</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Wallet />
                <span>Wallet</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                < ChartColumn />
                <span>Charts</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
          <AppAvatar/>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
    )
  }