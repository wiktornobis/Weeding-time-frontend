import {Box, IconButton} from "@mui/material";
// import { ColorModeContext, tokens } from "../../theme";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    // const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            {/* ICONS */}
            <Box display="flex">
                {/*<IconButton onClick={colorMode.toggleColorMode}>*/}
                {/*    {theme.palette.mode === "dark" ? (*/}
                {/*        <DarkModeOutlinedIcon />*/}
                {/*    ) : (*/}
                {/*        <LightModeOutlinedIcon />*/}
                {/*    )}*/}
                {/*</IconButton>*/}

                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;