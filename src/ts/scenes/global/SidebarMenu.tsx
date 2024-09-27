import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Box,
    Typography,
    Collapse
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SidebarMenu: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("Dashboard");
    const [openDashboardSubmenu, setOpenDashboardSubmenu] = useState<boolean>(false);

    const handleDashboardClick = () => {
        setOpenDashboardSubmenu(!openDashboardSubmenu);
    };

    const menuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <HomeOutlinedIcon />,
            submenu: [
                { title: "Dashboard 1", to: "/dashboard1" },
                { title: "Dashboard 2", to: "/dashboard2" }
            ]
        },
        { title: "Manage Team", to: "/team", icon: <PeopleOutlinedIcon /> },
        { title: "Contacts Information", to: "/contacts", icon: <ContactsOutlinedIcon /> },
        { title: "Invoices Balances", to: "/invoices", icon: <ReceiptOutlinedIcon /> }
    ];

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
                        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`../../assets/user.png`}
                                style={{ borderRadius: "50%" }}
                            />
                            <Typography variant="h6" mt={1}>
                                Ed Roh
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                VP Fancy Admin
                            </Typography>
                        </Box>
                    )}
                </Box>

                <List>
                    {/* Dashboard with Submenu */}
                    <ListItem
                        button
                        onClick={handleDashboardClick}
                        sx={{
                            padding: isCollapsed ? "8px" : "16px",
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            transition: "all 0.3s",
                        }}
                    >
                        <ListItemIcon sx={{ justifyContent: "center" }}>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        {!isCollapsed && (
                            <>
                                <ListItemText primary="Dashboard" />
                                {openDashboardSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </>
                        )}
                    </ListItem>

                    {/* Dashboard Submenu */}
                    <Collapse in={openDashboardSubmenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {menuItems[0].submenu?.map((subItem) => (
                                <ListItem
                                    button
                                    key={subItem.title}
                                    component={Link}
                                    to={subItem.to}
                                    selected={selected === subItem.title}
                                    onClick={() => setSelected(subItem.title)}
                                    sx={{ pl: isCollapsed ? "16px" : "32px" }}  // Padding to the left for nested items
                                >
                                    <ListItemText primary={subItem.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>

                    {/* Other Menu Items */}
                    {menuItems.slice(1).map((item) => (
                        <ListItem
                            button
                            key={item.title}
                            component={Link}
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

            {/* Main Content */}

        </Box>
    );
};

export default SidebarMenu;
