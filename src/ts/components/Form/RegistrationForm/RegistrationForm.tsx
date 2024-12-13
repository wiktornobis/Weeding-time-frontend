import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress } from "@mui/material";
import { registration } from "@/api/Registration/fetchers";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import { formRegistrationSchema } from "@/ts/views/Registration/FormRegistrationSchema";
import InputFieldComponent from "@/ts/components/Form/InputFieldComponent";
import SelectFieldComponent from "@/ts/components/Form/SelectFieldComponent";
import DataPickerComponent from "@/ts/components/Form/DataPickerComponent";
import AccessCodeFieldComponent from "@/ts/components/Form/AccessCodeFieldComponent";
import InputFieldPasswordComponent from "@/ts/components/Form/InputFieldPasswordComponent";

type FormValues = z.infer<typeof formRegistrationSchema>;

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            role: '',
        },
        resolver: zodResolver(formRegistrationSchema),
    });

    const selectedRole = watch("role");

    const roles = [
        { value: "Panna Młoda", label: "Panna Młoda" },
        { value: "Pan Młody", label: "Pan Młody" },
        { value: "Gość", label: "Gość" },
        { value: "Świadkowa", label: "Świadkowa" },
        { value: "Świadek", label: "Świadek" },
    ];

    const accessCodeRequired = !["Pan Młody", "Panna Młoda"].includes(selectedRole);

    const mutation = useMutation(
        (data: FormValues) =>
            registration(
                data.firstName,
                data.lastName,
                data.email,
                data.phoneNumber,
                data.password,
                data.role,
                data.weddingDate as Date,
            ),
        {
            onSuccess: () => {
                setApiError(null);
                navigate("/logowanie");
            },
            onError: (error: any) => {
                setApiError(error.message);
            },
        }
    );

    const onSubmit = handleSubmit((formData) => {
        const payload = {
            ...formData,
            weddingDate: formData.weddingDate ? dayjs(formData.weddingDate).toDate() : null,
        };
        mutation.mutate(payload);
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roleFromParam = params.get("role");
        // const accessCodeParam = params.get("accessCode");

        // setValue("accessCode", accessCodeParam || "");

        if (roleFromParam) {
            const matchedRole = roles.find((r) => r.value === roleFromParam);
            if (matchedRole) {
                setValue("role", matchedRole.value);
            }
        }
    }, []);

    return (
        <form onSubmit={onSubmit} className="registration_form">
            <h2>Rejestracja</h2>

            <InputFieldComponent
                label="Imię"
                type="text"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                register={register}
                name="firstName"
            />
            <InputFieldComponent
                label="Nazwisko"
                type="text"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                register={register}
                name="lastName"
            />
            <InputFieldComponent
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                register={register}
                name="email"
            />
            <InputFieldComponent
                label="Telefon"
                type="text"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                register={register}
                name="phoneNumber"
            />
            <InputFieldPasswordComponent
                label="Hasło"
                error={!!errors.password}
                helperText={errors.password?.message}
                register={register}
                name="password"
                discoverPassword={true}
            />
            <InputFieldPasswordComponent
                label="Powtórz hasło"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                register={register}
                name="confirmPassword"
                discoverPassword={true}
            />
            <SelectFieldComponent
                label="Rola"
                name="role"
                control={control}
                error={!!errors.role}
                helperText={errors.role?.message}
                options={roles.map(role => ({ value: role.value, label: role.label }))}
            />

            {!accessCodeRequired && (
                <DataPickerComponent
                    name="weddingDate"
                    control={control}
                    label="Data Ślubu"
                    error={!!errors.weddingDate}
                    helperText={errors.weddingDate?.message}
                />
            )}
            {accessCodeRequired && (
                <AccessCodeFieldComponent
                    control={control}
                    name="accessCode"
                    error={!!errors.accessCode}
                    helperText={errors.accessCode?.message}
                />
            )}

            {apiError && <p className="err-msg">{apiError}</p>}

            <Button type="submit" variant="contained" fullWidth>
                {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "Zarejestruj się"}
            </Button>

        </form>
    );
}
