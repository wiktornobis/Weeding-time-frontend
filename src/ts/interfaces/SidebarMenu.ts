import { RoleAccount } from "@/api/Account/types.ts";

export interface SidebarMenuProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    userRole: RoleAccount;
}
