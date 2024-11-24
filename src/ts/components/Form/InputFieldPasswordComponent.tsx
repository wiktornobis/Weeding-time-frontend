import { useState } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type InputFieldPasswordComponentProps = {
    label: string;
    error: boolean;
    helperText: string | undefined;
    register: any;
    name: string;
    discoverPassword?: boolean;
};

const InputFieldPasswordComponent = ({ label, error, helperText, register, name, discoverPassword = false,}: InputFieldPasswordComponentProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <TextField
            label={label}
            type={showPassword ? "text" : "password"}
            {...register(name)}
            error={error}
            helperText={helperText}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
                endAdornment: discoverPassword ? (
                    <InputAdornment position="end">
                        <Button onClick={togglePasswordVisibility}>
                            {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                        </Button>
                    </InputAdornment>
                ) : undefined,
            }}
        />
    );
};

export default InputFieldPasswordComponent;
