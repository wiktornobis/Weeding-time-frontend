import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined, MenuOutlined } from "@mui/icons-material";
import { toggleColorMode } from "@/redux/reducers/colorMode/colorModeSlice.ts";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { TopbarProps } from "@/ts/interfaces/Topbar.ts";
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { isMobile } from "@/ts/helpers/Functions.ts";

const Topbar: React.FC<TopbarProps> = ({ setIsCollapsed }) => {
    const colorMode = useAppSelector(state => state.colorMode.mode);
    const dispatch = useAppDispatch();
    const mobile = isMobile();

    return (
        <div className="topbar">
            <Box display="flex" justifyContent="space-between" p={1}>
                {mobile && (
                    <IconButton onClick={() => setIsCollapsed(prev => !prev)}>
                        <MenuOutlined />
                    </IconButton>
                )}
                {/* Right-side Icons */}
                <Box display="flex">
                    <IconButton onClick={() => dispatch(toggleColorMode())}>
                        {colorMode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
                    </IconButton>
                    <Link to="/moje-konto">
                        <IconButton>
                            <PersonOutlinedIcon />
                        </IconButton>
                    </Link>
                </Box>
            </Box>
        </div>
    );
};

export default Topbar;
