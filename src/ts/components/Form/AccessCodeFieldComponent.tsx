import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type AccessCodeFieldComponentProps = {
    control: any;
    name: string;
    error: boolean;
    helperText: string | undefined;
};

const AccessCodeFieldComponent = ({ control, name, error, helperText,}: AccessCodeFieldComponentProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Kod dostępu"
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
                />
            )}
        />
    );
};

export default AccessCodeFieldComponent;
