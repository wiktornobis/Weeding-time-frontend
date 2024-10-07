import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import { RoleAccount } from "@/api/Account/types.ts";  // Import roli

// Definiowanie menu z dopuszczalnymi rolami
const menuItems = [
    // Routes dla wszystkich role
    {
        title: "Home",
        to: "/",
        icon: <HomeOutlinedIcon />,
        allowedRoles: [RoleAccount.Admin, RoleAccount.Groom, RoleAccount.Bride, RoleAccount.Witness, RoleAccount.Guest, RoleAccount.Other]  // Wszyscy mają dostęp
    },
    {
        title: "Lista Gości",
        to: "/goscie",
        icon: <ListAltOutlinedIcon />,
        allowedRoles: [RoleAccount.Admin, RoleAccount.Groom, RoleAccount.Bride, RoleAccount.Witness, RoleAccount.Guest, RoleAccount.Other]
    },
    {
        title: "Kalendarz",
        to: "/kalendarz",
        icon: <CalendarMonthOutlinedIcon />,
        allowedRoles: [RoleAccount.Admin, RoleAccount.Groom, RoleAccount.Bride, RoleAccount.Witness, RoleAccount.Guest, RoleAccount.Other]
    },
    {
        title: "Planer stołów",
        to: "/planer-stolow",
        icon: <TableBarOutlinedIcon />,
        allowedRoles: [RoleAccount.Admin, RoleAccount.Groom, RoleAccount.Bride, RoleAccount.Witness, RoleAccount.Guest, RoleAccount.Other]
    },
    // Routes dla zewnętrznych role
    {
        title: "Pliki do pobrania",
        to: "/pliki-do-pobrania",
        icon: <SimCardDownloadOutlinedIcon />,
        allowedRoles: [RoleAccount.Admin, RoleAccount.Groom, RoleAccount.Bride]
    }
];

export default menuItems;
