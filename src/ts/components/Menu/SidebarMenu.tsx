import { useState } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { SidebarMenuProps } from "@/ts/interfaces/SidebarMenu.ts";
import { ConditionalRender, isMobile } from "@/ts/helpers/Functions.tsx";
import menuItems from "@/ts/components/Menu/MenuItems.tsx";
import User from "@/ts/components/Menu/User.tsx";

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isCollapsed, setIsCollapsed, userRole }) => {
    const [selected, setSelected] = useState<string>("Home");
    const mobile = isMobile();

    const filteredMenuItems = menuItems.filter(item => item.allowedRoles.includes(userRole));

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant={mobile ? "temporary" : "permanent"}
                open={!isCollapsed}
                onClose={() => setIsCollapsed(true)} // Na mobile zamyka menu po kliknięciu poza nim
                sx={{
                    width: isCollapsed ? 60 : 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: isCollapsed ? 60 : { xs: '100%', sm: 240 },
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                    },
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <ConditionalRender condition={isCollapsed} falseCondition={<CloseIcon />}>
                            <MenuOutlinedIcon />
                        </ConditionalRender>
                    </IconButton>

                    <ConditionalRender condition={!isCollapsed && !mobile}>
                        <User />
                    </ConditionalRender>
                </Box>

                <List className="sidebar_menu">
                    {filteredMenuItems.map((item) => (
                        <ListItem
                            key={item.title}
                            component={Link as any}
                            to={item.to}
                            selected={selected === item.title}
                            className={selected === item.title ? "active" : ""}
                            onClick={() => {
                                setSelected(item.title);
                                if (mobile) setIsCollapsed(true); // Zamyka menu na mobile po kliknięciu
                            }}
                            sx={{
                                padding: isCollapsed ? "8px" : "16px",
                                justifyContent: isCollapsed ? "center" : "flex-start",
                                transition: "all 0.3s",
                            }}
                        >
                            <ListItemIcon sx={{ justifyContent: "center" }}>
                                {item.icon}
                            </ListItemIcon>
                            {!isCollapsed && <ListItemText primary={item.title} />}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default SidebarMenu;
