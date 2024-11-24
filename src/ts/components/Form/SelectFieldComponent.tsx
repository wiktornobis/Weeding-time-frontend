import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

type SelectFieldComponentProps = {
    label: string;
    name: string;
    control: any;
    error: boolean;
    helperText: string | undefined;
    options: { value: string; label: string }[];
};

const SelectFieldComponent = ({ label, name, control, error, helperText, options }: SelectFieldComponentProps) => {
    const labelId = `${name}-label`;

    return (
        <FormControl fullWidth margin="normal" error={error}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select
                        labelId={labelId}
                        id={name}
                        value={value || ''}
                        onChange={onChange}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default SelectFieldComponent;
