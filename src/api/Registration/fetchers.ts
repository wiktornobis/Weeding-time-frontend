import { BASE_URL_REGISTRATION } from "@/ts/constants/variables";

export const registration = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string | null,
    encryptedPassword: string,
    role: string,
    weddingDate: Date,
    accessCode: string | undefined
) => {
    const response = await fetch(BASE_URL_REGISTRATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            encryptedPassword,
            role,
            weddingDate,
            accessCode,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Wystąpił błąd podczas rejestracji.";
        throw new Error(errorMessage);
    }
    return await response.json();
};
