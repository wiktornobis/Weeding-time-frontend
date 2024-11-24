import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, } from "@mui/material";
import { registration } from "@/api/Registration/fetchers";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import { formRegistrationSchema } from "@/ts/views/Registration/FormRegistrationSchema";
import InputFieldComponent from "@/ts/components/Form/InputFieldComponent.tsx";
import SelectFieldComponent from "@/ts/components/Form/SelectFieldComponent.tsx";
import DataPickerComponent from "@/ts/components/Form/DataPickerComponent.tsx";
import AccessCodeFieldComponent from "@/ts/components/Form/AccessCodeFieldComponent.tsx";

type FormValues = z.infer<typeof formRegistrationSchema>;

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [accessCode, setAccessCode] = useState('');

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formRegistrationSchema),
    });

    const roles = [
        { value: "Panna Młoda", label: "Panna Młoda" },
        { value: "Pan Młody", label: "Pan Młody" },
        { value: "Gość", label: "Gość" },
        { value: "Świadkowa", label: "Świadkowa" },
        { value: "Świadek", label: "Świadek" },
    ];

    const accessCodeRequired = !["Pan Młody", "Panna Młoda"].includes(selectedRole);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleRepeatPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleRoleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRole(e.target.value as string); // rzutowanie value na string
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roleFromParam = params.get("role");
        const accessCodeParam = params.get("accessCode");

        accessCodeParam ? setAccessCode(accessCodeParam) : setAccessCode("");

        if (roleFromParam) {
            const matchedRole = roles.find((r) => r.value === roleFromParam);
            if (matchedRole) {
                setSelectedRole(matchedRole.value);
            }
        }
    }, []);

    const mutation = useMutation(
        (data: FormValues) => registration(data.firstName, data.lastName, data.email, data.tel, data.password, data.role, data.weddingDate as Date, data.accessCode),
        {
            onSuccess: () => navigate("/logowanie"),
            onError: (error) => {
                console.error("Registration failed:", error);
            },
        }
    );

    const onSubmit = handleSubmit((formData) => {
        const payload = {
            ...formData,
            // weddingDate: formData.weddingDate ? dayjs(formData.weddingDate).format("DD.MM.YYYY") : null, - format polski
            weddingDate: formData.weddingDate ? dayjs(formData.weddingDate).toDate() : null, // format iso
        };
        mutation.mutate(payload);
    });

    return (
        <form onSubmit={onSubmit} className="registration_form" >
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
                type="tel"
                error={!!errors.tel}
                helperText={errors.tel?.message}
                register={register}
                name="tel"
            />
            <InputFieldComponent
                label="Hasło"
                type="password"
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                error={!!errors.password}
                helperText={errors.password?.message}
                register={register}
                name="password"
            />
            <InputFieldComponent
                label="Powtórz hasło"
                type="password"
                showPassword={showConfirmPassword}
                togglePasswordVisibility={toggleRepeatPasswordVisibility}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                register={register}
                name="confirmPassword"
            />
            <SelectFieldComponent
                label="Twoja rola na weselu"
                value={selectedRole}
                onChange={handleRoleChange} // Używamy handleRoleChange do obsługi zmiany
                error={!!errors.role}
                helperText={errors.role?.message}
                options={roles}
                register={register}
                name="role"
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
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    error={!!errors.accessCode}
                    helperText={errors.accessCode?.message}
                    register={register}
                    name="accessCode" />
            )}

            {mutation.isError && <p className="err-msg">Błąd podczas rejestracji. Spróbuj ponownie.</p>}

            <Button type="submit" variant="contained" fullWidth>
                {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "Zarejestruj się"}
            </Button>
        </form>
    );
}
