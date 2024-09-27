import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

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

export default menuItems;