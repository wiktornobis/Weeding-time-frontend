import {useState} from "react";
import {Link} from "react-router-dom";
import {Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import menuItems from "@/ts/components/Menu/MenuItems.tsx";
import User from "@/ts/components/Menu/User.tsx";

const SidebarMenu: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("Home");

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                open={!isCollapsed}
                sx={{
                    width: isCollapsed ? 60 : 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: isCollapsed ? 60 : 240,
                        boxSizing: "border-box",
                        transition: "width 0.3s",
                    },
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcon />
                    </IconButton>
                    {!isCollapsed && (
                        <User />
                    )}
                </Box>

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.title}
                            component={Link as any}
                            to={item.to}
                            selected={selected === item.title}
                            onClick={() => setSelected(item.title)}
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