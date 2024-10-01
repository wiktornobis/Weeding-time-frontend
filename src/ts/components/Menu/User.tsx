import {Box, Typography} from "@mui/material";
import "@/style/Nav.scss";

const User = () => {
    return (
        <>
            <div className="user_menu">
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <img
                        alt="profile-user"
                        width="100px"
                        height="100px"
                        src={`../../assets/user.png`}
                        style={{ borderRadius: "50%" }}
                    />
                    <Typography variant="h6" mt={1}>
                        Wiktor Nobis i Wiktoria Bronowska
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Para młoda
                    </Typography>
                </Box>
            </div>
        </>
    );
};

export default User;