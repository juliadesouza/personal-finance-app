import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { Logo } from "./Logo"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <Logo size="lg" />
          <span className="text-xl font-semibold tracking-tight">
            Lúmen
          </span>
        </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }