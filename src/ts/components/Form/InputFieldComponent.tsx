import { TextField, InputAdornment, Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from "react";

type InputFieldProps = {
    label: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText: string | undefined;
    showPassword?: boolean;
    register: any;
    name: string;
    togglePasswordVisibility?: () => void;
};

const InputFieldComponent = ({
        label,
        type,
        value,
        onChange,
        error,
        helperText,
        showPassword = false,
        register,
        name,
        togglePasswordVisibility,
    }: InputFieldProps) => {
    return (
        <TextField
            label={label}
            type={showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            {...register(name)}
            error={error}
            helperText={helperText}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={
                togglePasswordVisibility
                    ? {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={togglePasswordVisibility}>
                                    {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                </Button>
                            </InputAdornment>
                        ),
                    }
                    : undefined
            }
        />
    );
};

export default InputFieldComponent;
