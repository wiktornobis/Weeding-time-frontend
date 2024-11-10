import { z } from "zod";

export const formRegistrationSchema = z.object({
    firstName: z.string()
        .trim()
        .nonempty({ message: "Imię jest wymagane" })
        .min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
    lastName: z.string()
        .trim()
        .nonempty({ message: "Nazwisko jest wymagane" })
        .min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki" }),

    email: z.string().trim().email({
        message: "Niepoprawny adres email"
    }),
    tel: z.string()
        .trim()
        .regex(/^\+?[0-9]{1,3}[-\s]?[0-9]{2,4}[-\s]?[0-9]{3,4}[-\s]?[0-9]{3,4}$/, { message:"Niepoprawny numer telefonu"}),
    weddingDate: z.string()
        .trim()
        .nonempty({ message: "Wymagana data ślubu" }),
    accessCode: z.string()
        .trim()
        .nonempty({ message: "Kod jest wymagany" }),

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
