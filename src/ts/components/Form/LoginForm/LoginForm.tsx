import "@/style/components/form/loginForm.scss";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, InputAdornment } from '@mui/material';
import { formLoginSchema } from "@/ts/views/Login/FormLoginSchema.ts";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Zdefiniowanie typu formularza na podstawie schematu zod
type FormValues = z.infer<typeof formLoginSchema>;

export default function App() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formLoginSchema),
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <form onSubmit={onSubmit} className="login_form">
            {/* Pole Email */}
            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Password"
                type={showPassword ? "text" : "password"}  // Ustawienie typu pola hasła
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={togglePasswordVisibility}>
                                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />

            <Button type="submit" variant="contained" color="primary">Zaloguj się</Button>
        </form>
    );
}
