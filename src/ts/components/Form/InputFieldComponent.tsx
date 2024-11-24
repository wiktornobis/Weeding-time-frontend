import { TextField } from "@mui/material";
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
};

const InputFieldComponent = ({label, type, value, onChange, error, helperText, showPassword = false, register, name,}: InputFieldProps) => {
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
        />
    );
};

export default InputFieldComponent;
