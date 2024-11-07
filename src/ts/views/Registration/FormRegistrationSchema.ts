import { z } from "zod";

export const formRegistrationSchema = z.object({
    email: z.string().trim().email({
        message: "Niepoprawny adres email"
    }),

    password: z.string()
        .min(4, { message: "Hasło musi zawierać conajmniej 4 znaki" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać przynajmniej jedną dużą literę" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Hasło musi zawierać przynajmniej jeden znak specjalny" }),

    confirmPassword: z.string()
        .min(4, { message: "Hasło musi zawierać conajmniej 4 znaki" })
        .regex(/[A-Z]/, { message: "Hasło musi zawierać przynajmniej jedną dużą literę" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Hasło musi zawierać przynajmniej jeden znak specjalny" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Hasła nie są identyczne",
            path: ['confirmPassword']
        });
    }
});
