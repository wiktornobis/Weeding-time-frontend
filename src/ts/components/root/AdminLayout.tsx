import SidebarMenu from "@/ts/components/Menu/SidebarMenu";
import Topbar from "@/ts/components/Menu/Topbar";
import { useState } from "react";
import { RoleAccount } from "@/api/Account/types.ts";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    let userRole = RoleAccount.Admin;

    return (
        <div className="app">
            <SidebarMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} userRole={userRole} />
            <main className="content">
                <Topbar setIsCollapsed={setIsCollapsed} />
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
