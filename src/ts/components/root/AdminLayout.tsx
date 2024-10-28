import SidebarMenu from "@/ts/components/Menu/SidebarMenu";
import Topbar from "@/ts/components/Menu/Topbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { userRole } = useSelector((state: RootState) => state.auth);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

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
