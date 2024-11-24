import { TextField } from "@mui/material";
import React from "react";

type AccessCodeFieldComponentProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText: string | undefined;
    register: any;
    name: string
};

const AccessCodeFieldComponent = ({ value, onChange, error, helperText, register, name }: AccessCodeFieldComponentProps) => {
    return (
        <TextField
            label="Kod dostępu"
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            sx={{
                "& .MuiInputBase-input": {
                    textTransform: "uppercase",
                },
            }}
            {...register(name)}
        />
    );
};

export default AccessCodeFieldComponent;
