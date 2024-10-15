import { z } from "zod";

export const formLoginSchema = z.object({
    email: z.string().trim().email({
        message: "Niepoprawny adres email"
    }),

    password: z.string()
        .min(8, "Hasło musi zawierać conajmniej 8 znaków")
        .regex(/[A-Z]/, "Hasło musi zawierać conajmniej 1 dużą literę")
        .regex(/[a-z]/, "Hasło musi zawierać conajmniej 1 mała literę")
        .regex(/[0-9]/, "Hasło musi zawierać conajmniej 1 cyfrę")
        .regex(/[@$!%*?&#]/, "Hasło musi zawierać conajmniej 1 specjalny znak")
})