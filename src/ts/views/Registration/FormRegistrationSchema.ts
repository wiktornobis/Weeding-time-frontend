// src/ts/views/Registration/FormRegistrationSchema.ts
import { z } from 'zod';

export const formRegistrationSchema = z.object({
    firstName: z.string().min(1, { message: "Imię jest wymagane" }),
    lastName: z.string().min(1, { message: "Nazwisko jest wymagane" }),
    email: z.string().email({ message: "Niepoprawny format emaila" }).min(1, { message: "Email jest wymagany" }),
    phoneNumber: z.string().min(1, { message: "Telefon jest wymagany" }),
    password: z.string().min(6, { message: "Hasło musi mieć przynajmniej 6 znaków" }),
    confirmPassword: z.string().min(6, { message: "Powtórzenie hasła musi mieć przynajmniej 6 znaków" }),
    role: z.string().min(1, { message: "Wybierz rolę" }),
    weddingDate: z.union([z.date(), z.null()]).optional(),
    accessCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Hasła muszą być identyczne",
    path: ["confirmPassword"],
});

