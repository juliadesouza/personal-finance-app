import type { User } from "@/services/auth-service";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader({ user }: { user: User }) {
  return (
    <header className="flex items-center justify-between">
    <div className="flex flex-col"><h1 className="text-2xl font-bold">Título da página selecionada</h1><p className="text-md text-muted-foreground">Descrição da página selecionada</p></div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer p-2 border border-border rounded-full">
        <Avatar size="lg">
          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-left">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
    </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </header>
  );
}