import "@/style/components/form/loginForm.scss";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, TextField } from '@mui/material';
import { fetchTokenGuest } from "@/api/LoginGuest/fetchers";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store.ts";
import { login } from "@/redux/reducers/user/user-slice.ts";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { formLoginGuestSchema } from "@/ts/views/LoginGuest/FormLoginGuestSchema.ts";
import { useState } from "react";

// Define form schema type
type FormValues = z.infer<typeof formLoginGuestSchema>;

export default function LoginFormGuest() {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formLoginGuestSchema),
    });

    // Set up useMutation for login
    const mutation = useMutation(
        (data: FormValues) => fetchTokenGuest(data.firstName, data.lastName, data.accessCode),
        {
            onSuccess: (tokenData) => {
                dispatch(login(tokenData));
                navigate("/");
            },
            onError: (error: any) => {
                setApiError(error.message);
            },
        }
    );

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit} className="login_form">
            <h2>Logowanie</h2>

            <TextField
                label="Imię"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Nazwisko"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Kod dostępu"
                {...register("accessCode")}
                error={!!errors.accessCode}
                helperText={errors.accessCode?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            {apiError && <p className="err-msg">{apiError}</p>}

            <Button className="btn-login" type="submit" variant="contained">
                {mutation.isLoading ? <CircularProgress size={24} color="inherit"/> : 'Zaloguj się'}
            </Button>

            <h4>Zaloguj się jako organizator wesela</h4>
            <a href="/logowanie-organizator">Zaloguj się</a>

        </form>
    );
}
