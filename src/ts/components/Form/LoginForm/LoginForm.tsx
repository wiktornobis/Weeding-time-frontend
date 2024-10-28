import "@/style/components/form/loginForm.scss";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, InputAdornment, CircularProgress } from '@mui/material';
import { formLoginSchema } from "@/ts/views/Login/FormLoginSchema.ts";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchToken } from "@/api/User/fetchers";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store.ts";
import { login } from "@/redux/reducers/user/user-slice.ts";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';

// Define form schema type
type FormValues = z.infer<typeof formLoginSchema>;

export default function App() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formLoginSchema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Set up useMutation for login
    const mutation = useMutation(
        (data: FormValues) => fetchToken(data.email, data.password),
        {
            onSuccess: (tokenData) => {
                dispatch(login(tokenData));
                navigate("/");
            },
            onError: (error) => {
                console.error("Login failed:", error);
            }
        }
    );

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit} className="login_form">
            {/* Email Field */}
            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            {/* Password Field */}
            <TextField
                label="Hasło"
                type={showPassword ? "text" : "password"}
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

            {/* Display loading state */}
            {mutation.isLoading && <CircularProgress size={24} />}

            {/* Display error message */}
            {mutation.isError && (
                <span>Nieprawidłowy login lub hasło.</span>
            )}

            {/* Login button */}
            <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
                Zaloguj się
            </Button>
        </form>
    );
}
