import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from 'react';

type SelectFieldComponentProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void; // Typowanie, żeby było string
    error: boolean;
    helperText: string | undefined;
    register: any;
    name: string;
    options: { value: string; label: string }[];
};

const SelectFieldComponent = ({
          label,
          value,
          onChange,
          error,
          helperText,
          options,
          register,
          name,
      }: SelectFieldComponentProps) => {
    return (
        <FormControl fullWidth margin="normal" error={error}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange} // Obsługujemy zmianę
                label={label}
                {...register(name)}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <span className="error-message">{helperText}</span>}
        </FormControl>
    );
};

export default SelectFieldComponent;
