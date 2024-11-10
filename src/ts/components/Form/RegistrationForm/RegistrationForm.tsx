import { useState, useEffect } from "react";
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
    InputLabel, SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formRegistrationSchema } from "@/ts/views/Registration/FormRegistrationSchema.ts";
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchRegistration } from "@/api/Registration/fetchers";
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
    const [selectedRole, setSelectedRole] = useState('');
    const [accessCode, setAccessCode] = useState('');

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
        setSelectedRole(event.target.value);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roleFromParam = params.get('role');
        const accessCodeParam = params.get('accessCode');

        accessCodeParam ? setAccessCode(accessCodeParam) : setAccessCode('');

        if (roleFromParam) {
            const matchedRole = roles.find(r => r.value === roleFromParam);
            if (matchedRole) {
                setSelectedRole(matchedRole.value);
            }
        }
    }, []);

    const accessCodeRequired = !["Pan Młody", "Panna Młoda"].includes(selectedRole);

    const mutation = useMutation(
        (data: FormValues) => fetchRegistration(data.firstName, data.lastName, data.email, data?.tel, data.password, data.weddingDate, data?.accessCode),
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
        <form onSubmit={onSubmit} className="registration_form">
            <h2>Rejestracja</h2>

            <TextField
                label="Imię"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Nazwisko"
                required
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Email"
                required
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Telefon"
                type="tel"
                {...register("tel")}
                error={!!errors.tel}
                helperText={errors.tel?.message}
                variant="outlined"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Hasło"
                required
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

            <TextField
                label="Powtórz hasło"
                required
                type={showRepeatPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
                margin="normal"
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
            <FormControl fullWidth>
                <InputLabel id="role-select-label">Twoja rola na weselu</InputLabel>
                <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={selectedRole}
                    onChange={handleChange}
                    label="Twoja rola na weselu"
                >
                    {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                            {role.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {!accessCodeRequired && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="data-picker"
                        label="Data Ślubu"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        minDate={value ?? undefined}
                    />
                </LocalizationProvider>
            )}

            {accessCodeRequired && (
                <TextField
                    label="Kod dostępu"
                    {...register("accessCode")}
                    error={!!errors.accessCode}
                    helperText={errors.accessCode?.message}
                    value={accessCode}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={(e) => setAccessCode(e.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            textTransform: 'uppercase',
                        },
                    }}
                />
            )}

            {mutation.isError && (
                <p className="err-msg">Nieprawidłowy login lub hasło.</p>
            )}

            <Button className="btn-login" type="submit" variant="contained">
                {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : 'Zarejestruj się'}
            </Button>
        </form>
    );
}
