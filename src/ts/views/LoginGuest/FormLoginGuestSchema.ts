import { z } from "zod";

export const formLoginGuestSchema = z.object({
    firstName: z.string()
        .min(1, "Imię nie może być puste")
        .max(50, "Imię nie może przekraczać 50 znaków"),

    lastName: z.string()
        .min(1, "Nazwisko nie może być puste")
        .max(50, "Nazwisko nie może przekraczać 50 znaków"),

    accessCode: z.string()
        .min(8, "Kod dostępu musi mieć co najmniej 8 znaków")
})