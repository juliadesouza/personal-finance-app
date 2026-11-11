import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth/auth-context";
import { cn } from "@/utils/clsx";
import { handleLogout } from "@/services/auth-service";

type AppAvatarProps = {
  collapsed: boolean;
};

export function AppAvatar({ collapsed }: AppAvatarProps) {
  const { user } = useAuth();

  const src = user?.avatarUrl ?? "";
  const name = user?.name?.split(" ")[0] + " " + user?.name?.split(" ")[1];
  const email = user?.email.split("@")[0] ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div
          className={cn(
            !collapsed &&
              "w-full flex items-center gap-2 p-2 border border-border rounded-full hover:bg-background",
            "cursor-pointer",
          )}
        >
          <Avatar>
            <AvatarImage src={src} alt={name} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-left">{name}</span>
              <span className="text-xs text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
                {email}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
