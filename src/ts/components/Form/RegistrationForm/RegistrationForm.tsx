import "@/style/components/form/loginForm.scss";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formRegistrationSchema } from "@/ts/views/Registration/FormRegistrationSchema.ts";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchToken } from "@/api/User/fetchers";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store.ts";
import { login } from "@/redux/reducers/user/user-slice.ts";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import dayjs, { Dayjs } from 'dayjs';

type FormValues = z.infer<typeof formRegistrationSchema>;

export default function RegistrationForm() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [role, setRole] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formRegistrationSchema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };
    const roles = [
        { value: "Panna Młoda", label: "Panna Młoda" },
        { value: "Pan Młody", label: "Pan Młody" },
        { value: "Gość", label: "Gość" },
        { value: "Świadkowa", label: "Świadkowa" },
        { value: "Świadek", label: "Świadek" },
    ];
    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className="data-picker"
                label="Data Ślubu"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                minDate={value ?? undefined}
            />
            </LocalizationProvider>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rola</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Rola"
                    onChange={handleChange}
                >
                    {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                            {role.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {mutation.isError && (
                <p className="err-msg">Nieprawidłowy login lub hasło.</p>
            )}

            <Button className="btn-login" type="submit" variant="contained">
                {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : 'Zarejestruj się'}
            </Button>

        </form>
    );
}
