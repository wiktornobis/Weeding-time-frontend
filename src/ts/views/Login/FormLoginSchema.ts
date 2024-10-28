import { z } from "zod";

export const formLoginSchema = z.object({
    email: z.string().trim().email({
        message: "Niepoprawny adres email"
    }),

    password: z.string()
        .min(2, "Hasło musi zawierać conajmniej 2 znaków")

})