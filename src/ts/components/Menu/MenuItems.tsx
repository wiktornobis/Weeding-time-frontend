import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

const menuItems = [
    // {
    //     title: "Home",
    //     to: "/",
    //     icon: <HomeOutlinedIcon />,
    //     // submenu: [
    //     //     { title: "Dashboard 1", to: "/dashboard1" },
    //     //     { title: "Dashboard 2", to: "/dashboard2" }
    //     // ]
    // },
    { title: "Home", to: "/", icon: <HomeOutlinedIcon style={{ color: "white"}} /> },
    { title: "Lista Gości", to: "/goscie", icon: <ListAltOutlinedIcon style={{ color: "white"}}  /> },
    { title: "Kalendarz", to: "/kalendarz", icon: <CalendarMonthOutlinedIcon /> },
    { title: "Planer stołów", to: "/planer-stolow", icon: <TableBarOutlinedIcon /> },
    { title: "Pliki do pobrania", to: "/pliki-do-pobrania", icon: <SimCardDownloadOutlinedIcon /> }
];

export default menuItems;