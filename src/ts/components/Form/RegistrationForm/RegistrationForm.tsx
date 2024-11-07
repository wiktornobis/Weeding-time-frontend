import "@/style/components/form/loginForm.scss";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, InputAdornment, CircularProgress } from '@mui/material';
import { formRegistrationSchema } from "@/ts/views/Registration/FormRegistrationSchema.ts";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchToken } from "@/api/User/fetchers";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store.ts";
import { login } from "@/redux/reducers/user/user-slice.ts";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';

// Define form schema type
type FormValues = z.infer<typeof formRegistrationSchema>;

export default function RegistrationForm() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formRegistrationSchema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    // Set up useMutation for login
    const mutation = useMutation(
        (data: FormValues) => fetchToken(data.email, data.password),
        {
            onSuccess: (tokenData) => {
                dispatch(login(tokenData));
                navigate("/logowanie");
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
            <h2>Rejestracja</h2>

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
                label="Hasło"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
                margin="normal"
                className="white"
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

            <TextField
                label="Powtórz hasło"
                type={showRepeatPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
                margin="normal"
                className="white"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={toggleRepeatPasswordVisibility}>
                                {showRepeatPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />

            {mutation.isError && (
                <p className="err-msg">Nieprawidłowy login lub hasło.</p>
            )}

            <Button className="btn-login" type="submit" variant="contained">
                {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : 'Zarejestruj się'}
            </Button>

        </form>
    );
}
