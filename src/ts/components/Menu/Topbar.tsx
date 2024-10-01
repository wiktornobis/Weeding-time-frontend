import {Box, IconButton} from "@mui/material";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from '@/redux/hooks.ts';
import {toggleColorMode} from "@/redux/reducers/colorMode/colorModeSlice.ts";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {Link} from "react-router-dom";

const Topbar = () => {
    const colorMode = useAppSelector(state => state.colorMode.mode);
    const dispatch = useAppDispatch();

    return (
        <div className="topbar">
            <Box display="flex" justifyContent="flex-end" p={2}>
                {/* ICONS */}
                <Box display="flex">
                    <IconButton onClick={() => dispatch(toggleColorMode())}>
                        {colorMode === "dark" ? (
                            <DarkModeOutlined />
                        ) : (
                            <LightModeOutlined />
                        )}
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
